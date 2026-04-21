from flask import Flask, request, jsonify, send_from_directory, render_template, url_for, session
import requests
import dotenv
import os
import sqlite3
import json
from datetime import datetime
from yookassa import Configuration, Payment
import uuid
import re
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import mimetypes

dotenv.load_dotenv()

YANDEX_API_KEY = os.getenv('YANDEX_API_KEY')
BOT_TOKEN = os.getenv('BOT_TOKEN')
CHAT_ID = os.getenv('CHAT_ID')
THREAD_ID = os.getenv('THREAD_ID')
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
Configuration.configure(os.getenv('SHOP_ID'), os.getenv('YOOKASSA_SECRET_KEY'))

application = Flask(__name__)
application.secret_key = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-me')

# Конфиг для загрузки файлов
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'img', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
application.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

DB_PATH = os.path.join(os.path.dirname(__file__), 'cabinet.sqlite3')


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
            is_admin INTEGER NOT NULL DEFAULT 0,
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
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price INTEGER NOT NULL,
            description TEXT NOT NULL,
            image_url TEXT,
            badges TEXT,
            created_at TEXT NOT NULL,
            created_by INTEGER NOT NULL,
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS forum_sections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS forum_topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (section_id) REFERENCES forum_sections(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS forum_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            body TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (topic_id) REFERENCES forum_topics(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    sections_count = cursor.execute('SELECT COUNT(*) as total FROM forum_sections').fetchone()['total']
    if sections_count == 0:
        now = datetime.utcnow().isoformat()
        cursor.executemany(
            'INSERT INTO forum_sections (slug, title, description, created_at) VALUES (?, ?, ?, ?)',
            [
                ('models', 'Обсуждение моделей', 'Обсуждаем марки, кузова, поколения и опыт владения.', now),
                ('tuning', 'Тюнинг и детейлинг', 'Идеи, кейсы, материалы, советы по работам.', now),
                ('market', 'Покупка и продажа', 'Вопросы по подбору, покупке и продаже авто/запчастей.', now)
            ]
        )
    
    # Инициализация товаров по умолчанию
    products_count = cursor.execute('SELECT COUNT(*) as total FROM products').fetchone()['total']
    if products_count == 0:
        now = datetime.utcnow().isoformat()
        # Создаем системного пользователя для товаров (ID = 1)
        # или используем существующего администратора
        default_user_id = 1
        cursor.executemany(
            'INSERT INTO products (name, category, price, description, image_url, badges, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                ('Legenda 4', 'ВИБРОИЗОЛЯЦИЯ', 650, 'Премиальная виброизоляция. Эффективно убирает гул металла и структурные вибрации.', '/img/part_1.png', json.dumps(['Убирает гул', 'Толщина 4мм']), now, default_user_id),
                ('Relief', 'ЗВУКОПОГЛОТИТЕЛЬ', 850, 'Звукопоглощающий материал. Отлично поглощает шум и убирает эффект эха в дверях.', '/img/part_2.png', json.dumps(['Поглощает шум', 'Анти-эхо']), now, default_user_id),
                ('Legenda 1.5', 'АНТИСКРИП', 450, 'Тонкий материал для обработки дверных карт. Полностью убирает скрипы пластиковой обшивки.', '/img/part_3.png', json.dumps(['Убирает скрип', 'Для обшивки']), now, default_user_id),
                ('Legenda 2', 'ИЗОЛЯЦИЯ', 550, 'Материал для закрытия технологических отверстий. Создает герметичный короб для идеального звучания динамика.', '/img/part_4.png', json.dumps(['Герметичность', 'Для автозвука']), now, default_user_id),
                ('Обезжириватель (Спирт)', 'РАСХОДНИКИ', 350, 'Профессиональный изопропиловый спирт для подготовки поверхностей перед оклейкой и шумоизоляцией.', '/img/part_5.png', json.dumps(['Очистка 99%', 'Без разводов']), now, default_user_id),
                ('Набор VAG/BMW клипс', 'КРЕПЕЖ', 1200, 'Профессиональный набор крепежных клипс для дверных карт и обшивки. Незаменимо при разборке салона.', '/img/part_6.png', json.dumps(['OEM Качество', '50 штук']), now, default_user_id)
            ]
        )
    
    conn.commit()
    conn.close()


def get_user_by_id(user_id):
    conn = get_db_connection()
    user = conn.execute('SELECT id, name, phone, email, points, is_admin, created_at FROM users WHERE id = ?', (user_id,)).fetchone()
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


def serialize_forum_row(row):
    return dict(row) if row else None


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
        'is_admin': user['is_admin'] or 0,
        'created_at': user['created_at']
    }


