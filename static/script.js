/* =========================================
   WILLI MEDIA | PREMIUM CORE LOGIC
   ========================================= */

/* --- БАЗА ДАННЫХ: УСЛУГИ (Из Авито) --- */
const servicesDB = [
    { 
        id: "noise_full", 
        name: "Полная шумоизоляция", 
        price: "от 60 000 ₽", 
        oldPrice: "75 000 ₽",
        shortDesc: "Эффект акустической капсулы", 
        isHit: true,
        hitLabel: "ХИТ ПРОДАЖ",
        hasPDF: true,
        img: "/img/шумка_ПОДКЛЮЧ.jpg", 
        badges: ["Тишина в салоне", "AeroCell + Noise block"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Минутка физики: кузов авто — это мембрана</h4>
                <p>Вы едете по асфальту, подвеска передает вибрацию на тонкий металл пола и арок. Металл вибрирует и работает как гигантский динамик прямо вам в уши. Этот гул утомляет нервную систему быстрее, чем пробки.</p>
                <p>Мы предлагаем <strong>Полный антишум под ключ</strong>. Укатываем пол, арки, двери, багажник и торпедо материалами STP Premium. Это не легкая китайская пенка, это тяжелая, плотная шумка, которая гасит резонанс физической массой.</p>
                <ul class="premium-features">
                    <li><i class="fa-solid fa-ear-listen"></i> <span>Снижение общего шума до 40-50%</span></li>
                    <li><i class="fa-solid fa-wind"></i> <span>Можно говорить шепотом на 130 км/ч</span></li>
                    <li><i class="fa-solid fa-music"></i> <span>Музыка звучит без искажений</span></li>
                </ul>
                <p class="summary-text">Вы садитесь, закрываете дверь — и город пропадает.</p>
            </div>
        `
    },
    { 
        id: "noise_doors", 
        name: "Шумоизоляция дверей", 
        price: "от 12 000 ₽", 
        oldPrice: "16 000 ₽",
        shortDesc: "4 слоя. Акустика + боковой шум", 
        isHit: true,
        hitLabel: "ЧАСТЫЙ ВЫБОР",
        hasPDF: true,
        img: "/img/шумка_ДВЕРИ_в4слоя.jpg", 
        badges: ["Глухой хлопок двери", "Улучшение автозвука"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Превращаем дверь из консервной банки в закрытый короб</h4>
                <p>Базовая процедура, с которой стоит начать. Мы используем 4 слоя премиальных материалов (Aerosel 6, Legenda, Relief), чтобы полностью убрать дребезг металла и пластика.</p>
                <ul class="premium-features">
                    <li><i class="fa-solid fa-car-side"></i> <span>Соседние машины в потоке перестают гудеть над ухом</span></li>
                    <li><i class="fa-solid fa-shield-halved"></i> <span>Двери закрываются с благородным глухим хлопком</span></li>
                    <li><i class="fa-solid fa-compact-disc"></i> <span>Штатная музыка находит потерянные басы</span></li>
                </ul>
                <p class="summary-text">Дверь становится монолитной, уходят все сверчки и скрипы салонного пластика.</p>
            </div>
        `
    },
    { 
        id: "noise_arches", 
        name: "Шумоизоляция арок", 
        price: "от 18 000 ₽", 
        oldPrice: "22 000 ₽",
        shortDesc: "Убираем гул от колес и трассы", 
        hasPDF: true,
        img: "/img/шумка_АРКИ.jpg", 
        badges: ["-50% гула колес", "Толстая мастика"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Основной источник головной боли — устранен</h4>
                <p>Колесные арки — самое уязвимое место любого современного авто. Шум от шипов, шершавого асфальта и луж передается напрямую в салон. Мы укатываем металл толстым слоем виброизоляции и специальной мастики.</p>
                <ul class="premium-features">
                    <li><i class="fa-solid fa-road"></i> <span>Сразу уходит мерзкий гул от шипов и стыков</span></li>
                    <li><i class="fa-solid fa-water"></i> <span>Не слышно ударов воды и камней по кузову</span></li>
                    <li><i class="fa-solid fa-stopwatch"></i> <span>Мастхэв для тех, кто много ездит по трассе</span></li>
                </ul>
            </div>
        `
    },
    { 
        id: "doors_closer", 
        name: "Установка доводчиков", 
        price: "от 10 000 ₽", 
        oldPrice: "15 000 ₽",
        shortDesc: "Плавное закрытие без хлопков", 
        isHit: true,
        hitLabel: "ПРЕМИУМ КОМФОРТ",
        img: "/img/Оклейка_Пленкой.jpg", // Замените на фото доводчиков, если появится
        badges: ["Сохранение гарантии", "Бесшумный замок"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Ощущение автомобиля классом выше</h4>
                <p>Забудьте о необходимости хлопать дверями со всей силы. Премиальные доводчики плавно и бесшумно притягивают дверь до полного закрытия.</p>
                <ul class="premium-features">
                    <li><i class="fa-solid fa-check"></i> <span>Установка pin-to-pin без сверления кузова</span></li>
                    <li><i class="fa-solid fa-check"></i> <span>Сохранение заводской дилерской гарантии</span></li>
                    <li><i class="fa-solid fa-check"></i> <span>Безопасность для детей (защита от защемления)</span></li>
                </ul>
            </div>
        `
    },
    { 
        id: "wrap_ppf", 
        name: "Оклейка полиуретаном", 
        price: "от 35 000 ₽", 
        oldPrice: "50 000 ₽",
        shortDesc: "Броня для вашего кузова", 
        isHit: true,
        hitLabel: "ИНВЕСТИЦИЯ В АВТО",
        img: "/img/Оклейка_Пленкой.jpg", 
        badges: ["Полиуретан 200 мкр", "Самовосстановление"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Ваша машина всегда выглядит как из автосалона</h4>
                <p>Единственный рабочий способ защитить кузов от сколов, пескоструя, притертостей на парковке и химии на мойках. Мы используем только топовый полиуретан толщиной 200 микрон, который не желтеет и обладает свойством самозаживления царапин на солнце.</p>
                <ul class="premium-features">
                    <li><i class="fa-solid fa-gem"></i> <span>Глубокий леденцовый блеск кузова</span></li>
                    <li><i class="fa-solid fa-shield"></i> <span>Защита зон риска (капот, бампер, фары, зеркала)</span></li>
                    <li><i class="fa-solid fa-money-bill-trend-up"></i> <span>Сохраняет стоимость авто при перепродаже</span></li>
                </ul>
                <p class="summary-text">Дешевле оклеить пленкой сейчас, чем перекрашивать капот через год.</p>
            </div>
        `
    },
    { 
        id: "tint", 
        name: "Тонировка стекол", 
        price: "от 1 500 ₽", 
        shortDesc: "Приватность и защита от солнца", 
        img: "/img/тонировка_АВТО.jpg", 
        badges: ["Защита от УФ", "Идеальная видимость"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Стиль, комфорт и защита салона</h4>
                <p>Тонировка стекол автомобиля качественными металлизированными и керамическими пленками. Салон меньше нагревается летом, а кожа и пластик защищены от выгорания.</p>
            </div>
        `
    },
    { 
        id: "polish", 
        name: "Полировка", 
        price: "от 5 000 ₽", 
        shortDesc: "Восстановление блеска", 
        img: "/img/Полировка_АВТО.jpg", 
        badges: ["Глубокий блеск", "Удаление царапин"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Зеркальное отражение вашего авто</h4>
                <p>Профессиональная восстановительная и легкая полировка кузова. Убираем "паутинку", голограммы и мелкие царапины, возвращая лаку заводскую прозрачность.</p>
            </div>
        `
    },
    { 
        id: "ambient", 
        name: "Подсветка салона", 
        price: "от 10 000 ₽", 
        shortDesc: "Контурная Ambient-подсветка", 
        img: "/img/подсветка_САЛОН.jpg", 
        badges: ["Управление со смартфона", "Сотни цветов"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Новая атмосфера в салоне</h4>
                <p>Интеграция контурной подсветки (Ambient light) в дверные карты, торпедо и зону ног. Управление цветом и яркостью прямо с вашего телефона. Выглядит как штатная опция премиум-класса.</p>
            </div>
        `
    },
    { 
        id: "steering", 
        name: "Перетяжка руля", 
        price: "от 4 000 ₽", 
        shortDesc: "Тактильный восторг", 
        img: "/img/Перетяжка_РУЛЬ.jpg", 
        badges: ["Итальянская Nappa", "Заводской шов"],
        fullDesc: `
            <div class="premium-desc">
                <h4>Ощущение новой машины в руках</h4>
                <p>Руль — это то, с чем вы контактируете 100% времени за рулем. Перетяжка премиальной кожей (Nappa), алькантарой или экокожей с сохранением подогрева и идеальным заводским швом макраме.</p>
            </div>
        `
    }
];

/* --- ОБНОВЛЕННАЯ ФУНКЦИЯ РЕНДЕРИНГА УСЛУГ --- */
function renderGrids() {
    const servGrid = document.getElementById('servicesGrid');
    if (servGrid) {
        servGrid.innerHTML = '';
        servicesDB.forEach((s, index) => {
            const hitBadge = s.isHit ? `<div class="badge-hit">${s.hitLabel || 'ХИТ'}</div>` : '';
            const priceHtml = s.oldPrice 
                ? `<span class="old-price">${s.oldPrice}</span> <span class="new-price">${s.price}</span>` 
                : `<span class="new-price">${s.price}</span>`;

            servGrid.innerHTML += `
                <div class="product-card service-card reveal delay-${(index % 3) + 1}">
                    ${hitBadge}
                    <div class="product-image" onclick="openDetailModal('service', '${s.id}')">
                        <img src="${s.img}" alt="${s.name}" onerror="this.src='https://via.placeholder.com/1600x1200/111111/555555?text=WILLI+MEDIA'">
                    </div>
                    <div class="product-meta" style="width: 100%; text-align: left; align-items: flex-start;">
                        <h3 class="product-title" style="font-size: 18px; margin-bottom: 8px;">${s.name}</h3>
                        <p class="product-desc" style="max-width: 100%; margin-bottom: 15px;">${s.shortDesc}</p>
                        <div class="product-price-wrapper" style="margin-top: auto;">
                            ${priceHtml}
                        </div>
                    </div>
                    <div class="product-action">
                        <button class="add-cart-btn" onclick="openDetailModal('service', '${s.id}')">Узнать подробнее</button>
                    </div>
                </div>`;
        });
    }

    // Рендер каталога оставляем без изменений (из вашего кода)
    const catGrid = document.getElementById('catalogGrid');
    // ... остальной код renderGrids для товаров ...
}

/* --- БАЗА ДАННЫХ: ТОВАРЫ (Шумка, спирт, клипсы) --- */
let productsDB = [
    { id: 101, name: "Legenda 4", cat: "ВИБРОИЗОЛЯЦИЯ", price: 650, img: "/img/part_1.png", desc: "Премиальная виброизоляция. Эффективно убирает гул металла и структурные вибрации.", badges: ["Убирает гул", "Толщина 4мм"] },
    { id: 102, name: "Relief", cat: "ЗВУКОПОГЛОТИТЕЛЬ", price: 850, img: "/img/part_2.png", desc: "Звукопоглощающий материал. Отлично поглощает шум и убирает эффект эха в дверях.", badges: ["Поглощает шум", "Анти-эхо"] },
    { id: 103, name: "Legenda 1.5", cat: "АНТИСКРИП", price: 450, img: "/img/part_3.png", desc: "Тонкий материал для обработки дверных карт. Полностью убирает скрипы пластиковой обшивки.", badges: ["Убирает скрип", "Для обшивки"] },
    { id: 104, name: "Legenda 2", cat: "ИЗОЛЯЦИЯ", price: 550, img: "/img/part_4.png", desc: "Материал для закрытия технологических отверстий. Создает герметичный короб для идеального звучания динамика.", badges: ["Герметичность", "Для автозвука"] },
    { id: 105, name: "Обезжириватель (Спирт)", cat: "РАСХОДНИКИ", price: 350, img: "/img/part_5.png", desc: "Профессиональный изопропиловый спирт для подготовки поверхностей перед оклейкой и шумоизоляцией.", badges: ["Очистка 99%", "Без разводов"] },
    { id: 106, name: "Набор VAG/BMW клипс", cat: "КРЕПЕЖ", price: 1200, img: "/img/part_6.png", desc: "Профессиональный набор крепежных клипс для дверных карт и обшивки. Незаменимо при разборке салона.", badges: ["OEM Качество", "50 штук"] }
];



const CATALOG_PAGE_SIZE = 12;
let catalogOffset = 0;
let hasMoreCatalogProducts = true;
let isCatalogLoading = false;
let catalogObserver = null;
const carBrands = ["BMW X5", "BMW X6", "Li L9", "Zeekr 001", "Porsche Cayenne", "Mercedes G-Class"];
const carDB = {
    "bmw x5": { img: "/img/car_bmw_x5.webp", specs: "G05 • 3.0D / 4.4i • M-Sport" },
    "li l9": { img: "/img/car_li_l9.webp", specs: "EREV • Max/Pro • 21' Wheels" },
    "zeekr 001": { img: "/img/car_zeekr_001.png", specs: "YOU/ME/WE • Z-Sport" }
};

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

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initSmartHeader();
    initScrollReveal();
    initDatalist();
    await initUserCabinet();  // Ждем загрузки данных пользователя
    setActiveMenuLink(); 
    checkDailyBonus();   
    updatePointsUI();
    updateCartUI();
    await loadProductsFromServer({ reset: true });  // Ждем загрузки товаров
    renderGrids();
    initCatalogLazyLoad();  // Теперь currentUser инициализирован
    renderHomeCatalog();
    initSmartSelection();
    initSmartSelection();
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
            const adminActions = (currentUser && currentUser.is_admin) ? `
                <div style="display:flex; gap:8px; margin-top:10px;">
                    <button class="btn btn-ghost" style="flex:1; border:1px solid #ddd; font-size:12px; padding:8px;" onclick="openEditProductModal(${p.id}); event.stopPropagation();">
                        <i class="fa-solid fa-pen"></i> Изменить
                    </button>
                    <button class="btn btn-ghost" style="flex:1; border:1px solid #f1c0c0; color:#b91c1c; font-size:12px; padding:8px;" onclick="deleteProduct(${p.id}); event.stopPropagation();">
                        <i class="fa-solid fa-trash"></i> Удалить
                    </button>
                </div>
            ` : '';
            catGrid.innerHTML += `
                <div class="product-card">
                    <button class="wishlist-btn" onclick="showToast('Добавлено в избранное', 'success', 'fa-heart')"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-image" onclick="openDetailModal('product', ${p.id})">
                        <img src="${p.img}" alt="${escapeHtml(p.name)}" onerror="this.src='https://via.placeholder.com/400x400/f4f5f7/cccccc?text=ТОВАР'">
                    </div>
                    <div class="product-meta">
                        <h3 class="product-title">${escapeHtml(p.name)}</h3>
                        <p class="product-desc">${escapeHtml(p.cat)}</p>
                        <div class="product-price" style="font-weight:600;">${p.price.toLocaleString()} ₽</div>
                        ${adminActions}
                    </div>
                    <div class="product-action">
                        <button class="add-cart-btn" onclick="addToCart(${JSON.stringify(p.name)}, ${p.price})">В корзину</button>
                    </div>
                </div>`;
        });
        
        // Добавляем кнопку добавления товара для администраторов
        if (currentUser && currentUser.is_admin) {
            catGrid.innerHTML += `
                <div class="product-card add-product-card" onclick="openAddProductModal()" style="cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <i class="fa-solid fa-plus" style="font-size: 48px; color: #ccc; margin-bottom: 12px; display: block;"></i>
                        <p style="color: #999; font-size: 14px; margin: 0;">Добавить товар</p>
                    </div>
                </div>`;
        }
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
    
    // Очищаем старые бейджи и кнопки PDF
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
    
    let pdfBtnWrapper = document.getElementById('dmPdfWrapper');
    if(pdfBtnWrapper) pdfBtnWrapper.remove();

    let item = type === 'service' ? servicesDB.find(s => s.id === id) : productsDB.find(p => p.id === id);
    if (!item) return;

    img.src = item.img || '';
    img.onerror = () => img.src = 'https://via.placeholder.com/1600x1200/111111/555555?text=WILLI+MEDIA';
    title.innerText = item.name;
    
    // Форматирование цены со скидкой
    if(item.oldPrice) {
        price.innerHTML = `<span style="text-decoration: line-through; color: #888; font-size: 16px; margin-right: 10px;">${item.oldPrice}</span> <span style="color: var(--accent);">${item.price}</span>`;
    } else {
        price.innerText = item.price.toLocaleString ? item.price.toLocaleString() + ' ₽' : item.price;
        price.style.color = "var(--text-main)";
    }
    
    desc.innerHTML = item.fullDesc || item.desc; 
    
    badgesContainer.innerHTML = '';
    if (item.badges) {
        item.badges.forEach((bText, i) => {
            const isSuccess = i % 2 === 0;
            badgesContainer.innerHTML += `<div class="ui-badge ${isSuccess ? 'dark' : 'accent'}"><i class="fa-solid ${isSuccess ? 'fa-check-double' : 'fa-star'}"></i> ${bText}</div>`;
        });
    }

    // ДОБАВЛЕНИЕ КНОПКИ PDF ДЛЯ ШУМОИЗОЛЯЦИИ
    if (item.hasPDF) {
        pdfBtnWrapper = document.createElement('div');
        pdfBtnWrapper.id = 'dmPdfWrapper';
        pdfBtnWrapper.style.marginBottom = '20px';
        pdfBtnWrapper.innerHTML = `
            <a href="/Wills_Details_Price_List.pdf" target="_blank" class="pdf-btn">
                <i class="fa-solid fa-file-pdf"></i> Скачать полный прайс-лист (PDF)
            </a>
        `;
        btn.parentNode.insertBefore(pdfBtnWrapper, btn);
    }

    if (type === 'service') {
        btn.innerHTML = 'ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ <i class="fa-brands fa-telegram" style="margin-left:8px;"></i>';
        btn.className = "btn btn-primary"; // Возвращаем класс красивой кнопки
        btn.style.width = "100%";
        btn.onclick = () => window.open('https://t.me/wills_deatails', '_blank');
    } else {
        btn.innerText = "В КОРЗИНУ";
        btn.className = "add-cart-btn";
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

async function loadProductsFromServer({ reset = false, limit = CATALOG_PAGE_SIZE } = {}) {
    if (isCatalogLoading) return;
    if (reset) {
        catalogOffset = 0;
        hasMoreCatalogProducts = true;
        productsDB = [];
    }
    if (!hasMoreCatalogProducts) return;

    isCatalogLoading = true;
    try {
        const response = await fetch(`/api/products?limit=${limit}&offset=${catalogOffset}`);
        if (response.ok) {
            const data = await response.json();
            const incoming = Array.isArray(data.products) ? data.products : [];
            productsDB = reset ? incoming : [...productsDB, ...incoming];
            catalogOffset += incoming.length;
            hasMoreCatalogProducts = Boolean(data.pagination?.has_more);
        }
    } catch (error) {
        console.log('Ошибка при загрузке товаров:', error);
    } finally {
        isCatalogLoading = false;
    }
}

function initCatalogLazyLoad() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    const sentinel = document.createElement('div');
    sentinel.id = 'catalogLoadSentinel';
    sentinel.style.height = '1px';
    grid.parentElement.appendChild(sentinel);

    if (catalogObserver) catalogObserver.disconnect();
    catalogObserver = new IntersectionObserver(async (entries) => {
        if (!entries[0].isIntersecting || !hasMoreCatalogProducts || isCatalogLoading) return;
        await loadProductsFromServer();
        renderGrids();
    }, { rootMargin: '300px' });

    catalogObserver.observe(sentinel);
}

function openAddProductModal() {
    if (!currentUser || !currentUser.is_admin) {
        showToast('У вас нет прав администратора', 'error', 'fa-lock');
        return;
    }
    
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.classList.add('active');
        const form = document.getElementById('addProductForm');
        if (form) {
            form.reset();
        }
        // Скрыть превью при открытии
        const preview = document.getElementById('productImagePreview');
        if (preview) {
            preview.style.display = 'none';
        }
        // Добавить слушатель для превью
        const imageInput = document.getElementById('productImage');
        if (imageInput) {
            imageInput.addEventListener('change', handleImagePreview);
        }
    }
}

function handleImagePreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('productImagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function openEditProductModal(productId) {
    if (!currentUser || !currentUser.is_admin) {
        showToast('У вас нет прав администратора', 'error', 'fa-lock');
        return;
    }

    const product = productsDB.find(p => p.id === productId);
    if (!product) {
        showToast('Товар не найден', 'error', 'fa-exclamation');
        return;
    }

    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name || '';
    document.getElementById('editProductCategory').value = product.cat || '';
    document.getElementById('editProductPrice').value = product.price || 0;
    document.getElementById('editProductDescription').value = product.desc || '';
    document.getElementById('editProductBadges').value = Array.isArray(product.badges) ? product.badges.join(', ') : '';
    document.getElementById('editProductCurrentImage').value = product.img || '';

    const imageInput = document.getElementById('editProductImage');
    if (imageInput) {
        imageInput.value = '';
        imageInput.removeEventListener('change', handleEditImagePreview);
        imageInput.addEventListener('change', handleEditImagePreview);
    }

    const preview = document.getElementById('editProductImagePreview');
    if (preview) {
        if (product.img) {
            preview.src = product.img;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    }

    const modal = document.getElementById('editProductModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function handleEditImagePreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('editProductImagePreview');
    if (!preview) return;

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        const currentImage = document.getElementById('editProductCurrentImage').value || '';
        if (currentImage) {
            preview.src = currentImage;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    }
}

function closeEditProductModal() {
    const modal = document.getElementById('editProductModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

async function submitAddProduct() {
    if (!currentUser || !currentUser.is_admin) {
        showToast('У вас нет прав администратора', 'error', 'fa-lock');
        return;
    }

    const form = document.getElementById('addProductForm');
    if (!form) return;

    const name = (document.getElementById('productName').value || '').trim();
    const category = (document.getElementById('productCategory').value || '').trim();
    const priceStr = (document.getElementById('productPrice').value || '').trim();
    const description = (document.getElementById('productDescription').value || '').trim();
    const imageInput = document.getElementById('productImage');
    const badgesInput = (document.getElementById('productBadges').value || '').trim();
    
    if (!name || !category || !priceStr || !description) {
        showToast('Заполните все обязательные поля', 'error', 'fa-exclamation');
        return;
    }

    const price = parseInt(priceStr);
    if (isNaN(price) || price <= 0) {
        showToast('Цена должна быть положительным числом', 'error', 'fa-exclamation');
        return;
    }

    let image_url = '';

    try {
        // Если выбран файл, загружаем его
        if (imageInput && imageInput.files && imageInput.files[0]) {
            const formData = new FormData();
            formData.append('image', imageInput.files[0]);
            
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData
            });

            const uploadData = await uploadResponse.json();
            
            if (!uploadResponse.ok) {
                showToast(uploadData.message || 'Ошибка при загрузке изображения', 'error', 'fa-exclamation');
                return;
            }
            
            image_url = uploadData.image_url || '';
        }

        const badges = badgesInput.split(',').map(b => b.trim()).filter(b => b.length > 0);

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                category,
                price,
                description,
                image_url,
                badges
            })
        });

        const data = await response.json();
        
        if (response.ok && data.status === 'success') {
            showToast('Товар успешно добавлен!', 'success', 'fa-check');
            closeAddProductModal();
            await loadProductsFromServer({ reset: true, limit: Math.max(CATALOG_PAGE_SIZE, catalogOffset || CATALOG_PAGE_SIZE) });
            renderGrids();
            renderHomeCatalog();
        } else {
            showToast(data.message || 'Ошибка при добавлении товара', 'error', 'fa-exclamation');
        }
    } catch (error) {
        showToast('Ошибка сервера: ' + error.message, 'error', 'fa-exclamation');
    }
}

