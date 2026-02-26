document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    const products = [
        { name: 'iPhone 17 Pro', price: '159 990 ₽', image: 'https://twigo.ru/center/iblock/5f9/6m2fcxghq6ilra6xnq5ftx32721ii1or/ifdx9jprifkl2ldfzmn2m18n91wg8mim.jpg', link: 'product-iphone17pro.html' },
        { name: 'iPhone 17', price: '129 990 ₽', image: 'https://resizer.mail.ru/p/73978d8a-5f93-5634-bdf9-01d76ca5589f/AQAKbFx8-a7PInIUF9LlnEZ2rU8B457mnO8qT2ZjKO0-xTNW6Iz6_iDA2ikvDQYScy-TRFu4k7B5F46i29vbekqvHkU.jpg', link: 'product-iphone17.html' },
        { name: 'iPhone 16 Pro', price: '139 990 ₽', image: 'https://applegod.ru/upload/iblock/876/y4mxa4utp7mj9ujt3x55jk4x1iq8wbf4.jpeg', link: 'product-iphone16pro.html' },
        { name: 'iPhone 16', price: '99 990 ₽', image: 'https://tatphone.ru/wp-content/uploads/2025/06/13367471-8.jpg', link: 'product-iphone16.html' }
    ];
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }
            
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(query)
            );
            
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(product => `
                    <a href="${product.link}" class="search-result-item">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="search-result-info">
                            <h4>${product.name}</h4>
                            <p>${product.price}</p>
                        </div>
                    </a>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div style="padding: 15px; text-align: center;">Ничего не найдено</div>';
                searchResults.classList.add('active');
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }
    
    const slider = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    
    if (slider && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSlider();
            });
        });
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        const stats = document.querySelector('.stats');
        if (!stats) return;
        
        const statsPosition = stats.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsPosition < windowHeight - 100) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 20);
            });
        }
    }
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers();
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (name.value.trim() === '') {
                showError(name, 'Введите ваше имя');
                isValid = false;
            } else {
                removeError(name);
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Введите корректный email');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Введите сообщение');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                const button = contactForm.querySelector('.submit-button');
                button.textContent = 'Отправлено!';
                button.style.background = '#34c759';
                
                setTimeout(() => {
                    button.textContent = 'Отправить сообщение';
                    button.style.background = '#0071e3';
                    contactForm.reset();
                }, 2000);
                
                showNotification('Сообщение отправлено!');
            }
        });
        
        function showError(input, message) {
            const parent = input.parentElement;
            let error = parent.querySelector('.error-message');
            
            if (!error) {
                error = document.createElement('div');
                error.className = 'error-message';
                error.style.cssText = `
                    color: #ff3b30;
                    font-size: 14px;
                    margin-top: 5px;
                    animation: fadeIn 0.3s ease;
                `;
                parent.appendChild(error);
            }
            
            error.textContent = message;
            input.style.borderColor = '#ff3b30';
        }
        
        function removeError(input) {
            const parent = input.parentElement;
            const error = parent.querySelector('.error-message');
            if (error) error.remove();
            input.style.borderColor = '#ddd';
        }
    }
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#34c759' : '#ff3b30'};
            color: white;
            padding: 15px 25px;
            border-radius: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #0071e3;
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(0,113,227,0.3);
    `;
    
    scrollTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(scrollTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation.split('/').pop()) {
            item.classList.add('active');
        }
    });
});

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }
    
    init() {
        this.createCartIcon();
        this.updateCartCount();
        this.bindEvents();
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    }
    
    createCartIcon() {
        const navContainer = document.querySelector('.nav-container');
        const cartIcon = document.createElement('div');
        cartIcon.className = 'cart-icon';
        cartIcon.innerHTML = `
            <button class="cart-btn">
                🛒 <span class="cart-count">0</span>
            </button>
            <div class="cart-preview"></div>
        `;
        
        const cartBtn = cartIcon.querySelector('.cart-btn');
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
        
        navContainer.appendChild(cartIcon);
    }
    
    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) cartCount.textContent = count;
    }
    
    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartPreview();
        showNotification(`${product.name} добавлен в корзину`);
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartPreview();
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    }
    
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartPreview();
                
                if (window.location.pathname.includes('cart.html')) {
                    this.renderCartPage();
                }
            }
        }
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }
    
    updateCartPreview() {
        const preview = document.querySelector('.cart-preview');
        if (!preview) return;
        
        if (this.items.length === 0) {
            preview.innerHTML = '<div style="padding: 20px; text-align: center;">Корзина пуста</div>';
            return;
        }
        
        let total = 0;
        preview.innerHTML = this.items.slice(0, 3).map(item => {
            const itemTotal = parseInt(item.price.replace(/\D/g, '')) * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${item.price} x ${item.quantity}</div>
                    </div>
                    <button class="cart-item-remove" onclick="cart.removeItem('${item.id}')">×</button>
                </div>
            `;
        }).join('');
        
        if (this.items.length > 3) {
            preview.innerHTML += `<div style="padding: 10px; text-align: center; color: #0071e3;">И еще ${this.items.length - 3} товар(а)...</div>`;
        }
        
        preview.innerHTML += `
            <div class="cart-total">Итого: ${total.toLocaleString()} ₽</div>
            <button class="cart-checkout">Перейти в корзину</button>
        `;
        
        const checkoutBtn = preview.querySelector('.cart-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
        }
    }
    
    renderCartPage() {
        const cartItemsList = document.getElementById('cartItemsList');
        const emptyCart = document.getElementById('emptyCart');
        const cartContent = document.querySelector('.cart-content');
        const cartTotalItems = document.getElementById('cartTotalItems');
        const cartTotalSum = document.getElementById('cartTotalSum');
        
        if (!cartItemsList) return;
        
        if (this.items.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartContent) cartContent.style.display = 'none';
            return;
        }
        
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartContent) cartContent.style.display = 'grid';
        
        let totalItems = 0;
        let totalSum = 0;
        
        cartItemsList.innerHTML = this.items.map(item => {
            const price = parseInt(item.price.replace(/\D/g, ''));
            const itemTotal = price * item.quantity;
            totalItems += item.quantity;
            totalSum += itemTotal;
            
            return `
                <div class="cart-item-row" data-id="${item.id}">
                    <div class="cart-item-product">
                        <img src="${item.image}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div class="cart-item-total">${itemTotal.toLocaleString()} ₽</div>
                    <button class="cart-item-remove-btn" onclick="cart.removeItem('${item.id}')">×</button>
                </div>
            `;
        }).join('');
        
        if (cartTotalItems) cartTotalItems.textContent = totalItems;
        if (cartTotalSum) cartTotalSum.textContent = `${totalSum.toLocaleString()} ₽`;
    }
    
    bindEvents() {
        document.querySelectorAll('.add-to-cart, .buy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productData = button.getAttribute('data-product');
                if (productData) {
                    const product = JSON.parse(productData);
                    this.addItem(product);
                }
            });
        });
        
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Спасибо за заказ! В ближайшее время с вами свяжется менеджер.');
                this.items = [];
                this.saveCart();
                this.renderCartPage();
                this.updateCartPreview();
            });
        }
    }
}

class UserAuth {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.init();
    }
    
    init() {
        this.updateUI();
        this.bindAuthEvents();
    }
    
    register(userData) {
        if (this.users.find(u => u.email === userData.email)) {
            showNotification('Пользователь с таким email уже существует', 'error');
            return false;
        }
        
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            orders: [
                {
                    id: '12345',
                    date: '2026-02-25',
                    status: 'delivered',
                    items: [
                        { name: 'iPhone 17 Pro', quantity: 1, price: 159990, image: 'https://twigo.ru/center/iblock/5f9/6m2fcxghq6ilra6xnq5ftx32721ii1or/ifdx9jprifkl2ldfzmn2m18n91wg8mim.jpg' }
                    ],
                    total: 159990
                },
                {
                    id: '12344',
                    date: '2026-02-20',
                    status: 'processing',
                    items: [
                        { name: 'iPhone 16', quantity: 1, price: 99990, image: 'https://tatphone.ru/wp-content/uploads/2025/06/13367471-8.jpg' }
                    ],
                    total: 99990
                }
            ],
            addresses: [
                {
                    id: 1,
                    type: 'Основной адрес',
                    default: true,
                    address: 'г. Москва, ул. Тверская, д. 25, кв. 123',
                    name: 'Иван Петров',
                    phone: '+7 (999) 123-45-67'
                },
                {
                    id: 2,
                    type: 'Рабочий адрес',
                    default: false,
                    address: 'г. Москва, ул. Ленина, д. 10, офис 505',
                    name: 'Иван Петров',
                    phone: '+7 (999) 123-45-67'
                }
            ],
            wishlist: [
                {
                    id: 'iphone17pro',
                    name: 'iPhone 17 Pro',
                    price: '159 990 ₽',
                    image: 'https://twigo.ru/center/iblock/5f9/6m2fcxghq6ilra6xnq5ftx32721ii1or/ifdx9jprifkl2ldfzmn2m18n91wg8mim.jpg'
                },
                {
                    id: 'iphone16',
                    name: 'iPhone 16',
                    price: '99 990 ₽',
                    image: 'https://tatphone.ru/wp-content/uploads/2025/06/13367471-8.jpg'
                }
            ]
        };
        
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.login(userData.email, userData.password);
        return true;
    }
    
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUI();
            showNotification(`Добро пожаловать, ${user.name}!`);
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
            
            return true;
        } else {
            showNotification('Неверный email или пароль', 'error');
            return false;
        }
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        showNotification('Вы вышли из аккаунта');
        
        if (window.location.pathname.includes('profile.html')) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }
    
    updateUI() {
        const loginLink = document.getElementById('loginLink');
        const profileLink = document.getElementById('profileLink');
        
        if (this.currentUser) {
            if (loginLink) loginLink.style.display = 'none';
            if (profileLink) {
                profileLink.style.display = 'block';
                profileLink.textContent = `${this.currentUser.name}`;
            }
            
            this.updateProfilePage();
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'none';
        }
    }
    
    updateProfilePage() {
        if (!window.location.pathname.includes('profile.html') || !this.currentUser) return;
        
        const avatarPlaceholder = document.getElementById('avatarPlaceholder');
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileNameInput = document.getElementById('profileNameInput');
        const profileEmailInput = document.getElementById('profileEmailInput');
        const profilePhoneInput = document.getElementById('profilePhoneInput');
        
        if (avatarPlaceholder) {
            avatarPlaceholder.textContent = this.currentUser.name.charAt(0);
        }
        
        if (profileName) profileName.textContent = this.currentUser.name;
        if (profileEmail) profileEmail.textContent = this.currentUser.email;
        
        if (profileNameInput) profileNameInput.value = this.currentUser.name;
        if (profileEmailInput) profileEmailInput.value = this.currentUser.email;
        if (profilePhoneInput) profilePhoneInput.value = this.currentUser.phone || '';
        
        this.renderOrders();
        this.renderAddresses();
        this.renderWishlist();
    }
    
    renderOrders() {
        const ordersList = document.getElementById('ordersList');
        if (!ordersList || !this.currentUser.orders) return;
        
        ordersList.innerHTML = this.currentUser.orders.map(order => {
            const statusText = order.status === 'delivered' ? 'Доставлен' : 'В обработке';
            const statusClass = order.status === 'delivered' ? 'status-delivered' : 'status-processing';
            
            return `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-number">Заказ №${order.id}</span>
                        <span class="order-date">${new Date(order.date).toLocaleDateString('ru-RU')}</span>
                        <span class="order-status ${statusClass}">${statusText}</span>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <img src="${item.image}" alt="${item.name}">
                                <div class="order-item-info">
                                    <h4>${item.name}</h4>
                                    <p>Количество: ${item.quantity}</p>
                                    <p>${item.price.toLocaleString()} ₽</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-footer">
                        <span>Итого: ${order.total.toLocaleString()} ₽</span>
                        <button class="btn btn-outline" onclick="alert('Функция будет доступна позже')">Повторить заказ</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    renderAddresses() {
        const addressesList = document.getElementById('addressesList');
        if (!addressesList || !this.currentUser.addresses) return;
        
        addressesList.innerHTML = this.currentUser.addresses.map(addr => `
            <div class="address-card">
                <div class="address-card-header">
                    <h4>${addr.type}</h4>
                    ${addr.default ? '<span class="address-badge">По умолчанию</span>' : ''}
                </div>
                <p>${addr.address}</p>
                <p>${addr.name}, ${addr.phone}</p>
                <div class="address-actions">
                    <button class="btn btn-outline small" onclick="alert('Редактирование будет доступно позже')">Редактировать</button>
                    <button class="btn btn-outline small" onclick="alert('Удаление будет доступно позже')">Удалить</button>
                </div>
            </div>
        `).join('');
    }
    
    renderWishlist() {
        const wishlistGrid = document.getElementById('wishlistGrid');
        if (!wishlistGrid || !this.currentUser.wishlist) return;
        
        wishlistGrid.innerHTML = this.currentUser.wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p class="price">${item.price}</p>
                <button class="btn btn-primary add-to-cart" data-product='${JSON.stringify(item)}'>В корзину</button>
                <button class="wishlist-remove" onclick="userAuth.removeFromWishlist('${item.id}')">×</button>
            </div>
        `).join('');
    }
    
    removeFromWishlist(productId) {
        if (this.currentUser) {
            this.currentUser.wishlist = this.currentUser.wishlist.filter(item => item.id !== productId);
            
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = this.currentUser;
                localStorage.setItem('users', JSON.stringify(this.users));
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                
                this.renderWishlist();
                showNotification('Товар удален из избранного');
            }
        }
    }
    
    bindAuthEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                this.login(email, password);
            });
        }
        
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (password !== confirmPassword) {
                    showNotification('Пароли не совпадают', 'error');
                    return;
                }
                
                const userData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    password: password
                };
                
                this.register(userData);
            });
        }
        
        const profileMenu = document.querySelectorAll('.profile-menu li[data-tab]');
        profileMenu.forEach(item => {
            item.addEventListener('click', () => {
                const tabId = item.getAttribute('data-tab');
                
                if (tabId === 'logout') {
                    this.logout();
                    return;
                }
                
                profileMenu.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                document.querySelectorAll('.profile-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                document.getElementById(tabId + 'Tab').classList.add('active');
            });
        });
        
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.currentUser) {
                    this.currentUser.name = document.getElementById('profileNameInput').value;
                    this.currentUser.phone = document.getElementById('profilePhoneInput').value;
                    
                    const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
                    if (userIndex !== -1) {
                        this.users[userIndex] = this.currentUser;
                        localStorage.setItem('users', JSON.stringify(this.users));
                        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                        
                        this.updateUI();
                        showNotification('Данные сохранены');
                    }
                }
            });
        }
        
        const passwordForm = document.getElementById('passwordForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;
                
                if (currentPassword !== this.currentUser.password) {
                    showNotification('Неверный текущий пароль', 'error');
                    return;
                }
                
                if (newPassword !== confirmNewPassword) {
                    showNotification('Новые пароли не совпадают', 'error');
                    return;
                }
                
                this.currentUser.password = newPassword;
                
                const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
                if (userIndex !== -1) {
                    this.users[userIndex] = this.currentUser;
                    localStorage.setItem('users', JSON.stringify(this.users));
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    
                    showNotification('Пароль успешно изменен');
                    passwordForm.reset();
                }
            });
        }
        
        const addAddressBtn = document.getElementById('addAddressBtn');
        if (addAddressBtn) {
            addAddressBtn.addEventListener('click', () => {
                alert('Функция добавления адреса будет доступна позже');
            });
        }
    }
}

const cart = new ShoppingCart();
const userAuth = new UserAuth();