def get_all_products():
    conn = get_db_connection()
    rows = conn.execute(
        'SELECT id, name, category, price, description, image_url, badges, created_at FROM products ORDER BY id DESC'
    ).fetchall()
    conn.close()
    return rows


def serialize_product(product):
    if not product:
        return None
    badges = []
    if product['badges']:
        try:
            badges = json.loads(product['badges'])
        except:
            badges = []
    return {
        'id': product['id'],
        'name': product['name'],
        'cat': product['category'],
        'price': product['price'],
        'desc': product['description'],
        'img': product['image_url'],
        'badges': badges
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


@application.route('/api/upload-image', methods=['POST'])
def upload_image():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'Авторизуйтесь, чтобы загрузить изображение'}), 401
    
    user = get_user_by_id(user_id)
    if not user or not user['is_admin']:
        return jsonify({'status': 'error', 'message': 'Только администраторы могут загружать изображения'}), 403

    if 'image' not in request.files:
        return jsonify({'status': 'error', 'message': 'Файл не найден'}), 400

    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'Файл не выбран'}), 400

    if not allowed_file(file.filename):
        return jsonify({'status': 'error', 'message': 'Недопустимый формат файла. Используйте PNG, JPG, JPEG, GIF или WebP'}), 400

    try:
        # Генерируем уникальное имя файла
        filename = f"product_{uuid.uuid4().hex}_{secure_filename(file.filename)}"
        filepath = os.path.join(application.config['UPLOAD_FOLDER'], filename)
        
        # Сохраняем файл
        file.save(filepath)
        
        # Возвращаем URL для доступа
        image_url = f'/img/uploads/{filename}'
        return jsonify({'status': 'success', 'image_url': image_url})
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Ошибка при загрузке файла: {str(e)}'}), 500


@application.route('/api/products', methods=['GET'])
def get_products():
    products = get_all_products()
    return jsonify({'products': [serialize_product(p) for p in products]})


@application.route('/api/products', methods=['POST'])
def create_product():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'Авторизуйтесь, чтобы добавить товар'}), 401
    
    user = get_user_by_id(user_id)
    if not user or not user['is_admin']:
        return jsonify({'status': 'error', 'message': 'Только администраторы могут добавлять товары'}), 403

    data = request.json or {}
    name = (data.get('name') or '').strip()
    category = (data.get('category') or '').strip()
    price_str = str(data.get('price') or '0').strip()
    description = (data.get('description') or '').strip()
    image_url = (data.get('image_url') or '').strip()
    badges = data.get('badges') or []

    if not name or not category or not price_str or not description:
        return jsonify({'status': 'error', 'message': 'Заполните все обязательные поля'}), 400

    try:
        price = int(float(price_str))
    except ValueError:
        return jsonify({'status': 'error', 'message': 'Некорректная цена'}), 400

    if len(name) > 200:
        return jsonify({'status': 'error', 'message': 'Название слишком длинное (макс 200 символов)'}), 400
    if len(description) > 1000:
        return jsonify({'status': 'error', 'message': 'Описание слишком длинное (макс 1000 символов)'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            'INSERT INTO products (name, category, price, description, image_url, badges, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            (name, category, price, description, image_url, json.dumps(badges), datetime.utcnow().isoformat(), user_id)
        )
        product_id = cursor.lastrowid
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({'status': 'error', 'message': f'Ошибка при добавлении: {str(e)}'}), 500
    
    conn.close()
    return jsonify({'status': 'success', 'product_id': product_id})


@application.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'Авторизуйтесь, чтобы редактировать товар'}), 401

    user = get_user_by_id(user_id)
    if not user or not user['is_admin']:
        return jsonify({'status': 'error', 'message': 'Только администраторы могут редактировать товары'}), 403

    data = request.json or {}
    name = (data.get('name') or '').strip()
    category = (data.get('category') or '').strip()
    price_str = str(data.get('price') or '0').strip()
    description = (data.get('description') or '').strip()
    image_url = (data.get('image_url') or '').strip()
    badges = data.get('badges') or []

    if not name or not category or not price_str or not description:
        return jsonify({'status': 'error', 'message': 'Заполните все обязательные поля'}), 400

    try:
        price = int(float(price_str))
    except ValueError:
        return jsonify({'status': 'error', 'message': 'Некорректная цена'}), 400

    if len(name) > 200:
        return jsonify({'status': 'error', 'message': 'Название слишком длинное (макс 200 символов)'}), 400
    if len(description) > 1000:
        return jsonify({'status': 'error', 'message': 'Описание слишком длинное (макс 1000 символов)'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    product = cursor.execute('SELECT id FROM products WHERE id = ?', (product_id,)).fetchone()
    if not product:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Товар не найден'}), 404

    try:
        cursor.execute(
            'UPDATE products SET name = ?, category = ?, price = ?, description = ?, image_url = ?, badges = ? WHERE id = ?',
            (name, category, price, description, image_url, json.dumps(badges), product_id)
        )
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({'status': 'error', 'message': f'Ошибка при редактировании: {str(e)}'}), 500

    conn.close()
    return jsonify({'status': 'success'})


@application.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'Авторизуйтесь, чтобы удалить товар'}), 401

    user = get_user_by_id(user_id)
    if not user or not user['is_admin']:
        return jsonify({'status': 'error', 'message': 'Только администраторы могут удалять товары'}), 403

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Товар не найден'}), 404

    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})





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

