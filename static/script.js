/* =========================================
   WILLI MEDIA | PREMIUM CORE LOGIC
   ========================================= */

/* --- БАЗА ДАННЫХ: УСЛУГИ (Из Авито) --- */
const servicesDB = [
    { id: "noise", name: "Полная шумоизоляция", price: "от 12 000 ₽", shortDesc: "Автомобиля / дверей", fullDesc: "Комплексная шумоизоляция автомобиля или дверей. Убираем гул, скрипы и вибрации. Используем премиальные материалы (Legenda, Relief).", img: "/img/main_1.png", badges: ["Тишина в салоне", "Premium материалы"] },
    { id: "tint", name: "Тонировка стекол", price: "от 1 500 ₽", shortDesc: "Приватность и защита", fullDesc: "Тонировка стекол автомобиля качественными пленками. Защита от УФ-лучей, комфорт для зрения и приватность.", img: "/img/main_2.png", badges: ["Защита от УФ", "Идеальная видимость"] },
    { id: "audio", name: "Автозвук / Акустика", price: "от 1 500 ₽", shortDesc: "Установка акустики", fullDesc: "Профессиональная установка акустики, сабвуферов, усилителей. Настройка сцены для идеального звучания.", img: "/img/main_3.png", badges: ["Чистый звук", "Комплекс услуг"] },
    { id: "doors", name: "Установка доводчиков", price: "от 10 000 ₽", shortDesc: "Доводчики дверей на авто", fullDesc: "Установка премиальных доводчиков дверей. Плавное и бесшумное закрытие. Сохранение заводской гарантии.", img: "/img/main_4.png", badges: ["Премиальный комфорт", "Честные цены"] },
    { id: "ambient", name: "Подсветка салона", price: "от 10 000 ₽", shortDesc: "Установка контурной подсветки", fullDesc: "Контурная подсветка салона. Управление с телефона, множество цветов. Полностью преобразит салон вашего авто.", img: "/img/main_5.png", badges: ["Smart управление", "Интеграция"] },
    { id: "sim", name: "Пайка SIM-карт", price: "от 10 000 ₽", shortDesc: "LiXiang, Zeekr, Voyah", fullDesc: "Профессиональная пайка и установка российских SIM-карт в китайские автомобили (LiXiang, Zeekr, Voyah и др.).", img: "/img/main_6.png", badges: ["Интернет в авто", "Гарантия"] },
    { id: "steering", name: "Перетяжка руля", price: "от 4 000 ₽", shortDesc: "Ощущение новой машины", fullDesc: "Перетяжка руля премиальной кожей, наппой или алькантарой. Идеальные швы и заводское качество.", img: "/img/main_7.png", badges: ["Натуральная кожа", "Ручная работа"] },
    { id: "polish", name: "Полировка", price: "от 5 000 ₽", shortDesc: "Полировка фар и кузова", fullDesc: "Профессиональная полировка кузова и оптики. Восстановление прозрачности фар и блеска лакокрасочного покрытия.", img: "/img/main_8.png", badges: ["Глубокий блеск", "Удаление царапин"] },
    { id: "wrap", name: "Оклейка авто пленкой", price: "от 35 000 ₽", shortDesc: "Защита кузова полиуретаном", fullDesc: "Оклейка зон риска или кузова целиком антигравийной полиуретановой пленкой. Защита от сколов и царапин.", img: "/img/main_1.webp", badges: ["Полиуретан 200мкр", "Самовосстановление"] }
];

/* --- БАЗА ДАННЫХ: ТОВАРЫ (Шумка, спирт, клипсы) --- */
const productsDB = [
    { id: 101, name: "Legenda 4", cat: "ВИБРОИЗОЛЯЦИЯ", price: 650, img: "/img/part_1.png", desc: "Премиальная виброизоляция. Эффективно убирает гул металла и структурные вибрации.", badges: ["Убирает гул", "Толщина 4мм"] },
    { id: 102, name: "Relief", cat: "ЗВУКОПОГЛОТИТЕЛЬ", price: 850, img: "/img/part_2.png", desc: "Звукопоглощающий материал. Отлично поглощает шум и убирает эффект эха в дверях.", badges: ["Поглощает шум", "Анти-эхо"] },
    { id: 103, name: "Legenda 1.5", cat: "АНТИСКРИП", price: 450, img: "/img/part_3.png", desc: "Тонкий материал для обработки дверных карт. Полностью убирает скрипы пластиковой обшивки.", badges: ["Убирает скрип", "Для обшивки"] },
    { id: 104, name: "Legenda 2", cat: "ИЗОЛЯЦИЯ", price: 550, img: "/img/part_4.png", desc: "Материал для закрытия технологических отверстий. Создает герметичный короб для идеального звучания динамика.", badges: ["Герметичность", "Для автозвука"] },
    { id: 105, name: "Обезжириватель (Спирт)", cat: "РАСХОДНИКИ", price: 350, img: "/img/part_5.png", desc: "Профессиональный изопропиловый спирт для подготовки поверхностей перед оклейкой и шумоизоляцией.", badges: ["Очистка 99%", "Без разводов"] },
    { id: 106, name: "Набор VAG/BMW клипс", cat: "КРЕПЕЖ", price: 1200, img: "/img/part_6.png", desc: "Профессиональный набор крепежных клипс для дверных карт и обшивки. Незаменимо при разборке салона.", badges: ["OEM Качество", "50 штук"] }
];

