import os
import re
import sqlite3
import requests
from bs4 import BeautifulSoup

# --- CONFIGURATION ---
# Список пар (URL, категория) для парсинга
URLS_TO_PARSE = [
    ("https://comfortmats.ru/product-category/vibroizolyatsionnye-materialy/", "ВИБРОИЗОЛЯЦИЯ"),
    # Добавьте дополнительные URL и категории ниже:
    ("https://comfortmats.ru/product-category/shumopogloshhayushhie-materialy/", "ЗВУКОПОГЛОТИТЕЛЬ"),
    ("https://comfortmats.ru/product-category/izolony/", "ИЗОЛЯЦИЯ"),
    ("https://comfortmats.ru/product-category/antiskrip/", "АНТИСКРИП"),
    ("https://comfortmats.ru/product-category/aksessuary/", "РАСХОДНИКИ"),
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
IMG_FOLDER = "img/uploads"
DB_NAME = "cabinet.sqlite3"

# def setup_environment():
#     """Create image folder and initialize SQLite database."""
#     # Create folder for images
#     if not os.path.exists(IMG_FOLDER):
#         os.makedirs(IMG_FOLDER)
    
#     # Initialize Database
#     conn = sqlite3.connect(DB_NAME)
#     cursor = conn.cursor()
#     cursor.execute('''
#         CREATE TABLE IF NOT EXISTS products (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             title TEXT,
#             link TEXT,
#             description TEXT,
#             price TEXT,
#             image_path TEXT
#         )
#     ''')
#     conn.commit()
#     return conn

def download_image(url, title):
    """Download image and return local path."""
    if not url:
        return "N/A"
    
    # Clean filename from illegal characters
    safe_title = re.sub(r'[\\/*?:"<>|]', "", title)
    file_path = os.path.join(IMG_FOLDER, f"{safe_title}.jpg")
    
    try:
        img_data = requests.get(url, timeout=10).content
        with open(file_path, 'wb') as f:
            f.write(img_data)
        return file_path
    except Exception as e:
        print(f"Error downloading image for {title}: {e}")
        return "Error"

def parse_and_save():
    """Parse products from all URLs and save to database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    total_products = 0
    
    # Обработка каждой пары (URL, категория)
    for url, category in URLS_TO_PARSE:
        print(f"\n{'='*60}")
        print(f"Processing category: {category}")
        print(f"URL: {url}")
        print(f"{'='*60}")
        
        try:
            response = requests.get(url, headers=HEADERS)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all product blocks
            products = soup.find_all('div', class_='itemblock')
            print(f"Found {len(products)} products. Starting processing...")

            for product in products:
                # 1. Extract Title and Link
                title_tag = product.find('p', class_='item-title')
                title = title_tag.get_text(strip=True) if title_tag else "Unknown"
                
                link_tag = title_tag.find_parent('a') if title_tag else None
                link = link_tag.get('href') if link_tag else "N/A"
                
                # 2. Extract Description
                excerpt_tag = product.find('div', class_='item-excerpt')
                description = excerpt_tag.get_text(strip=True) if excerpt_tag else ""
                
                # 3. Extract Price
                price_tag = product.find('p', class_='product-price-tickr')
                price = price_tag.get_text(strip=True).replace('от', '').strip() if price_tag else "N/A"
                
                # 4. Handle Image
                img_tag = product.find('div', class_='item-img').find('img') if product.find('div', class_='item-img') else None
                img_url = img_tag.get('src') if img_tag else None
                local_img_path = download_image(img_url, title)
                
                # 5. Save to SQLite
                cursor.execute('''
                    INSERT INTO products (name, category, price, description, image_url, created_at, created_by)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (title, category, price, description, local_img_path, "2026-01-01", "parser"))

                print(f"  ✓ Processed: {title}")
                total_products += 1
            
            print(f"Category '{category}' completed: {len(products)} products added")
        
        except requests.exceptions.RequestException as e:
            print(f"Error accessing {url}: {e}")
        except Exception as e:
            print(f"Error processing {url}: {e}")
    
    conn.commit()
    conn.close()
    
    print(f"\n{'='*60}")
    print(f"✓ SUCCESS! Total {total_products} products saved.")
    print(f"Data saved to '{DB_NAME}' and images to '{IMG_FOLDER}/'.")
    print(f"{'='*60}")

if __name__ == "__main__":
    parse_and_save()