@application.route('/forum')
def forum():
    return render_template('forum.html')

@application.route('/configurator')
def configurator():
    return render_template('configurator.html')


@application.route('/api/forum/sections')
def forum_sections():
    conn = get_db_connection()
    rows = conn.execute(
        """
        SELECT s.id, s.slug, s.title, s.description, s.created_at,
               COUNT(DISTINCT t.id) as topics_count,
               COUNT(p.id) as posts_count
        FROM forum_sections s
        LEFT JOIN forum_topics t ON t.section_id = s.id
        LEFT JOIN forum_posts p ON p.topic_id = t.id
        GROUP BY s.id
        ORDER BY s.id ASC
        """
    ).fetchall()
    conn.close()
    return jsonify({'sections': [serialize_forum_row(row) for row in rows]})


@application.route('/api/forum/topics')
def forum_topics():
    section_id = request.args.get('section_id', type=int)
    if not section_id:
        return jsonify({'status': 'error', 'message': 'section_id обязателен'}), 400

    conn = get_db_connection()
    rows = conn.execute(
        """
        SELECT t.id, t.section_id, t.title, t.created_at,
               u.id as user_id, u.name as user_name,
               COUNT(p.id) as posts_count,
               MAX(p.created_at) as last_post_at
        FROM forum_topics t
        JOIN users u ON u.id = t.user_id
        LEFT JOIN forum_posts p ON p.topic_id = t.id
        WHERE t.section_id = ?
        GROUP BY t.id
        ORDER BY COALESCE(last_post_at, t.created_at) DESC
        """,
        (section_id,)
    ).fetchall()
    conn.close()
    return jsonify({'topics': [serialize_forum_row(row) for row in rows]})


@application.route('/api/forum/topics', methods=['POST'])
def forum_create_topic():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'Авторизуйтесь, чтобы создать тему'}), 401

    data = request.json or {}
    section_id = data.get('section_id')
    title = (data.get('title') or '').strip()
    body = (data.get('body') or '').strip()

    if not section_id or not title or not body:
        return jsonify({'status': 'error', 'message': 'Заполните раздел, заголовок и текст'}), 400
    if len(title) > 140:
        return jsonify({'status': 'error', 'message': 'Заголовок слишком длинный (до 140 символов)'}), 400
    if len(body) > 5000:
        return jsonify({'status': 'error', 'message': 'Сообщение слишком длинное (до 5000 символов)'}), 400

    conn = get_db_connection()
    section = conn.execute('SELECT id FROM forum_sections WHERE id = ?', (section_id,)).fetchone()
    if not section:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Раздел не найден'}), 404

    now = datetime.utcnow().isoformat()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO forum_topics (section_id, user_id, title, created_at) VALUES (?, ?, ?, ?)',
        (section_id, user_id, title, now)
    )
    topic_id = cursor.lastrowid
    cursor.execute(
        'INSERT INTO forum_posts (topic_id, user_id, body, created_at) VALUES (?, ?, ?, ?)',
        (topic_id, user_id, body, now)
    )
    conn.commit()
    conn.close()
    return jsonify({'status': 'success', 'topic_id': topic_id})


