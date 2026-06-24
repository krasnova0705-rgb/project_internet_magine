
import { BasePage } from './BasePage.js';
import { Cart } from '../components/Cart.js';

export class CartPage extends BasePage {
    constructor() {
        super();
        this.cart = new Cart('cart-container');
    }

    init() {
        super.init();
        this.cart.init();
    }
}