async function submitEditProduct() {
    if (!currentUser || !currentUser.is_admin) {
        showToast('У вас нет прав администратора', 'error', 'fa-lock');
        return;
    }

    const productId = parseInt(document.getElementById('editProductId').value, 10);
    const name = (document.getElementById('editProductName').value || '').trim();
    const category = (document.getElementById('editProductCategory').value || '').trim();
    const priceStr = (document.getElementById('editProductPrice').value || '').trim();
    const description = (document.getElementById('editProductDescription').value || '').trim();
    const badgesInput = (document.getElementById('editProductBadges').value || '').trim();
    const imageInput = document.getElementById('editProductImage');

    if (!productId || !name || !category || !priceStr || !description) {
        showToast('Заполните все обязательные поля', 'error', 'fa-exclamation');
        return;
    }

    const price = parseInt(priceStr, 10);
    if (isNaN(price) || price <= 0) {
        showToast('Цена должна быть положительным числом', 'error', 'fa-exclamation');
        return;
    }

    let image_url = document.getElementById('editProductCurrentImage').value || '';

    try {
        if (imageInput && imageInput.files && imageInput.files[0]) {
            const formData = new FormData();
            formData.append('image', imageInput.files[0]);
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadResponse.json();

            if (!uploadResponse.ok) {
                showToast(uploadData.message || 'Ошибка при загрузке изображения', 'error', 'fa-exclamation');
                return;
            }
            image_url = uploadData.image_url || image_url;
        }

        const badges = badgesInput.split(',').map(b => b.trim()).filter(b => b.length > 0);

        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                category,
                price,
                description,
                image_url,
                badges
            })
        });

        const data = await response.json();
        if (response.ok && data.status === 'success') {
            showToast('Товар успешно обновлен!', 'success', 'fa-check');
            closeEditProductModal();
            await loadProductsFromServer({ reset: true, limit: Math.max(CATALOG_PAGE_SIZE, catalogOffset || CATALOG_PAGE_SIZE) });
            renderGrids();
            renderHomeCatalog();
        } else {
            showToast(data.message || 'Ошибка при редактировании товара', 'error', 'fa-exclamation');
        }
    } catch (error) {
        showToast('Ошибка сервера: ' + error.message, 'error', 'fa-exclamation');
    }
}

