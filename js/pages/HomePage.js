import { BasePage } from './BasePage.js';
import { PRODUCTS, REVIEWS } from '../data/constants.js';
import { ProductCard } from '../components/ProductCard.js';
import { fetchReviews } from '../utils/api.js';

export class HomePage extends BasePage {
    constructor() {
        super();
    }

    renderNewArrivals() {
        const container = document.getElementById('new-arrivals');
        if (!container) return;

        const adminProducts = JSON.parse(localStorage.getItem('products')) || [];

        const staticProducts = PRODUCTS.filter(p => p.isNew).map(p => {
            const adminOverride = adminProducts.find(ap => ap.id === p.id);
            return {
                ...p,
                discount: adminOverride ? adminOverride.discount : 0
            };
        });

        const newAdminProducts = adminProducts
            .filter(p => p.isAdmin && p.isNew)
            .map(p => ({
                id: p.id,
                title: p.name,
                price: p.price,
                image: p.image,
                sizes: ['S', 'M', 'L', 'XL'],
                isNew: p.isNew || false,
                discount: p.discount || 0,
                category: p.category
            }));

        const allProducts = [...staticProducts, ...newAdminProducts];

        if (allProducts.length === 0) {
            container.innerHTML = '<p>Новинки скоро появятся!</p>';
            return;
        }

        container.innerHTML = allProducts.map(p => new ProductCard(p).render()).join('');
        ProductCard.bindEvents(container);
    }

    renderReviewsSkeleton() {
        const container = document.getElementById('reviews-container');
        if (!container) return;
        container.innerHTML = Array(3).fill(0).map(() => `
            <div class="review-card skeleton">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        `).join('');
    }

    async renderReviews() {
        const container = document.getElementById('reviews-container');
        const errorEl = document.getElementById('reviews-error');
        if (!container) return;

        this.renderReviewsSkeleton();

        try {
            const users = await fetchReviews();
            container.innerHTML = users.map((user, i) => {
                const review = REVIEWS[i] || { text: 'Отличный магазин!' };
                return `
                    <div class="review-card">
                        <img src="${user.picture.medium}" alt="${user.name.first}" class="review-avatar">
                        <div class="review-body">
                            <strong>${user.name.first} ${user.name.last}</strong>
                            <p>${review.text}</p>
                        </div>
                    </div>
                `;
            }).join('');

            if (errorEl) errorEl.style.display = 'none';
        } catch (err) {
            container.innerHTML = '';
            if (errorEl) {
                errorEl.textContent = 'Не удалось загрузить отзывы. Попробуйте позже.';
                errorEl.style.display = 'block';
            }
        }
    }

    init() {
        super.init();
        this.renderNewArrivals();
        this.renderReviews();
    }
}