from flask import Flask, request, jsonify, send_from_directory, render_template, url_for, session
import requests
import dotenv
import os
import sqlite3
from datetime import datetime
from yookassa import Configuration, Payment
import uuid
import re
from werkzeug.security import generate_password_hash, check_password_hash

dotenv.load_dotenv()

YANDEX_API_KEY = os.getenv('YANDEX_API_KEY')
BOT_TOKEN = os.getenv('BOT_TOKEN')
CHAT_ID = os.getenv('CHAT_ID')
THREAD_ID = os.getenv('THREAD_ID')
Configuration.configure(os.getenv('SHOP_ID'), os.getenv('YOOKASSA_SECRET_KEY'))

application = Flask(__name__)
application.secret_key = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-me')

DB_PATH = os.path.join(os.path.dirname(__file__), 'cabinet.sqlite3')


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            email TEXT,
            password_hash TEXT NOT NULL,
            points INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS point_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount INTEGER NOT NULL,
            description TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    conn.commit()
    conn.close()


def get_user_by_id(user_id):
    conn = get_db_connection()
    user = conn.execute('SELECT id, name, phone, email, points, created_at FROM users WHERE id = ?', (user_id,)).fetchone()
    conn.close()
    return user


def get_user_with_password(phone):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE phone = ?', (phone,)).fetchone()
    conn.close()
    return user


def get_user_transactions(user_id, limit=10):
    conn = get_db_connection()
    rows = conn.execute(
        'SELECT amount, description, created_at FROM point_transactions WHERE user_id = ? ORDER BY id DESC LIMIT ?',
        (user_id, limit)
    ).fetchall()
    conn.close()
    return rows