async function deleteProduct(productId) {
    if (!currentUser || !currentUser.is_admin) {
        showToast('У вас нет прав администратора', 'error', 'fa-lock');
        return;
    }

    const product = productsDB.find(p => p.id === productId);
    if (!product) {
        showToast('Товар не найден', 'error', 'fa-exclamation');
        return;
    }

    const confirmed = window.confirm(`Удалить товар "${product.name}"?`);
    if (!confirmed) return;

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        const data = await response.json();

        if (response.ok && data.status === 'success') {
            showToast('Товар удален', 'success', 'fa-check');
            await loadProductsFromServer({ reset: true, limit: Math.max(CATALOG_PAGE_SIZE, catalogOffset || CATALOG_PAGE_SIZE) });
            renderGrids();
            renderHomeCatalog();
        } else {
            showToast(data.message || 'Ошибка при удалении товара', 'error', 'fa-exclamation');
        }
    } catch (error) {
        showToast('Ошибка сервера: ' + error.message, 'error', 'fa-exclamation');
    }
}

function initSmartSelection() {
    const searchBtn = document.getElementById('searchBtn');
    const carInput = document.getElementById('carInput');
    if (!searchBtn || !carInput) return;

    searchBtn.addEventListener('click', searchCar);
    carInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchCar();
        }
    });
}

