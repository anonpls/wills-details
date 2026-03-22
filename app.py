from flask import Flask, request, jsonify, send_from_directory, render_template, url_for
import requests
import dotenv
import os
import sqlite3
from datetime import datetime
from yookassa import Configuration, Payment
import uuid
import re

dotenv.load_dotenv()

YANDEX_API_KEY = os.getenv('YANDEX_API_KEY')
BOT_TOKEN = os.getenv('BOT_TOKEN')
CHAT_ID = os.getenv('CHAT_ID')
THREAD_ID = os.getenv('THREAD_ID')
Configuration.configure(os.getenv('SHOP_ID'), os.getenv('YOOKASSA_SECRET_KEY'))

application = Flask(__name__)


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
                "order_summary": ", ".join([f"{i.get('name')} x{i.get('quantity', 1)}" for i in cart_items])
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

@application.route('/<path:path>')
def static_file(path):
    return send_from_directory('.', path)

@application.route('/config')
def get_config():
    return jsonify({'YANDEX_MAPS_API_KEY': YANDEX_API_KEY})

if __name__ == "__main__":
   application.run(host='0.0.0.0')