const carBrands = ["BMW X5", "BMW X6", "Li L9", "Zeekr 001", "Porsche Cayenne", "Mercedes G-Class"];
const carDB = {
    "bmw x5": { img: "/img/car_bmw_x5.webp", specs: "G05 • 3.0D / 4.4i • M-Sport" },
    "li l9": { img: "/img/car_li_l9.webp", specs: "EREV • Max/Pro • 21' Wheels" },
    "zeekr 001": { img: "/img/car_zeekr_001.png", specs: "YOU/ME/WE • Z-Sport" }
};

let userPoints = parseInt(localStorage.getItem('williPoints')) || 500;
let cart = JSON.parse(localStorage.getItem('williCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmartHeader();
    initScrollReveal();
    initDatalist();
    setActiveMenuLink(); 
    checkDailyBonus();   
    updatePointsUI();
    updateCartUI();
    renderGrids();
    initLegalModals(); // Инициализация правовых документов
});

window.addEventListener('hashchange', setActiveMenuLink);

function setActiveMenuLink() {
    const links = document.querySelectorAll('.nav-link');
    const currentUrl = new URL(window.location.href);
    links.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (!href) return;

        const linkUrl = new URL(href, window.location.origin);
        const isSamePath = linkUrl.pathname === currentUrl.pathname;
        const isHashLink = Boolean(linkUrl.hash);

        if (isHashLink) {
            if (isSamePath && linkUrl.hash === currentUrl.hash) {
                link.classList.add('active');
            }
        } else if (isSamePath && currentUrl.hash === '') {
            link.classList.add('active');
        }
    });
}

function checkDailyBonus() {
    const today = new Date().toLocaleDateString();
    const lastVisit = localStorage.getItem('williLastVisit');
    if (lastVisit !== today) {
        userPoints += 50;
        localStorage.setItem('williPoints', userPoints);
        localStorage.setItem('williLastVisit', today);
        setTimeout(() => {
            showToast('Ежедневный бонус: +50 баллов 💎', 'bonus');
            updatePointsUI();
        }, 2000);
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('williTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const cb = document.getElementById('themeToggleCheckbox');
    if(cb) cb.checked = (savedTheme === 'dark');
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('williTheme', target);
    const cb = document.getElementById('themeToggleCheckbox');
    if(cb) cb.checked = (target === 'dark');
    showToast(target === 'dark' ? 'Темная эстетика активирована 🌙' : 'Светлый режим активирован ☀️', 'success');
}

function initSmartHeader() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.reveal, .card, .product-card, .aesop-split').forEach((el, index) => {
        el.classList.add('reveal');
        if(index % 3 === 1) el.classList.add('delay-1');
        if(index % 3 === 2) el.classList.add('delay-2');
        observer.observe(el);
    });
}

function showToast(message, type = 'success', icon = 'fa-check') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    if (type === 'bonus') icon = 'fa-gem';
    if (type === 'error') icon = 'fa-triangle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600);
    }, 4000);
}