const WIKIDATA_CACHE_KEY = 'williCarImageCacheV1';

function getCarImageCache() {
    try {
        return JSON.parse(localStorage.getItem(WIKIDATA_CACHE_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function setCarImageCache(cache) {
    try {
        localStorage.setItem(WIKIDATA_CACHE_KEY, JSON.stringify(cache));
    } catch (e) {
        console.warn('Не удалось сохранить кэш изображений авто', e);
    }
}

function decodeFileName(name) {
    return name.replace(/_/g, ' ');
}

function getImageFromEntity(entity) {
    const claims = entity?.claims || {};
    const imageClaim = claims?.P18?.[0];
    return imageClaim?.mainsnak?.datavalue?.value || null;
}

function getEntityLabel(entity, fallback) {
    return entity?.labels?.ru?.value || entity?.labels?.en?.value || fallback;
}

function isAutomotiveEntity(entity, candidate) {
    const candidateText = `${candidate?.label || ''} ${candidate?.description || ''}`.toLowerCase();
    const entityDescription = `${entity?.descriptions?.ru?.value || ''} ${entity?.descriptions?.en?.value || ''}`.toLowerCase();
    const searchText = `${candidateText} ${entityDescription}`;
    const automotiveKeywords = [
        'автомобил',
        'машин',
        'car',
        'automobile',
        'motor vehicle',
        'vehicle model',
        'sedan',
        'suv',
        'crossover',
        'hatchback',
        'coupe',
        'roadster',
        'wagon',
        'electric vehicle',
        'pickup'
    ];
    const hasAutomotiveText = automotiveKeywords.some(keyword => searchText.includes(keyword));
    if (!hasAutomotiveText) return false;

    const p31Claims = entity?.claims?.P31 || [];
    if (!p31Claims.length) return hasAutomotiveText;

    const carTypeAllowlist = new Set([
        'Q3231690', // automobile model
        'Q1420',    // automobile
        'Q752870',  // motor vehicle
        'Q193692'   // electric vehicle
    ]);

    const hasCarType = p31Claims.some(claim => {
        const value = claim?.mainsnak?.datavalue?.value;
        return value?.id && carTypeAllowlist.has(value.id);
    });

    return hasCarType || hasAutomotiveText;
}

async function fetchWikidataImage(modelName) {
    const cache = getCarImageCache();
    const cacheKey = modelName.toLowerCase();
    const cacheEntry = cache[cacheKey];
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    if (cacheEntry && (now - cacheEntry.cachedAt) < sevenDaysMs) {
        return cacheEntry;
    }

    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(modelName)}&language=ru&uselang=ru&type=item&limit=5&format=json&origin=*`;
    const searchResp = await fetch(searchUrl);
    const searchData = await searchResp.json();
    const candidates = searchData?.search || [];

    for (const candidate of candidates) {
        const entityId = candidate.id;
        if (!entityId) continue;

        const entityResp = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`);
        const entityData = await entityResp.json();
        const entity = entityData?.entities?.[entityId];
        if (!isAutomotiveEntity(entity, candidate)) continue;
        const imageFileName = getImageFromEntity(entity);
        if (!imageFileName) continue;

        const commonsUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(decodeFileName(imageFileName))}`;
        const result = {
            image: commonsUrl,
            title: getEntityLabel(entity, modelName),
            specs: candidate.description || 'Источник: Wikidata'
        };
        cache[cacheKey] = { ...result, cachedAt: now };
        setCarImageCache(cache);
        return result;
    }

    return null;
}

function renderConfiguratorParts(parts, recommendedProducts = null) {
    const sourceProducts = Array.isArray(recommendedProducts) && recommendedProducts.length
        ? recommendedProducts
        : productsDB.slice(0, 3);
    parts.innerHTML = '';
    sourceProducts.slice(0, 5).forEach(p => {
        parts.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding: 20px 0; border-bottom: 1px solid var(--border-color);">
                <div><div style="font-weight:500; font-size:14px;">${p.name}</div><div style="color:var(--text-main); font-size:13px; font-weight:600;">${p.price.toLocaleString()} ₽</div></div>
                <button onclick="handleConfiguratorAdd(this, '${p.name}', ${p.price})" class="config-plus-btn"><i class="fa-solid fa-plus"></i></button>
            </div>`;
    });
}


