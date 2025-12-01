document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de la Navegación ---
    const header = document.querySelector('header');
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // 1. Menú móvil
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-active');
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Barra de navegación al hacer scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Cierra el menú móvil al hacer clic en un enlace
    window.closeMenu = function() {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    };

    // --- Lógica de las Pestañas (Tabs) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                tabContents.forEach(content => content.classList.add('hidden'));
                tabButtons.forEach(btn => btn.classList.remove('active-tab'));

                const targetContent = document.getElementById(targetTab);
                if (targetContent) targetContent.classList.remove('hidden');
                button.classList.add('active-tab');
            });
        });
    }

    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (contactForm && confirmationMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            setTimeout(() => {
                confirmationMessage.textContent = '¡Gracias por tu mensaje! Un asesor se pondrá en contacto pronto.';
                confirmationMessage.classList.remove('hidden');
                confirmationMessage.classList.add('bg-green-900', 'border', 'border-green-600', 'text-green-200');

                contactForm.reset();

                setTimeout(() => confirmationMessage.classList.add('hidden'), 8000);
            }, 500);
        });
    }

    // --- Lógica del Lightbox ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const clickableImages = document.querySelectorAll('.tab-content img, .lightbox-trigger');

    if (lightboxOverlay && clickableImages.length) {
        clickableImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxOverlay.classList.remove('hidden');
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.classList.add('hidden');
            lightboxImg.src = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);

        lightboxOverlay.addEventListener('click', (event) => {
            if (event.target === lightboxOverlay) closeLightbox();
        });
    }

    // --- Lógica de la Galería de Producto ---
    window.changeImage = function(element, newSrc) {
        const mainImage = document.getElementById('main-product-image');
        if (mainImage) {
            mainImage.src = newSrc;
        }

        document.querySelectorAll('.thumbnail-image').forEach(img => {
            img.classList.remove('border-primary', 'shadow-md');
            img.classList.add('border-transparent');
        });

        element.classList.remove('border-transparent');
        element.classList.add('border-primary', 'shadow-md');
    };

    // --- Lógica del Carrito de Compras ---
    const cartPanel = document.getElementById('cart-panel');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const toastNotification = document.getElementById('toast-notification');

    let cart = [];

    // Función para abrir el panel del carrito
    const openCart = () => {
        if (cartPanel) {
            cartPanel.classList.remove('translate-x-full');
        }
    };

    // Función para cerrar el panel del carrito
    const closeCart = () => {
        if (cartPanel) {
            cartPanel.classList.add('translate-x-full');
        }
    };

    // Función para guardar el carrito en localStorage
    const saveCart = () => {
        localStorage.setItem('tecnoVistaCart', JSON.stringify(cart));
    };

    // Función para cargar el carrito desde localStorage
    const loadCart = () => {
        const storedCart = localStorage.getItem('tecnoVistaCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        renderCart();
    };

    // Función para renderizar (dibujar) los items en el carrito
    const renderCart = () => {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-400 text-center">Tu carrito está vacío.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItemHTML = `
                    <div class="flex items-center gap-4 p-2 rounded-lg">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                        <div class="flex-grow">
                            <h4 class="font-semibold text-white text-sm">${item.name}</h4>
                            <p class="text-gray-400 text-xs">$${item.price.toFixed(2)} c/u</p>
                            <!-- Controles de cantidad -->
                            <div class="flex items-center gap-2 mt-1">
                                <button onclick="changeQuantity(${index}, -1)" class="w-6 h-6 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition">-</button>
                                <span class="font-bold text-white">${item.qty}</span>
                                <button onclick="changeQuantity(${index}, 1)" class="w-6 h-6 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition">+</button>
                            </div>
                        </div>
                        <div class="text-right">
                             <p class="font-bold text-primary text-lg">$${(item.price * item.qty).toFixed(2)}</p>
                             <button onclick="removeFromCart(${index})" class="text-gray-500 hover:text-red-500 transition-colors text-xs mt-1" title="Eliminar producto">
                                Eliminar
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += cartItemHTML;
            });
        }
 
        updateCartSummary();
    };

    // Función para actualizar el contador y el subtotal
    const updateCartSummary = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        if (cartCount) {
            cartCount.textContent = totalItems;
        }

        if (cartSubtotal) {
            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        }
    };

    // --- Lógica de la Notificación (Toast) ---
    let toastTimer;

    const showToast = (message) => {
        if (!toastNotification) return;

        // Si ya hay una notificación mostrándose, resetea el timer
        if (toastTimer) {
            clearTimeout(toastTimer);
        }

        toastNotification.textContent = message;
        toastNotification.classList.remove('opacity-0', 'translate-y-20'); // Muestra la notificación

        // Oculta la notificación después de 3 segundos
        toastTimer = setTimeout(() => {
            toastNotification.classList.add('opacity-0', 'translate-y-20');
        }, 3000);
    };

    // Función global para añadir al carrito (llamada desde el HTML)
    window.addToCart = (name, price, image) => {
        // Si el item ya existe, incrementa la cantidad. Si no, lo añade.
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ name, price, image, qty: 1 });
        }

        saveCart();
        renderCart();
        openCart(); // Abrir el carrito al añadir un producto
        showToast(`'${name}' añadido a la cotización.`); // Muestra la notificación
    };

    // Función global para cambiar la cantidad de un item
    window.changeQuantity = (index, amount) => {
        cart[index].qty += amount;
        if (cart[index].qty <= 0) { // Si la cantidad es 0 o menos, elimina el producto
            cart.splice(index, 1);
        }
        saveCart();
        renderCart();
    };

    // Función global para remover del carrito
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    // Asignar eventos a los botones del carrito
    if (cartButton && closeCartButton) {
        cartButton.addEventListener('click', openCart);
        closeCartButton.addEventListener('click', closeCart);
    }
    
    // Cargar el carrito cuando la página se carga
    loadCart();

    // --- Lógica de la página de Checkout ---

    // Función para redirigir a la página de checkout
    window.goToCheckout = () => {
        saveCart(); // Asegura que el carrito esté guardado antes de redirigir
        window.location.href = 'checkout.html';
    };

    // Cargar los datos en la página de checkout
    const loadCheckoutPage = () => {
        const checkoutItemsContainer = document.getElementById('checkout-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutTotal = document.getElementById('checkout-total');

        if (!checkoutItemsContainer) return; // Solo se ejecuta en la página de checkout

        loadCart(); // Carga los datos del carrito desde localStorage

        if (cart.length === 0) {
            checkoutItemsContainer.innerHTML = '<p class="text-gray-500">No hay productos en tu pedido.</p>';
            return;
        }

        checkoutItemsContainer.innerHTML = ''; // Limpiar

        cart.forEach(item => {
            const itemHTML = `
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-sm text-gray-500">Cantidad: ${item.qty}</p>
                        </div>
                    </div>
                    <p class="font-semibold">$${(item.price * item.qty).toFixed(2)}</p>
                </div>
            `;
            checkoutItemsContainer.innerHTML += itemHTML;
        });

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        checkoutTotal.textContent = `$${subtotal.toFixed(2)}`; // Asumiendo envío gratis
    };

    // Ejecutar la carga de la página de checkout si estamos en ella
    if (window.location.pathname.endsWith('checkout.html')) {
        loadCheckoutPage();
    }

    // Asignar el evento al botón de finalizar cotización en el panel del carrito
    const checkoutLink = document.getElementById('checkout-link');
    if (checkoutLink) {
        checkoutLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir la navegación por defecto del enlace
            goToCheckout();
        });
    }
});
