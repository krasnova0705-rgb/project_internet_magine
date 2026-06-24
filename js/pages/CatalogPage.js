import { BasePage } from './BasePage.js';
import { ProductCard } from '../components/ProductCard.js';
import { Currency } from '../utils/currency.js';
import { PRODUCTS, CATEGORIES, CURRENCIES } from '../data/constants.js';

export class CatalogPage extends BasePage {
    constructor() {
        super();
        this.currentCategory = 'all';
        this.currentSort = 'default';
    }

    renderFilters() {
        const container = document.getElementById('category-filters');
        if (!container) return;

        container.innerHTML = CATEGORIES.map(cat => `
            <button class="filter-btn ${cat.id === this.currentCategory ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.title}
            </button>
        `).join('');

        container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCategory = btn.dataset.cat;
                this.renderFilters();
                this.renderProducts();
            });
        });
    }

    getFinalPrice(product) {
        if (product.discount && product.discount > 0) {
            return product.price - (product.price * product.discount / 100);
        }
        return product.price;
    }

    getFilteredProducts() {
        const adminProducts = JSON.parse(localStorage.getItem('products')) || [];

        let products = this.currentCategory === 'all'
            ? [...PRODUCTS]
            : PRODUCTS.filter(p => p.category === this.currentCategory);

        products = products.map(p => {
            const adminOverride = adminProducts.find(ap => ap.id === p.id);
            return {
                ...p,
                discount: adminOverride ? adminOverride.discount : 0
            };
        });

        const newAdminProducts = adminProducts
            .filter(p => p.isAdmin)
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

        let allProducts = this.currentCategory === 'all'
            ? [...products, ...newAdminProducts]
            : [...products, ...newAdminProducts.filter(p => p.category === this.currentCategory)];

        if (this.currentSort === 'price-asc') {
            allProducts.sort((a, b) => this.getFinalPrice(a) - this.getFinalPrice(b));
        } else if (this.currentSort === 'price-desc') {
            allProducts.sort((a, b) => this.getFinalPrice(b) - this.getFinalPrice(a));
        }

        return allProducts;
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const products = this.getFilteredProducts();
        if (products.length === 0) {
            grid.innerHTML = '<p class="catalog-empty">Товары не найдены</p>';
            return;
        }

        grid.innerHTML = products.map(p => new ProductCard(p).render()).join('');
        ProductCard.bindEvents(grid);
    }

    bindSortSelect() {
        const select = document.getElementById('sort-select');
        if (!select) return;
        select.addEventListener('change', () => {
            this.currentSort = select.value;
            this.renderProducts();
        });
    }

    renderCurrencySelector() {
        const container = document.getElementById('currency-selector');
        if (!container) return;

        const current = Currency.getCurrent().symbol;
        container.innerHTML = `
            <select class="currency-select" id="currency-select">
                ${CURRENCIES.map(c => `
                    <option value="${c.symbol}" ${c.symbol === current ? 'selected' : ''}>${c.label}</option>
                `).join('')}
            </select>
        `;

        document.getElementById('currency-select').addEventListener('change', (e) => {
            Currency.set(e.target.value);
            this.renderProducts();
        });
    }

    init() {
        super.init();
        this.renderFilters();
        this.renderProducts();
        this.bindSortSelect();
        this.renderCurrencySelector();
    }
}