async function fetchRecommendedProducts(modelName, modelSpecs = '') {
    try {
        const response = await fetch('/api/recommend-products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: modelName, specs: modelSpecs })
        });
        const data = await response.json();
        if (!response.ok || data.status !== 'success') {
            throw new Error(data.message || 'recommend failed');
        }
        return Array.isArray(data.products) ? data.products : [];
    } catch (error) {
        console.error('Ошибка рекомендаций:', error);
        return [];
    }
}

async function fetchModelSummary(modelName, specs = '') {
    const summaryCard = document.getElementById('resSummaryCard');
    const summaryText = document.getElementById('resSummaryText');
    if (!summaryCard || !summaryText) return;

    summaryCard.style.display = 'block';
    summaryText.textContent = 'Генерируем краткий AI summary...';

    try {
        const response = await fetch('/api/car-summary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: modelName, specs })
        });
        const data = await response.json();
        if (!response.ok || data.status !== 'success') {
            throw new Error(data.message || 'Не удалось получить summary');
        }
        summaryText.textContent = data.summary;
    } catch (error) {
        console.error(error);
        summaryText.textContent = 'Не удалось получить AI summary прямо сейчас. Попробуйте ещё раз через несколько секунд.';
    }
}

async function searchCar() {
    const rawInput = document.getElementById('carInput').value.trim();
    const input = rawInput.toLowerCase();
    if (input.length < 2) return;
    const resultDiv = document.getElementById('configResult');
    const img = document.getElementById('resImg');
    const title = document.getElementById('resTitle');
    const specs = document.getElementById('resSpecs');
    const parts = document.getElementById('resParts');
    
    resultDiv.style.display = window.innerWidth < 900 ? 'flex' : 'grid';
    if(window.innerWidth < 900) resultDiv.style.flexDirection = 'column';
    resultDiv.style.opacity = '0.5';
    showToast('Ищем модель...', 'success', 'fa-microchip');

    try {
        const key = Object.keys(carDB).find(k => input.includes(k));
        if (key) {
            const car = carDB[key];
            img.src = car.img;
            title.textContent = key.toUpperCase();
            specs.textContent = car.specs;
            const aiRecommended = await fetchRecommendedProducts(wikiResult.title, wikiResult.specs);
            renderConfiguratorParts(parts, aiRecommended);
            await fetchModelSummary(title.textContent, car.specs);
            showToast('Комплектующие найдены', 'success', 'fa-check-double');
            return;
        }

        const wikiResult = await fetchWikidataImage(rawInput);
        if (wikiResult) {
            img.src = wikiResult.image;
            title.textContent = wikiResult.title.toUpperCase();
            specs.textContent = wikiResult.specs;
            const aiRecommended = await fetchRecommendedProducts(wikiResult.title, wikiResult.specs);
            renderConfiguratorParts(parts, aiRecommended);
            await fetchModelSummary(wikiResult.title, wikiResult.specs);
            showToast('Комплектующие найдены', 'success', 'fa-check-double');
            return;
        }

        img.src = 'https://via.placeholder.com/1000x600/f4f5f7/cccccc?text=МОДЕЛЬ+НЕ+НАЙДЕНА';
        title.textContent = rawInput.toUpperCase();
        specs.textContent = 'Не нашли изображение. Попробуйте указать марку и кузов (например: BMW X5 G05)';
        parts.innerHTML = '';
        await fetchModelSummary(rawInput);
        showToast('Не удалось найти изображение модели', 'error');
    } catch (e) {
        console.error(e);
        showToast('Ошибка поиска модели', 'error');
    } finally {
        resultDiv.style.opacity = '1';
    }
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