function renderGrids() {
    const servGrid = document.getElementById('servicesGrid');
    if (servGrid) {
        servGrid.innerHTML = '';
        servicesDB.forEach(s => {
            servGrid.innerHTML += `
                <div class="product-card service-card">
                    <div class="product-image" onclick="openDetailModal('service', '${s.id}')">
                        <img src="${s.img}" alt="${s.name}" onerror="this.src='https://via.placeholder.com/600x400/f4f5f7/cccccc?text=УСЛУГА'">
                    </div>
                    <div class="product-meta">
                        <h3 class="product-title">${s.name}</h3>
                        <p class="product-desc">${s.shortDesc}</p>
                        <div class="product-price" style="font-weight:600;">${s.price}</div>
                    </div>
                    <div class="product-action">
                        <button class="add-cart-btn" onclick="openDetailModal('service', '${s.id}')">Подробнее</button>
                    </div>
                </div>`;
        });
    }

    const catGrid = document.getElementById('catalogGrid');
    if (catGrid) {
        catGrid.innerHTML = '';
        productsDB.forEach(p => {
            catGrid.innerHTML += `
                <div class="product-card">
                    <button class="wishlist-btn" onclick="showToast('Добавлено в избранное', 'success', 'fa-heart')"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-image" onclick="openDetailModal('product', ${p.id})">
                        <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x400/f4f5f7/cccccc?text=ТОВАР'">
                    </div>
                    <div class="product-meta">
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.cat}</p>
                        <div class="product-price" style="font-weight:600;">${p.price.toLocaleString()} ₽</div>
                    </div>
                    <div class="product-action">
                        <button class="add-cart-btn" onclick="addToCart('${p.name}', ${p.price})">В корзину</button>
                    </div>
                </div>`;
        });
    }
}

function ensureModalExists() {
    if (!document.getElementById('detailModal')) {
        const modalHTML = `
        <div id="detailModal" class="modal-overlay" onclick="if(event.target === this) closeDetailModal()">
            <div class="modal-content">
                <button class="modal-close" onclick="closeDetailModal()">&times;</button>
                <div class="modal-img-col"><img id="dmImg" src=""></div>
                <div class="modal-info-col">
                    <h2 id="dmTitle"></h2>
                    <h3 id="dmPrice"></h3>
                    <p id="dmDesc"></p>
                    <button id="dmBtn" class="add-cart-btn" style="width:100%; margin-top:20px;">ACTION</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

function openDetailModal(type, id) {
    ensureModalExists();
    const modal = document.getElementById('detailModal');
    const img = document.getElementById('dmImg');
    const title = document.getElementById('dmTitle');
    const price = document.getElementById('dmPrice');
    const desc = document.getElementById('dmDesc');
    const btn = document.getElementById('dmBtn');
    
    let badgesContainer = document.getElementById('dmBadges');
    if (!badgesContainer) {
        badgesContainer = document.createElement('div');
        badgesContainer.id = 'dmBadges';
        badgesContainer.style.display = 'flex';
        badgesContainer.style.gap = '10px';
        badgesContainer.style.flexWrap = 'wrap';
        badgesContainer.style.marginBottom = '25px';
        desc.parentNode.insertBefore(badgesContainer, desc);
    }

    let item = type === 'service' ? servicesDB.find(s => s.id === id) : productsDB.find(p => p.id === id);
    if (!item) return;

    img.src = item.img || '';
    img.onerror = () => img.src = 'https://via.placeholder.com/600x600/f4f5f7/cccccc?text=FOTO';
    title.innerText = item.name;
    title.style.fontFamily = 'var(--font-head)';
    price.innerText = item.price.toLocaleString ? item.price.toLocaleString() + ' ₽' : item.price;
    price.style.color = "var(--text-main)";
    desc.innerHTML = item.fullDesc || item.desc; 
    
    badgesContainer.innerHTML = '';
    if (item.badges) {
        item.badges.forEach((bText, i) => {
            const isSuccess = i % 2 === 0;
            badgesContainer.innerHTML += `<div class="ui-badge ${isSuccess ? 'success' : 'accent'}"><i class="fa-solid ${isSuccess ? 'fa-check-double' : 'fa-star'}"></i> ${bText}</div>`;
        });
    }

    if (type === 'service') {
        btn.innerText = "ЗАПИСАТЬСЯ";
        btn.onclick = () => window.open('https://t.me/wills_deatails', '_blank');
    } else {
        btn.innerText = "В КОРЗИНУ";
        btn.onclick = () => { addToCart(item.name, item.price); closeDetailModal(); };
    }
    modal.classList.add('active');
}

function openCabinetModal() {
    ensureModalExists();
    const modal = document.getElementById('detailModal');
    document.getElementById('dmImg').src = 'BMW.webp';
    document.getElementById('dmTitle').innerText = "PRIVATE CLUB";
    document.getElementById('dmPrice').innerHTML = `<i class="fa-solid fa-gem" style="color:var(--accent);"></i> ${userPoints.toLocaleString()} БАЛЛОВ`;
    document.getElementById('dmDesc').innerHTML = `Вы состоите в закрытом клубе <b>WILLI MEDIA</b>.<br>Баллы можно использовать для оплаты услуг и запчастей при оформлении заказа. 1 балл = 1 рубль.`;
    document.getElementById('dmBtn').innerText = "К КАТАЛОГУ";
    document.getElementById('dmBtn').onclick = () => { closeDetailModal(); window.location.href = 'catalog.html'; };
    modal.classList.add('active');
}

function closeDetailModal() { 
    const modal = document.getElementById('detailModal');
    if(modal) modal.classList.remove('active'); 
}

function initDatalist() {
    const dl = document.getElementById('car-models');
    if (dl) {
        carBrands.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b;
            dl.appendChild(opt);
        });
    }
}

function searchCar() {
    const input = document.getElementById('carInput').value.toLowerCase().trim();
    if (input.length < 2) return;
    const resultDiv = document.getElementById('configResult');
    const img = document.getElementById('resImg');
    const title = document.getElementById('resTitle');
    const parts = document.getElementById('resParts');
    
    resultDiv.style.display = window.innerWidth < 900 ? 'flex' : 'grid';
    if(window.innerWidth < 900) resultDiv.style.flexDirection = 'column';
    resultDiv.style.opacity = '0.5';
    showToast('Анализ...', 'success', 'fa-microchip');

    setTimeout(() => {
        resultDiv.style.opacity = '1';
        const key = Object.keys(carDB).find(k => input.includes(k));
        parts.innerHTML = '';
        if (key) {
            const car = carDB[key];
            img.src = car.img;
            title.innerHTML = `${key.toUpperCase()}<span style="display:block; font-size:12px; color:var(--text-muted); margin-top:8px;">${car.specs}</span>`;
            showToast(`Комплектующие найдены`, 'success', 'fa-check-double');
            productsDB.slice(0, 3).forEach(p => {
                parts.innerHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding: 20px 0; border-bottom: 1px solid var(--border-color);">
                        <div><div style="font-weight:500; font-size:14px;">${p.name}</div><div style="color:var(--text-main); font-size:13px; font-weight:600;">${p.price.toLocaleString()} ₽</div></div>
                        <button onclick="handleConfiguratorAdd(this, '${p.name}', ${p.price})" class="config-plus-btn"><i class="fa-solid fa-plus"></i></button>
                    </div>`;
            });
        }
    }, 1500);
}

