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


async function fetchCarImageFromWikimedia(modelQuery) {
    const query = (modelQuery || '').trim();
    if (!query) return null;

    const searchTerms = [
        `${query} car`,
        `${query} automobile`,
        query
    ];

    for (const term of searchTerms) {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*`;
        const response = await fetch(url);
        if (!response.ok) continue;

        const data = await response.json();
        const pages = Object.values(data?.query?.pages || {});
        const withImages = pages
            .map(page => ({
                title: page.title || '',
                imageUrl: page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url || ''
            }))
            .filter(item => item.imageUrl);

        if (withImages.length) {
            const preferred = withImages.find(item => /\b(car|automobile|bmw|mercedes|audi|porsche|toyota|honda|li|zeekr)\b/i.test(item.title)) || withImages[0];
            return preferred;
        }
    }

    return null;
}

let userPoints = 0;
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('williCart')) || [];
let checkoutFormState = JSON.parse(localStorage.getItem('williCheckoutForm') || '{}');
let map = null;
let myPlacemark = null;
let pvzCollection = null;
let yandexMapsLoader = null;
const pickupProviders = {
    yandex: { label: 'Яндекс Маркет', query: 'Яндекс Маркет пункт выдачи', accent: '#FC3F1D' },
    post: { label: 'Почта России', query: 'Почта России', accent: '#005BFF' },
    cdek: { label: 'СДЭК', query: 'СДЭК пункт выдачи', accent: '#19A54A' }
};


document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmartHeader();
    initScrollReveal();
    initDatalist();
    initUserCabinet();
    setActiveMenuLink(); 
    checkDailyBonus();   
    updatePointsUI();
    updateCartUI();
    renderGrids();
    renderHomeCatalog();
    initCheckoutPanel();
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

function renderHomeCatalog() {
    const tabsContainer = document.getElementById('homeCatalogTabs');
    const slider = document.getElementById('homeCatalogSlider');
    if (!tabsContainer || !slider) return;

    const categories = ['ВСЕ', ...new Set(productsDB.map(product => product.cat))];
    const activeCategory = tabsContainer.dataset.activeCategory || 'ВСЕ';

    tabsContainer.innerHTML = categories.map(category => `
        <button class="home-catalog-tab ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>
    `).join('');

    const filteredProducts = activeCategory === 'ВСЕ'
        ? productsDB
        : productsDB.filter(product => product.cat === activeCategory);

    slider.innerHTML = `
        <div class="home-catalog-track">
            ${filteredProducts.map(product => `
                <article class="product-card home-catalog-card">
                    <button class="wishlist-btn" onclick="showToast('Добавлено в избранное', 'success', 'fa-heart')"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-image" onclick="openDetailModal('product', ${product.id})">
                        <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/f4f5f7/cccccc?text=ТОВАР'">
                    </div>
                    <div class="product-meta">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.cat}</p>
                        <div class="product-price">${product.price.toLocaleString()} ₽</div>
                    </div>
                    <div class="product-action home-catalog-action">
                        <button class="add-cart-btn" onclick="addToCart('${product.name}', ${product.price})">В корзину</button>
                    </div>
                </article>
            `).join('')}
        </div>
    `;

    tabsContainer.querySelectorAll('.home-catalog-tab').forEach(button => {
        button.addEventListener('click', () => {
            tabsContainer.dataset.activeCategory = button.dataset.category;
            renderHomeCatalog();
        });
    });

    updateHomeCatalogSummary();
}

function updateHomeCatalogSummary() {
    const sumNode = document.getElementById('homeCatalogCartSum');
    if (!sumNode) return;
    const sum = cart.reduce((acc, item) => acc + item.price, 0);
    sumNode.innerText = `${sum.toLocaleString()} ₽`;
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

async function initUserCabinet() {
    try {
        const response = await fetch('/api/cabinet/me');
        const data = await response.json();
        if (data.authenticated) {
            currentUser = data.user;
            userPoints = data.user.points || 0;
        } else {
            currentUser = null;
            userPoints = 0;
        }
        updatePointsUI();
    } catch (error) {
        console.error('Cabinet init failed', error);
    }
}

function buildCabinetAuthView() {
    return `
        <div style="display:grid; gap:14px; text-align:left; margin-top:20px;">
            <input id="cabinetName" class="cart-form-input" type="text" placeholder="Имя (для регистрации)">
            <input id="cabinetPhone" class="cart-form-input" type="tel" placeholder="Телефон">
            <input id="cabinetEmail" class="cart-form-input" type="email" placeholder="Email (необязательно)">
            <input id="cabinetPassword" class="cart-form-input" type="password" placeholder="Пароль">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <button class="btn btn-primary" onclick="submitCabinetAuth('login')">Войти</button>
                <button class="btn btn-ghost" onclick="submitCabinetAuth('register')">Регистрация</button>
            </div>
        </div>
    `;
}

function buildCabinetProfileView(transactions = []) {
    const history = transactions.length ? transactions.map(item => `
        <div style="display:flex; justify-content:space-between; gap:15px; padding:12px 0; border-bottom:1px solid var(--border-color); font-size:14px;">
            <div>
                <div style="font-weight:600;">${item.description}</div>
                <div style="font-size:12px; color:var(--text-muted);">${new Date(item.created_at).toLocaleString('ru-RU')}</div>
            </div>
            <div style="font-weight:800; color:${item.amount >= 0 ? 'var(--accent)' : 'var(--text-main)'};">${item.amount >= 0 ? '+' : ''}${item.amount}</div>
        </div>
    `).join('') : '<div style="color:var(--text-muted); font-size:14px;">Пока нет операций по баллам.</div>';

    return `
        <div style="text-align:left; margin-top:20px;">
            <div style="display:grid; gap:6px; margin-bottom:20px;">
                <div style="font-weight:700; font-size:18px;">${currentUser.name}</div>
                <div style="color:var(--text-muted); font-size:14px;">${currentUser.phone}</div>
                <div style="color:var(--text-muted); font-size:14px;">${currentUser.email || 'Email не указан'}</div>
            </div>
            <div style="background:#000; color:#fff; padding:20px; border-radius:18px; margin-bottom:20px;">
                <div style="font-size:11px; opacity:0.65; text-transform:uppercase; letter-spacing:0.08em;">Баланс</div>
                <div style="font-size:38px; font-weight:900; font-family:var(--font-head);">${userPoints}</div>
                <div style="font-size:12px; color:#aaa;">1 балл = 1 рубль</div>
            </div>
            <div style="font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-muted); margin-bottom:12px;">История баллов</div>
            <div style="max-height:220px; overflow:auto; padding-right:6px;">${history}</div>
        </div>
    `;
}

async function openCabinetModal() {
    ensureModalExists();
    const modal = document.getElementById('detailModal');
    const response = await fetch('/api/cabinet/me');
    const data = await response.json();
    if (data.authenticated) {
        currentUser = data.user;
        userPoints = data.user.points || 0;
    }
    document.getElementById('dmImg').src = '/img/BMW.webp';
    document.getElementById('dmTitle').innerText = currentUser ? 'ЛИЧНЫЙ КАБИНЕТ' : 'PRIVATE CLUB';
    document.getElementById('dmPrice').innerHTML = currentUser
        ? `<i class="fa-solid fa-gem" style="color:var(--accent);"></i> ${userPoints.toLocaleString()} БАЛЛОВ`
        : 'Вход и регистрация';
    document.getElementById('dmDesc').innerHTML = currentUser
        ? buildCabinetProfileView(data.transactions || [])
        : `Зарегистрируйтесь, чтобы хранить бонусный баланс на сервере.${buildCabinetAuthView()}`;
    document.getElementById('dmBtn').innerText = currentUser ? 'ВЫЙТИ' : 'К КАТАЛОГУ';
    document.getElementById('dmBtn').onclick = currentUser
        ? logoutCabinet
        : () => { closeDetailModal(); window.location.href = '/catalog'; };
    updatePointsUI();
    modal.classList.add('active');
}

async function submitCabinetAuth(mode) {
    const payload = {
        name: document.getElementById('cabinetName')?.value || '',
        phone: document.getElementById('cabinetPhone')?.value || '',
        email: document.getElementById('cabinetEmail')?.value || '',
        password: document.getElementById('cabinetPassword')?.value || ''
    };
    const endpoint = mode === 'register' ? '/api/cabinet/register' : '/api/cabinet/login';
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
        showToast(data.message || 'Ошибка кабинета', 'error');
        return;
    }
    currentUser = data.user;
    userPoints = data.user.points || 0;
    updatePointsUI();
    showToast(mode === 'register' ? 'Кабинет создан' : 'Вход выполнен', 'success');
    openCabinetModal();
}

async function logoutCabinet() {
    await fetch('/api/cabinet/logout', { method: 'POST' });
    currentUser = null;
    userPoints = 0;
    updatePointsUI();
    closeDetailModal();
    showToast('Вы вышли из кабинета', 'success');
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
            return;
        }

        (async () => {
            try {
                const remoteImage = await fetchCarImageFromWikimedia(input);
                if (remoteImage) {
                img.src = remoteImage.imageUrl;
                title.innerHTML = `${input.toUpperCase()}<span style="display:block; font-size:12px; color:var(--text-muted); margin-top:8px;">AUTO DISCOVERY • Wikimedia Commons</span>`;
                showToast('Модель найдена в браузере', 'success', 'fa-globe');
                productsDB.slice(0, 3).forEach(p => {
                    parts.innerHTML += `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding: 20px 0; border-bottom: 1px solid var(--border-color);">
                            <div><div style="font-weight:500; font-size:14px;">${p.name}</div><div style="color:var(--text-main); font-size:13px; font-weight:600;">${p.price.toLocaleString()} ₽</div></div>
                            <button onclick="handleConfiguratorAdd(this, '${p.name}', ${p.price})" class="config-plus-btn"><i class="fa-solid fa-plus"></i></button>
                        </div>`;
                });
                return;
            }

                img.src = '/img/main_3.webp';
                title.innerHTML = `${input.toUpperCase()}<span style="display:block; font-size:12px; color:var(--text-muted); margin-top:8px;">Изображение не найдено</span>`;
                parts.innerHTML = '<div style="color:var(--text-muted); font-size:14px;">Не нашли точное фото этой модели. Попробуйте уточнить запрос: например, "BMW X5 G05".</div>';
                showToast('Фото не найдено, уточните модель', 'error', 'fa-triangle-exclamation');
            } catch (error) {
                img.src = '/img/main_3.webp';
                title.innerHTML = `${input.toUpperCase()}<span style="display:block; font-size:12px; color:var(--text-muted); margin-top:8px;">Ошибка поиска изображения</span>`;
                parts.innerHTML = '<div style="color:var(--text-muted); font-size:14px;">Внешний поиск временно недоступен. Попробуйте позже.</div>';
                showToast('Ошибка внешнего поиска', 'error', 'fa-triangle-exclamation');
            }
        })();
    }, 1500);
}

function handleConfiguratorAdd(btn, name, price) {
    if(btn.classList.contains('checked')) return;
    addToCart(name, price);
    btn.classList.add('checked');
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => { btn.classList.remove('checked'); btn.innerHTML = '<i class="fa-solid fa-plus"></i>'; }, 2000);
}

function initCheckoutPanel() {
    const sidebar = document.getElementById('cartSidebar');
    const list = document.getElementById('cartList');
    if (!sidebar || !list || document.getElementById('cartCheckoutPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'cartCheckoutPanel';
    panel.className = 'cart-checkout-panel';
    panel.innerHTML = `
        <div class="cart-form-grid">
            <div class="cart-form-field">
                <label for="checkoutName">ФИО</label>
                <input id="checkoutName" class="cart-form-input" data-checkout-field="name" type="text" placeholder="Иванов Иван Иванович" value="${checkoutFormState.name || ''}">
            </div>
            <div class="cart-form-field">
                <label for="checkoutPhone">Телефон</label>
                <input id="checkoutPhone" class="cart-form-input" data-checkout-field="phone" type="tel" placeholder="+7 (999) 123-45-67" value="${checkoutFormState.phone || ''}">
            </div>
            <div class="cart-form-field">
                <label for="checkoutEmail">Email</label>
                <input id="checkoutEmail" class="cart-form-input" data-checkout-field="email" type="email" placeholder="name@email.com" value="${checkoutFormState.email || ''}">
            </div>
            <div class="cart-form-field cart-form-field-address">
                <label for="address">Адрес</label>
                <input id="address" class="cart-form-input" data-checkout-field="address" type="text" placeholder="Название ПВЗ: адрес" value="${checkoutFormState.address || ''}" autocomplete="off">
                <div id="suggestions-container" class="suggestions-container"></div>
            </div>
        </div>
        <div class="pickup-map-block">
            <div class="pickup-map-header">
                <div>Выберите адрес на карте или найдите ПВЗ</div>
                <span id="pickupMapStatus" class="pickup-map-status">Кликните по карте, введите адрес или нажмите на службу доставки</span>
            </div>
            <div id="pickupProviderButtons" class="pickup-provider-buttons">
                <button type="button" class="pickup-provider-btn" onclick="loadPVZ('yandex')">Яндекс Маркет</button>
                <button type="button" class="pickup-provider-btn" onclick="loadPVZ('pochta')">Почта России</button>
                <button type="button" class="pickup-provider-btn" onclick="loadPVZ('sdek')">СДЭК</button>
            </div>
            <div id="map" class="pickup-map"></div>
        </div>
    `;

    list.insertAdjacentElement('afterend', panel);

    document.querySelectorAll('[data-checkout-field]').forEach(input => {
        input.addEventListener('input', event => {
            checkoutFormState[event.target.dataset.checkoutField] = event.target.value;
            localStorage.setItem('williCheckoutForm', JSON.stringify(checkoutFormState));
            validateCheckout();
        });
    });

    loadYandexMaps()
        .then(ymaps => ymaps.ready(initMap))
        .catch(error => {
            console.error(error);
            const status = document.getElementById('pickupMapStatus');
            if (status) status.textContent = 'Не удалось загрузить Яндекс Карты.';
        });
}

function validateCheckout() {
    localStorage.setItem('williCheckoutForm', JSON.stringify(checkoutFormState));
}

async function loadYandexMaps() {
    if (window.ymaps) {
        return window.ymaps;
    }
    if (!yandexMapsLoader) {
        yandexMapsLoader = fetch('/config')
            .then(resp => resp.json())
            .then(data => new Promise((resolve, reject) => {
                const apiKey = data.YANDEX_MAPS_API_KEY;
                if (!apiKey) {
                    reject(new Error('YANDEX_MAPS_API_KEY is not configured'));
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
                script.onload = () => resolve(window.ymaps);
                script.onerror = () => reject(new Error('Yandex Maps script failed to load'));
                document.head.appendChild(script);
            }));
    }
    return yandexMapsLoader;
}

function initMap() {
    if (map) return;

    const mapContainer = document.getElementById('map');
    const addressInput = document.getElementById('address');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const status = document.getElementById('pickupMapStatus');

    if (!mapContainer || !addressInput || typeof ymaps === 'undefined') return;

    map = new ymaps.Map('map', {
        center: [55.755864, 37.617698],
        zoom: 4,
        controls: ['zoomControl', 'fullscreenControl']
    });

    pvzCollection = new ymaps.GeoObjectCollection();

    ymaps.geolocation.get({ provider: 'yandex', mapStateAutoApply: true }).then(function(result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        const bounds = result.geoObjects.get(0)?.properties.get('boundedBy');
        if (bounds) {
            map.setBounds(bounds, { checkZoomRange: true });
        } else {
            const coords = result.geoObjects.get(0)?.geometry.getCoordinates();
            if (coords) map.setCenter(coords, 12);
        }
    }).catch(() => {});

    map.events.add('click', function(e) {
        const coords = e.get('coords');
        setPlacemark(coords);
        getAddress(coords);
    });

    addressInput.addEventListener('input', function() {
        const query = addressInput.value;
        checkoutFormState.address = query;
        validateCheckout();

        if (query.length < 3) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            return;
        }

        ymaps.suggest(query).then(function(items) {
            suggestionsContainer.innerHTML = '';
            if (items.length > 0) {
                suggestionsContainer.style.display = 'block';
                items.forEach(function(item) {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = item.displayName;

                    div.onclick = function() {
                        addressInput.value = item.value;
                        checkoutFormState.address = item.value;
                        suggestionsContainer.style.display = 'none';
                        validateCheckout();

                        ymaps.geocode(item.value).then(res => {
                            const firstGeoObject = res.geoObjects.get(0);
                            if (firstGeoObject) {
                                const coords = firstGeoObject.geometry.getCoordinates();
                                map.setCenter(coords, 15);
                                setPlacemark(coords);
                            }
                        });
                    };
                    suggestionsContainer.appendChild(div);
                });
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!suggestionsContainer.contains(event.target) && event.target !== addressInput) {
            suggestionsContainer.style.display = 'none';
        }
    });

    if (status) status.textContent = 'Карта готова: выберите точку на карте или найдите ПВЗ';
}

function setPlacemark(coords) {
    if (!map) return;

    if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
    } else {
        myPlacemark = new ymaps.Placemark(coords, {}, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
        map.geoObjects.add(myPlacemark);
        myPlacemark.events.add('dragend', function() {
            getAddress(myPlacemark.geometry.getCoordinates());
        });
    }
}

function getAddress(coords) {
    const addressInput = document.getElementById('address');
    const status = document.getElementById('pickupMapStatus');
    if (!myPlacemark || !addressInput) return;

    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function(res) {
        const firstGeoObject = res.geoObjects.get(0);
        if (!firstGeoObject) return;
        const address = firstGeoObject.getAddressLine();
        addressInput.value = address;
        checkoutFormState.address = address;
        addressInput.dispatchEvent(new Event('input'));
        myPlacemark.properties.set({
            iconCaption: firstGeoObject.properties.get('name'),
            balloonContent: address
        });
        if (status) status.textContent = `Выбран адрес: ${address}`;
    });
}

window.loadPVZ = function(type) {
    const addressInput = document.getElementById('address');
    const status = document.getElementById('pickupMapStatus');
    if (!map || !addressInput || typeof ymaps === 'undefined') return;

    map.geoObjects.remove(pvzCollection);
    pvzCollection = new ymaps.GeoObjectCollection();

    let query, presetColor, label;
    if (type === 'sdek') { query = 'СДЭК'; presetColor = 'islands#greenDotIconWithCaption'; label = 'СДЭК'; }
    else if (type === 'pochta') { query = 'Почта России'; presetColor = 'islands#blueDotIconWithCaption'; label = 'Почта России'; }
    else { query = 'Яндекс Маркет'; presetColor = 'islands#redDotIconWithCaption'; label = 'Яндекс Маркет'; }

    document.querySelectorAll('.pickup-provider-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === label);
    });

    if (status) status.textContent = `Ищем пункты выдачи: ${label}...`;

    ymaps.search(query, { boundedBy: map.getBounds(), strictBounds: false, results: 10 }).then(function(res) {
        res.geoObjects.each(function(obj) {
            const title = obj.properties.get('name') || label;
            const address = obj.properties.get('description') || title;
            const coords = obj.geometry.getCoordinates();
            const placemark = new ymaps.Placemark(coords, {
                balloonContent: address,
                iconCaption: title
            }, { preset: presetColor });

            placemark.events.add('click', function() {
                addressInput.value = `${title}: ${address}`;
                checkoutFormState.address = addressInput.value;
                validateCheckout();
                if (status) status.textContent = `Выбран пункт выдачи: ${title}`;
            });

            pvzCollection.add(placemark);
        });

        map.geoObjects.add(pvzCollection);

        if (pvzCollection.getLength() > 0) {
            map.setBounds(pvzCollection.getBounds(), { checkZoomRange: true, zoomMargin: 20 });
            if (status) status.textContent = `Показаны пункты выдачи: ${label}. Нажмите на маркер.`;
        } else if (status) {
            status.textContent = `В видимой области карты не найдено пунктов «${label}». Переместите карту и попробуйте снова.`;
        }
    });
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
    updateHomeCatalogSummary();
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
    const cabinetPoints = document.getElementById('cabinetPointsValue');
    if (headerPoints) headerPoints.innerText = userPoints.toLocaleString();
    if (cabinetPoints) cabinetPoints.innerText = userPoints.toLocaleString();
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