import { BasePage } from './BasePage.js';
import { PRODUCTS } from '../data/constants.js';
import { Storage } from '../utils/storage.js';

export class ProductPage extends BasePage {
    constructor() {
        super();
        const params = new URLSearchParams(window.location.search);
        this.productId = parseInt(params.get('id'));
        
        this.product = PRODUCTS.find(p => p.id === this.productId) || null;
        
        const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
        const adminProduct = adminProducts.find(p => p.id === this.productId);
        
        if (adminProduct) {
            if (this.product) {
                this.product = {
                    ...this.product,
                    title: adminProduct.name || this.product.title,
                    price: adminProduct.price || this.product.price,
                    image: adminProduct.image || this.product.image,
                    discount: adminProduct.discount || 0,
                    description: adminProduct.description || this.product.description
                };
            } else {
                this.product = {
                    id: adminProduct.id,
                    title: adminProduct.name,
                    price: adminProduct.price,
                    image: adminProduct.image,
                    sizes: ['S', 'M', 'L', 'XL'],
                    description: adminProduct.description || 'Товар из новой коллекции',
                    isNew: adminProduct.isNew || false,
                    discount: adminProduct.discount || 0
                };
            }
        }
        
        this.selectedSize = null;
    }

    render() {
        const container = document.getElementById('product-detail');
        if (!container) return;

        if (!this.product) {
            container.innerHTML = '<p>Товар не найден.</p>';
            return;
        }

        const { title, price, image, sizes, description, isNew, discount } = this.product;

        const sizesHTML = sizes.map(size => `
            <button class="size-btn" data-size="${size}">${size}</button>
        `).join('');

        let priceHTML = '';
        if (discount && discount > 0) {
            const finalPrice = price - (price * discount / 100);
            priceHTML = `
                <span class="old-price">${price} ₽</span>
                <span class="current-price">${finalPrice.toFixed(2)} ₽</span>
                <span class="discount-badge">-${discount}%</span>
            `;
        } else {
            priceHTML = `<span class="current-price">${price} ₽</span>`;
        }

        container.innerHTML = `
            <div class="product-detail-grid">
                <div class="product-detail-image">
                    ${isNew ? '<span class="badge-new">Новинка</span>' : ''}
                    <img src="${image}" alt="${title}">
                </div>
                <div class="product-detail-info">
                    <h1>${title}</h1>
                    <p class="product-detail-price">${priceHTML}</p>
                    <p class="product-detail-desc">${description}</p>
                    <div class="product-sizes" id="detail-sizes">${sizesHTML}</div>
                    <button class="btn-primary btn-add-to-cart" id="detail-add-cart">В корзину</button>
                    <a href="./catalog.html" class="btn-secondary">← Назад в каталог</a>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const sizesContainer = document.getElementById('detail-sizes');
        if (sizesContainer) {
            sizesContainer.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    sizesContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.selectedSize = btn.dataset.size;
                });
            });
        }

        const addBtn = document.getElementById('detail-add-cart');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                if (!this.selectedSize) {
                    alert('Выберите размер!');
                    return;
                }
                Storage.addToCart(this.product, this.selectedSize);
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    const count = Storage.getCartCount();
                    cartCount.textContent = count > 0 ? count : '';
                }
                alert('Товар добавлен в корзину!');
            });
        }
    }

    init() {
        super.init();
        this.render();
    }
}