function handleConfiguratorAdd(btn, name, price) {
    if(btn.classList.contains('checked')) return;
    addToCart(name, price);
    btn.classList.add('checked');
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => { btn.classList.remove('checked'); btn.innerHTML = '<i class="fa-solid fa-plus"></i>'; }, 2000);
}

function updateCartUI() {
    document.querySelectorAll('.cart-count').forEach(el => el.innerText = cart.length);
    const list = document.getElementById('cartList');
    const total = document.getElementById('cartTotal');
    if (!list || !total) return;
    list.innerHTML = '';
    let sum = 0;
    if (cart.length === 0) {
        list.innerHTML = `<div style="text-align:center; color:var(--text-muted); margin-top:100px;">Ваша корзина пуста</div>`;
    } else {
        cart.forEach((item, idx) => {
            sum += item.price;
            list.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:20px 0; border-bottom:1px solid var(--border-color);">
                    <div><div>${item.name}</div><div style="color:var(--text-muted);">${item.price.toLocaleString()} ₽</div></div>
                    <button onclick="removeItem(${idx})" style="border:none; background:none; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                </div>`;
        });
    }
    total.innerText = sum.toLocaleString() + ' ₽';
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('williCart', JSON.stringify(cart));
    updateCartUI();
    showToast(`Добавлено: ${name}`, 'success', 'fa-bag-shopping');
}

function removeItem(idx) {
    cart.splice(idx, 1);
    localStorage.setItem('williCart', JSON.stringify(cart));
    updateCartUI();
}

function toggleCart() { 
    const sb = document.getElementById('cartSidebar'); 
    if(sb) sb.classList.toggle('open'); 
}

function updatePointsUI() {
    const headerPoints = document.getElementById('userPointsHeader');
    if (headerPoints) headerPoints.innerText = userPoints.toLocaleString();
}

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if(menu) menu.classList.toggle('active');
}

/* =========================================
   ЮРИДИЧЕСКИЕ ДОКУМЕНТЫ (БЕЗОПАСНАЯ ГЕНЕРАЦИЯ)
   ========================================= */

// ЗДЕСЬ МЕНЯТЬ ДАННЫЕ В БУДУЩЕМ (ИП, ООО, ИНН)
const LEGAL_INFO = {
    name: "Прокуратова Валерия Артаковна",
    inn: "482108606120",
    phone: "+7(968)855-33-23",
    email: "info@willimedia.ru",
    address: "г. Москва, Люблинская ул., 153"
};

