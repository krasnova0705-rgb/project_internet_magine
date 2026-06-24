
export class Storage {
    static getCart() {
        const cart = localStorage.getItem('cart');
        return cart ?  JSON.parse(cart) : [];
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static addToCart(product, size) {
        const cart = Storage.getCart();
        const existing = cart.find(item =>
            item.id === product.id && item.size === size
        );

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                size: size,
                quantity: 1,
            });
        }

        Storage.saveCart(cart);
        return cart;
    }

    static removeFromCart(productId, size) {
        const cart = Storage.getCart().filter(item => 
            !(item.id === productId && item.size === size)
        );
        Storage.saveCart(cart);
        return cart;
    }

    static getCartCount() {
        return Storage.getCart().reduce((sum, item) =>
        sum + item.quantity, 0
        );
    }

    static getCartTotal() {
        return Storage.getCart().reduce((sum, item) =>
        sum + item.price * item.quantity, 0
        );
    }

    static clearCart() {
        localStorage.removeItem('cart');
    }
}