@application.route('/api/forum/posts')
def forum_posts():
    topic_id = request.args.get('topic_id', type=int)
    if not topic_id:
        return jsonify({'status': 'error', 'message': 'topic_id обязателен'}), 400

    conn = get_db_connection()
    topic = conn.execute(
        """
        SELECT t.id, t.section_id, t.title, t.created_at, u.id as user_id, u.name as user_name
        FROM forum_topics t
        JOIN users u ON u.id = t.user_id
        WHERE t.id = ?
        """,
        (topic_id,)
    ).fetchone()
    if not topic:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Тема не найдена'}), 404

    posts = conn.execute(
        """
        SELECT p.id, p.topic_id, p.body, p.created_at, u.id as user_id, u.name as user_name
        FROM forum_posts p
        JOIN users u ON u.id = p.user_id
        WHERE p.topic_id = ?
        ORDER BY p.id ASC
        """,
        (topic_id,)
    ).fetchall()
    conn.close()
    return jsonify({
        'topic': serialize_forum_row(topic),
        'posts': [serialize_forum_row(row) for row in posts]
    })


@application.route('/api/forum/posts', methods=['POST'])
def forum_create_post():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'Авторизуйтесь, чтобы ответить'}), 401

    data = request.json or {}
    topic_id = data.get('topic_id')
    body = (data.get('body') or '').strip()
    if not topic_id or not body:
        return jsonify({'status': 'error', 'message': 'Укажите тему и текст сообщения'}), 400
    if len(body) > 5000:
        return jsonify({'status': 'error', 'message': 'Сообщение слишком длинное (до 5000 символов)'}), 400

    conn = get_db_connection()
    topic = conn.execute('SELECT id FROM forum_topics WHERE id = ?', (topic_id,)).fetchone()
    if not topic:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Тема не найдена'}), 404

    now = datetime.utcnow().isoformat()
    conn.execute(
        'INSERT INTO forum_posts (topic_id, user_id, body, created_at) VALUES (?, ?, ?, ?)',
        (topic_id, user_id, body, now)
    )
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'})


@application.route('/api/car-summary', methods=['POST'])
def car_summary():
    data = request.json or {}
    model = (data.get('model') or '').strip()
    specs = (data.get('specs') or '').strip()

    if not model:
        return jsonify({'status': 'error', 'message': 'model обязателен'}), 400
    if not OPENROUTER_API_KEY:
        return jsonify({'status': 'error', 'message': 'OPENROUTER_API_KEY не настроен на сервере'}), 500

    prompt = (
        "Сделай стильный краткий summary (2-3 предложения, до 60 слов) на русском языке "
        "для страницы автоателье. Тон: премиальный, информативный, без воды. "
        "Упомяни характер модели, комфорт/динамику и потенциал для тюнинга/детейлинга. "
        f"Модель: {model}. Характеристики/контекст: {specs or 'нет данных'}."
    )

    try:
        response = requests.post(
            'https://openrouter.ai/api/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {OPENROUTER_API_KEY}',
                'Content-Type': 'application/json',
                'HTTP-Referer': request.host_url.rstrip('/'),
                'X-Title': 'WILLI MEDIA Smart Selection'
            },
            json={
                'model': 'openai/gpt-oss-120b:free',
                'messages': [
                    {
                        'role': 'system',
                        'content': 'Ты automotive-эксперт и пишешь очень ёмко, красиво и по делу.'
                    },
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.7,
                'max_tokens': 180
            },
            timeout=25
        )
        payload = response.json()
        if response.status_code >= 400:
            message = payload.get('error', {}).get('message') or 'Ошибка OpenRouter'
            return jsonify({'status': 'error', 'message': message}), 502

        summary = (
            payload.get('choices', [{}])[0]
            .get('message', {})
            .get('content', '')
            .strip()
        )
        if not summary:
            return jsonify({'status': 'error', 'message': 'Пустой ответ от модели'}), 502

        return jsonify({'status': 'success', 'summary': summary})
    except requests.RequestException as error:
        return jsonify({'status': 'error', 'message': f'Сеть OpenRouter недоступна: {error}'}), 502
    except ValueError:
        return jsonify({'status': 'error', 'message': 'Некорректный ответ OpenRouter'}), 502

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
