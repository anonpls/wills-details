#!/usr/bin/env python3
"""
Скрипт для создания администратора в системе
Использование: python init_admin.py
"""

import sqlite3
import sys
import os
from datetime import datetime
from werkzeug.security import generate_password_hash

def init_admin():
    db_path = os.path.join(os.path.dirname(__file__), 'cabinet.sqlite3')
    
    if not os.path.exists(db_path):
        print(f"❌ Ошибка: База данных не найдена по пути {db_path}")
        sys.exit(1)
    
    print("\n🔐 Инициализация администратора")
    print("=" * 50)
    
    # Получить данные от пользователя
    name = input("Имя администратора: ").strip()
    if not name:
        print("❌ Имя не может быть пустым")
        return
    
    phone = input("Номер телефона (формат: +79999999999): ").strip()
    if not phone:
        print("❌ Телефон не может быть пустым")
        return
    
    email = input("Email (необязательно): ").strip() or None
    
    password = input("Пароль: ").strip()
    if not password or len(password) < 6:
        print("❌ Пароль должен быть не короче 6 символов")
        return
    
    password_confirm = input("Подтвердите пароль: ").strip()
    if password != password_confirm:
        print("❌ Пароли не совпадают")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Проверить существует ли уже такой пользователь
        existing = cursor.execute('SELECT id FROM users WHERE phone = ?', (phone,)).fetchone()
        if existing:
            print(f"\n❌ Пользователь с номером {phone} уже существует")
            conn.close()
            return
        
        # Создать хеш пароля
        password_hash = generate_password_hash(password)
        
        # Вставить нового администратора
        cursor.execute(
            'INSERT INTO users (name, phone, email, password_hash, points, is_admin, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (name, phone, email, password_hash, 500, 1, datetime.utcnow().isoformat())
        )
        user_id = cursor.lastrowid
        
        # Добавить приветственный бонус
        cursor.execute(
            'INSERT INTO point_transactions (user_id, amount, description, created_at) VALUES (?, ?, ?, ?)',
            (user_id, 500, 'Приветственный бонус', datetime.utcnow().isoformat())
        )
        
        conn.commit()
        conn.close()
        
        print("\n✅ Администратор успешно создан!")
        print(f"  ID: {user_id}")
        print(f"  Имя: {name}")
        print(f"  Телефон: {phone}")
        print(f"  Email: {email or 'не указан'}")
        print(f"  Статус: Администратор ✓")
        print(f"  Бонусные баллы: 500")
        print("\n🎉 Теперь этот пользователь может добавлять товары в каталог!")
        
    except Exception as e:
        print(f"\n❌ Ошибка при создании администратора: {e}")
        sys.exit(1)

def make_admin_existing():
    """Сделать существующего пользователя администратором"""
    db_path = os.path.join(os.path.dirname(__file__), 'cabinet.sqlite3')
    
    if not os.path.exists(db_path):
        print(f"❌ Ошибка: База данных не найдена по пути {db_path}")
        sys.exit(1)
    
    print("\n👤 Сделать существующего пользователя администратором")
    print("=" * 50)
    
    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Показать всех пользователей
        users = cursor.execute('SELECT id, name, phone, is_admin FROM users ORDER BY id DESC').fetchall()
        
        if not users:
            print("❌ В базе данных нет пользователей")
            conn.close()
            return
        
        print("\nДоступные пользователи:")
        for user in users:
            admin_badge = "👑 Admin" if user['is_admin'] else ""
            print(f"  ID {user['id']}: {user['name']} ({user['phone']}) {admin_badge}")
        
        user_id = input("\nВведите ID пользователя для повышения: ").strip()
        
        try:
            user_id = int(user_id)
        except ValueError:
            print("❌ ID должен быть числом")
            return
        
        user = cursor.execute('SELECT id, name, phone, is_admin FROM users WHERE id = ?', (user_id,)).fetchone()
        if not user:
            print(f"❌ Пользователь с ID {user_id} не найден")
            conn.close()
            return
        
        if user['is_admin']:
            print(f"ℹ️ Пользователь '{user['name']}' уже администратор")
            conn.close()
            return
        
        # Обновить
        cursor.execute('UPDATE users SET is_admin = 1 WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()
        
        print(f"\n✅ Пользователь '{user['name']}' теперь администратор!")
        
    except Exception as e:
        print(f"\n❌ Ошибка: {e}")
        sys.exit(1)

def main():
    print("\n📦 Управление администраторами")
    print("=" * 50)
    print("1. Создать нового администратора")
    print("2. Сделать существующего пользователя администратором")
    print("3. Выход")
    
    choice = input("\nВыберите действие (1-3): ").strip()
    
    if choice == '1':
        init_admin()
    elif choice == '2':
        make_admin_existing()
    elif choice == '3':
        print("До встречи! 👋")
    else:
        print("❌ Некорректный выбор")

if __name__ == '__main__':
    main()
