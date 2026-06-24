import { NAVIGATION_LINKS } from '../data/constants.js';

export class Header {
    constructor(containerId = 'header-container') {
        this.container = document.getElementById(containerId);
        const pathParts = window.location.pathname.split('/');
        this.currentPage = pathParts.pop() || 'index.html';
        if (!this.currentPage.endsWith('.html')) {
            this.currentPage = 'index.html';
        }
    }

    render() {
        const navItemsHTML = NAVIGATION_LINKS.map(({href, title}) => {
            const fileName = href.replace('./', '');
            const isActive = this.currentPage === fileName ? 'class="active"' : '';
            return `<li><a href="${href}" ${isActive}>${title}</a></li>`;
        }).join('');

        return `
            <div class="header-inner">
                <a href="./index.html" class="logo">LUMIÈRE</a>
                <nav class="main-nav">
                    <input type="checkbox" id="menu-toggle">
                    <label for="menu-toggle" class="burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <ul class="menu">${navItemsHTML}</ul>
                </nav>
                <!-- ✅ ЗАМЕНИЛИ кнопку на ссылку -->
                <a href="./admin.html" class="admin-link">Админ</a>
                <a href="./cart.html" class="cart-icon">
                    🛒 <span class="cart-badge" id="cart-count">0</span>
                </a>
            </div>
        `;
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
        }
    }
}