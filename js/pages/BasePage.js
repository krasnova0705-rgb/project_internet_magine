import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Storage } from '../utils/storage.js';

export class BasePage {
    constructor() {
        this.header = new Header('header-container');
        this.footer = new Footer('footer-container');
    }

    init() {
        this.header.init();
        this.footer.init();

        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = Storage.getCartCount();
            cartCount.textContent = count > 0 ? count : '0';
        }
        
    
    }
}