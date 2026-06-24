import { Storage } from '../utils/storage.js';
import { Currency } from '../utils/currency.js';

export class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        const { id, title, price, image, sizes, isNew, discount } = this.product;

        const sizesArray = sizes || [];
        const sizesHTML = sizesArray.map(size =>
            `<button class="size-btn" data-size="${size}">${size}</button>`
        ).join('');

        let priceHTML = '';
        if (discount && discount > 0) {
            const finalPrice = price - (price * discount / 100);
            priceHTML = `
                <span class="old-price">${Currency.format(price)}</span>
                <span class="current-price">${Currency.format(finalPrice)}</span>
                <span class="discount-badge">-${discount}%</span>
            `;
        } else {
            priceHTML = `<span class="current-price">${Currency.format(price)}</span>`;
        }

        return `
            <div class="product-card" data-id="${id}">
                ${isNew ? '<span class="badge-new">Новинка</span>' : ''}
                <a href="./product.html?id=${id}">
                    <div class="product-image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="product-info">
                        <h3>${title}</h3>
                        <p class="product-price" data-price-rub="${price}">
                            ${priceHTML}
                        </p>
                    </div>
                </a>
                <div class="product-sizes">
                    ${sizesHTML}
                </div>
                <button class="btn-add-cart" data-id="${id}">В корзину</button>
            </div>
        `;
    }

    static bindEvents(container) {
        container.querySelectorAll('.product-card').forEach(card => {
            const sizes = card.querySelectorAll('.size-btn');
            let selectedSize = null;

            sizes.forEach(btn => {
                btn.addEventListener('click', () => {
                    sizes.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedSize = btn.dataset.size;
                });
            });

            card.querySelector('.btn-add-cart').addEventListener('click', () => {
                if (!selectedSize) {
                    alert('Выберите размер!');
                    return;
                }
                const id = parseInt(card.dataset.id);
                Storage.addToCart(
                    {
                        id,
                        title: card.querySelector('h3').textContent,
                        price: parseInt(card.querySelector('.product-price').dataset.priceRub),
                        image: card.querySelector('img').src
                    },
                    selectedSize
                );
                const cartCount = document.getElementById('cart-count');
                if (cartCount) cartCount.textContent = Storage.getCartCount();
                alert('Товар добавлен в корзину!');
            });
        });
    }
}