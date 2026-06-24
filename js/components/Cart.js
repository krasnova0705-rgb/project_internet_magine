
import { Storage } from '../utils/storage.js';
import { Currency } from '../utils/currency.js';

export class Cart {
    constructor(containerId = 'cart-container') {
        this.container = document.getElementById(containerId);
    }

    render() {
        const cart = Storage.getCart();

        if (cart.length === 0) {
            return `
                <div class="cart-empty">
                    <p>Ваша корзина пуста</p>
                    <a href="./catalog.html" class="btn-primary">Перейти в каталог</a>
                </div>
            `;
        }

        const itemsHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p class="cart-item-size">Размер: ${item.size}</p>
                    <p class="cart-item-price">${Currency.format(item.price)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn qty-minus" data-id="${item.id}" data-size="${item.size}">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn qty-plus" data-id="${item.id}" data-size="${item.size}">+</button>
                    <button class="btn-remove" data-id="${item.id}" data-size="${item.size}">✕</button>
                </div>
            </div>
        `).join('');

        return `
            <div class="cart-items">${itemsHTML}</div>
            <div class="cart-summary">
                <p class="cart-total">Итого: <strong>${Currency.format(Storage.getCartTotal())}</strong></p>
                <button class="btn-primary btn-order" id="btn-checkout">Оформить заказ</button>
                <button class="btn-secondary btn-clear" id="btn-clear-cart">Очистить корзину</button>
            </div>
        `;
    }

    bindEvents() {
        if (!this.container) return;

        this.container.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const { id, size } = btn.dataset;
                const cart = Storage.getCart();
                const item = cart.find(i => i.id === parseInt(id) && i.size === size);
                if (item) {
                    Storage.updateQuantity(parseInt(id), size, item.quantity - 1);
                    this.update();
                }
            });
        });

        this.container.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const { id, size } = btn.dataset;
                const cart = Storage.getCart();
                const item = cart.find(i => i.id === parseInt(id) && i.size === size);
                if (item) {
                    Storage.updateQuantity(parseInt(id), size, item.quantity + 1);
                    this.update();
                }
            });
        });

        this.container.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                Storage.removeFromCart(parseInt(btn.dataset.id), btn.dataset.size);
                this.update();
            });
        });

        const clearBtn = document.getElementById('btn-clear-cart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                Storage.clearCart();
                this.update();
            });
        }

        const checkoutBtn = document.getElementById('btn-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
                Storage.clearCart();
                this.update();
            });
        }
    }

    update() {
        if (this.container) {
            this.container.innerHTML = this.render();
            this.bindEvents();
            const cartCount = document.getElementById('cart-count');
            const count = Storage.getCartCount();
            if (cartCount) cartCount.textContent = count > 0 ? count : '';
        }
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
            this.bindEvents();
        }
    }
}