const legalTexts = {
    delivery: `
        <h2>Доставка и Оплата</h2>
        <h3>1. Оплата</h3>
        <p>Мы работаем официально. Оплата услуг и товаров производится онлайн на нашем сайте с использованием банковских карт (VISA, MasterCard, МИР, SberPay, T-Pay) или наличными/картой в студии после завершения работ.</p>
        <p>Для запчастей и материалов, требующих индивидуального заказа, может потребоваться предоплата.</p>
        
        <h3>2. Доставка товаров</h3>
        <p>Доставка физических товаров (материалы, запчасти) осуществляется по всей территории РФ партнерскими логистическими компаниями (СДЭК, Деловые Линии, Почта России).</p>
        <p>Срок отгрузки: 1-3 рабочих дня с момента оплаты. Стоимость доставки рассчитывается индивидуально по тарифам ТК.</p>
        <p>Самовывоз доступен из нашей студии по адресу: ${LEGAL_INFO.address}.</p>
        
        <h3>3. Оказание услуг</h3>
        <p>Оказание услуг (шумоизоляция, оклейка, автозвук) производится исключительно на территории нашей студии по предварительной записи.</p>
    `,
    offer: `
        <h2>Публичная оферта</h2>
        <p>о продаже товаров и услуг дистанционным способом</p>
        <p>Настоящий документ является официальным предложением (публичной офертой) заключить договор купли-продажи товаров и оказания услуг.</p>
        
        <h3>1. Термины</h3>
        <p><strong>Исполнитель/Продавец</strong> — ${LEGAL_INFO.name}, ИНН ${LEGAL_INFO.inn}.</p>
        <p><strong>Клиент</strong> — физическое или юридическое лицо, оформившее заказ на сайте.</p>
        
        <h3>2. Предмет договора</h3>
        <p>Исполнитель обязуется передать товар или оказать услугу, а Клиент обязуется оплатить их в соответствии с тарифами, указанными на сайте.</p>
        
        <h3>3. Гарантии и Возврат</h3>
        <p>Гарантия на работы по оклейке и шумоизоляции составляет от 1 года до 10 лет в зависимости от выбранного материала. На оборудование действует гарантия производителя.</p>
        <p>Возврат товара надлежащего качества возможен в течение 14 дней, если сохранен товарный вид и пломбы (за исключением технически сложных товаров и мерных материалов).</p>
    `,
    privacy: `
        <h2>Политика конфиденциальности</h2>
        <p>Мы уважаем вашу приватность. Данная политика описывает, как мы собираем и используем ваши данные.</p>
        
        <h3>1. Сбор информации</h3>
        <p>Для оформления заказа или записи на услугу мы можем запросить ваше Имя, Номер телефона, Email и Марку автомобиля.</p>
        
        <h3>2. Использование данных</h3>
        <p>Ваши данные используются исключительно для связи с вами, подтверждения заказа, организации доставки и начисления бонусных баллов (Private Club).</p>
        
        <h3>3. Передача третьим лицам</h3>
        <p>Мы не передаем ваши данные третьим лицам, кроме транспортных компаний (СДЭК и др.) для осуществления доставки товаров.</p>
        <br>
        <p><strong>Реквизиты:</strong><br>${LEGAL_INFO.name}<br>ИНН: ${LEGAL_INFO.inn}<br>Телефон: ${LEGAL_INFO.phone}</p>
    `
};

function initLegalModals() {
    // Создаем независимый контейнер для правовых модалок (чтобы не ломать основной detailModal)
    const legalModalHTML = `
        <div id="legalModalOverlay" class="modal-overlay" onclick="if(event.target === this) closeLegalModal()">
            <div class="modal-content" style="display:block; max-width: 800px; padding: 40px;">
                <button class="modal-close" onclick="closeLegalModal()">&times;</button>
                <div id="legalModalBody" style="font-family: 'Inter', sans-serif; font-weight: 300; line-height: 1.6; color: var(--text-main); height: 60vh; overflow-y: auto; padding-right: 15px;">
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', legalModalHTML);
}

// Эту функцию мы будем вызывать по клику из футера
window.openLegalModal = function(type) {
    const modal = document.getElementById('legalModalOverlay');
    const body = document.getElementById('legalModalBody');
    if (modal && body && legalTexts[type]) {
        body.innerHTML = legalTexts[type];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Убираем скролл сайта
    }
};

window.closeLegalModal = function() {
    const modal = document.getElementById('legalModalOverlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
    }
};