def add_points(user_id, amount, description):
    conn = get_db_connection()
    conn.execute('UPDATE users SET points = points + ? WHERE id = ?', (amount, user_id))
    conn.execute(
        'INSERT INTO point_transactions (user_id, amount, description, created_at) VALUES (?, ?, ?, ?)',
        (user_id, amount, description, datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()


def serialize_user(user):
    if not user:
        return None
    return {
        'id': user['id'],
        'name': user['name'],
        'phone': user['phone'],
        'email': user['email'] or '',
        'points': user['points'],
        'created_at': user['created_at']
    }


init_db()


@application.context_processor
def inject_cache_buster():
    def cache_buster(filepath):
        full_filepath = os.path.join(application.static_folder, filepath)
        try:
            timestamp = int(os.path.getmtime(full_filepath))
            return f"{url_for('static', filename=filepath)}?v={timestamp}"
        except (OSError, TypeError):
            return url_for('static', filename=filepath)
    return dict(cache_buster=cache_buster)


@application.route('/submit_order', methods=['POST'])
def submit_order():
    # Этот эндпоинт для тестов без оплаты, но добавим сюда тоже логику
    try:
        data = request.json
        name = data.get('name', 'Не указано')
        phone = data.get('phone', 'Не указано')
        address = data.get('address', 'Не указано')
        cart_items = data.get('items', [])
        total_price = data.get('total_price', 0)
        promo_code = data.get('promo_code', None) # Ловим промокод

        msg = f"<b>🏛 НОВЫЙ ЗАКАЗ [ROUCEL SHOP]</b>\n"
        msg += f"<i>Curated Beauty Architecture</i>\n\n"
        msg += f"👤 Клиент: {name}\n"
        msg += f"📞 Тел: {phone}\n"
        msg += f"📍 Адрес/ПВЗ: {address}\n\n"
        
        if promo_code:
             msg += f"🎟 <b>Промокод: {promo_code}</b>\n\n"

        msg += f"📦 <b>Состав заказа:</b>\n"

        for item in cart_items:
            title = item.get('name') or item.get('title') or 'Товар'
            qty = item.get('quantity') or item.get('count') or 1
            price = item.get('price', 0)
            cat = item.get('category') or 'General'
            msg += f"• [{cat}] {title} x {qty} — {price}₽\n"

        msg += f"\n💰 <b>Итого к оплате: {total_price}₽</b>"

        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        resp = requests.post(url, json={
            "chat_id": CHAT_ID,
            "text": msg,
            "parse_mode": "HTML"
        })
        
        return jsonify({"status": "success"})
    except Exception as e:
        print(f"Ошибка на сервере: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@application.route('/create_payment', methods=['POST'])
def create_payment():
    try:
        data = request.json
        cart_items = data.get('items', [])
        promo_code = data.get('promo_code') # Получаем промокод от фронтенда
        
        if not cart_items:
            return jsonify({"status": "error", "message": "Корзина пуста"}), 400

        # Считаем сумму заново на сервере для безопасности, но учитываем скидку
        # (В идеале скидку надо валидировать на сервере, но пока верим фронту для скорости)
        # Для простоты сейчас возьмем итоговую сумму, которую прислал фронт, если она есть,
        # либо пересчитаем без скидки. 
        # ПРАВИЛЬНЫЙ ПУТЬ: Пересчитать сумму.
        
        raw_total = 0
        for item in cart_items:
            raw_total += float(item.get('price', 0)) * int(item.get('quantity', 1))

        # Если был промокод, применяем скидку (Hardcoded logic дублируется с JS)
        discount_factor = 0
        if promo_code:
            promo_upper = promo_code.upper()
            if promo_upper == "ROUCEL15": discount_factor = 0.15
            elif promo_upper == "PEARL20": discount_factor = 0.20
            elif promo_upper == "INTELEGENT20": discount_factor = 0.20
            elif promo_upper == "MYSTERY10": discount_factor = 0.10
        
        discount_amount = raw_total * discount_factor
        final_price = raw_total - discount_amount

        # Формируем чек
        items_for_receipt = []
        
        # ЮKassa требует, чтобы сумма позиций сходилась с итогом.
        # Если есть скидка, мы должны пропорционально уменьшить цену каждой позиции в чеке
        # Или добавить скидку отдельной строкой (но ЮKassa так не умеет обычно).
        # Проще всего: "размазать" скидку по товарам.
        
        coefficient = final_price / raw_total if raw_total > 0 else 1

        for item in cart_items:
            original_price = float(item.get('price', 0))
            qty = int(item.get('quantity') or 1)
            
            # Цена товара со скидкой
            discounted_item_price = original_price * coefficient
            
            items_for_receipt.append({
                "description": item.get('name')[:128],
                "quantity": float(qty),
                "amount": {
                    "value": f"{discounted_item_price:.2f}",
                    "currency": "RUB"
                },
                "vat_code": 1,
                "payment_mode": "full_payment",
                "payment_subject": "commodity"
            })

        if final_price <= 0:
            return jsonify({"status": "error", "message": "Ошибка в расчете суммы"}), 400

        clean_phone = re.sub(r'\D', '', str(data.get('phone', '')))
        order_id = str(uuid.uuid4())
        
        payment = Payment.create({
            "amount": {
                "value": f"{final_price:.2f}",
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "https://rivagedor.ru/"
            },
            "capture": True,
            "description": f"Заказ ROUCEL SHOP (Клиент: {data.get('name')})",
            "metadata": {
                "name": data.get('name'),
                "phone": data.get('phone'),
                "address": data.get('address'),
                "promo_code": promo_code if promo_code else "Нет", # Сохраняем промокод в метаданных
                "order_summary": ", ".join([f"{i.get('name')} x{i.get('quantity', 1)}" for i in cart_items]),
                "user_id": str(session.get('user_id') or '')
            },
            "receipt": {
                "items": items_for_receipt,
                "customer": {
                    "phone": clean_phone
                }
            }
        }, order_id)

        return jsonify({"payment_url": payment.confirmation.confirmation_url})

    except Exception as e:
        print(f"Ошибка при создании платежа: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@application.route('/yookassa_webhook', methods=['POST'])
def yookassa_webhook():
    try:
        event_data = request.json
        
        if event_data.get('event') == 'payment.succeeded':
            payment_info = event_data.get('object')
            meta = payment_info.get('metadata')
            user_id = meta.get('user_id') if meta else None
            
            order_items = meta.get('order_summary', 'Состав не указан')
            promo = meta.get('promo_code', 'Нет') # Достаем промокод
            
            msg = f"✅ <b>ОПЛАТА ПОЛУЧЕНА [ROUCEL SHOP]</b>\n\n"
            msg += f"👤 <b>Клиент:</b> {meta.get('name')}\n"
            msg += f"📞 <b>Телефон:</b> {meta.get('phone')}\n"
            msg += f"📍 <b>Адрес:</b> {meta.get('address')}\n"
            
            if promo != 'Нет':
                msg += f"🎟 <b>Применен промокод: {promo}</b>\n"
            
            msg += f"\n📦 <b>Заказ:</b>\n{order_items}\n\n"
            msg += f"💰 <b>Оплачено:</b> {payment_info['amount']['value']} {payment_info['amount']['currency']}"

            url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
            requests.post(url, json={
                "chat_id": CHAT_ID, 
                "text": msg, 
                "parse_mode": "HTML"
            })
            if user_id and str(user_id).isdigit():
                cashback = max(int(float(payment_info['amount']['value']) * 0.05), 1)
                add_points(int(user_id), cashback, f"Кэшбэк за заказ {payment_info.get('id', 'payment')}")
            if promo == "PEARL20":
                chat_id, thread_id = THREAD_ID.split("_")
                # Если был использован промокод Pearl20, отправляем данные в наш API для начисления комиссии блогеру
                try:
                    msg = f"Новый заказ через промокод {promo}\n"
                    msg += f"Сумма заказа: {payment_info['amount']['value']} {payment_info['amount']['currency']}"
                    # Здесь нужно указать реальный URL вашего API сервера
                    api_url = "http://5.23.52.31:8000/webhook/sale"
                    headers = {"X-API-Key": "SUPER_SECRET_KEY_123"}
                    requests.post(url, json={"chat_id": chat_id, "message_thread_id": int(thread_id), "text": msg})
                    requests.post(api_url, json={"promo": "PEARL20", "amount": float(payment_info['amount']['value'])}, headers=headers)
                except Exception as e:
                    print(f"Ошибка при отправке данных о продаже в API сервер: {e}")

        return "OK", 200
    except Exception as e:
        print(f"Ошибка в вебхуке: {e}")
        return "Error", 500


@application.route('/api/cabinet/me')
def cabinet_me():
    user_id = session.get('user_id')
    user = get_user_by_id(user_id) if user_id else None
    if not user:
        return jsonify({'authenticated': False})

    transactions = [dict(row) for row in get_user_transactions(user['id'])]
    return jsonify({'authenticated': True, 'user': serialize_user(user), 'transactions': transactions})


@application.route('/api/cabinet/register', methods=['POST'])
def cabinet_register():
    data = request.json or {}
    name = (data.get('name') or '').strip()
    phone = (data.get('phone') or '').strip()
    email = (data.get('email') or '').strip()
    password = data.get('password') or ''

    if not name or not phone or not password:
        return jsonify({'status': 'error', 'message': 'Заполните имя, телефон и пароль'}), 400

    if get_user_with_password(phone):
        return jsonify({'status': 'error', 'message': 'Пользователь с таким телефоном уже существует'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO users (name, phone, email, password_hash, points, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        (name, phone, email, generate_password_hash(password), 500, datetime.utcnow().isoformat())
    )
    user_id = cursor.lastrowid
    cursor.execute(
        'INSERT INTO point_transactions (user_id, amount, description, created_at) VALUES (?, ?, ?, ?)',
        (user_id, 500, 'Приветственный бонус', datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()

    session['user_id'] = user_id
    return cabinet_me()


@application.route('/api/cabinet/login', methods=['POST'])
def cabinet_login():
    data = request.json or {}
    phone = (data.get('phone') or '').strip()
    password = data.get('password') or ''
    user = get_user_with_password(phone)

    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({'status': 'error', 'message': 'Неверный телефон или пароль'}), 401

    session['user_id'] = user['id']
    return cabinet_me()


@application.route('/api/cabinet/logout', methods=['POST'])
def cabinet_logout():
    session.pop('user_id', None)
    return jsonify({'status': 'success'})


@application.route('/about')
def about():
    return render_template('about.html')

@application.route('/cart')
def cart():
    yandex_key = os.getenv('YANDEX_API_KEY')
    return render_template('cart.html', yandex_api_key=yandex_key)

@application.route('/catalog')
def catalog():
    return render_template('catalog.html') 

@application.route('/delivery')
def delivery():
    return render_template('delivery.html')

@application.route('/')
def index():
    return render_template('index.html')

@application.route('/news')
def news():
    return render_template('news.html')

@application.route('/offer')
def offer():
    return render_template('offer.html')

@application.route('/privacy')
def privacy():
    return render_template('privacy.html')

@application.route('/promo')
def promo():
    return render_template('promo.html')

@application.route('/reviews')
def reviews():
    return render_template('reviews.html')

@application.route('/science')
def science():
    return render_template('science.html')


@application.route('/services')
def services():
    return render_template('services.html')

@application.route('/shop')
def shop():
    return render_template('shop.html')

@application.route('/comments')
def comments():
    return render_template('comments.html')

@application.route('/configurator')
def configurator():
    return render_template('configurator.html')

@application.route('/img/<path:filename>')
def image_file(filename):
    return send_from_directory('img', filename)

@application.route('/<path:path>')
def static_file(path):
    return send_from_directory('.', path)

@application.route('/config')
def get_config():
    return jsonify({'YANDEX_MAPS_API_KEY': YANDEX_API_KEY})

if __name__ == "__main__":
   application.run(host='0.0.0.0')