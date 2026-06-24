import { HomePage } from './pages/HomePage.js';
import { CatalogPage } from './pages/CatalogPage.js';
import { ProductPage } from './pages/ProductPage.js';
import { CartPage } from './pages/CartPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ContactsPage } from './pages/ContactsPage.js';
import { AdminPage } from './pages/AdminPage.js'; 

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            new HomePage().init();
            break;
        case 'catalog.html':
            new CatalogPage().init();
            break;
        case 'product.html':
            new ProductPage().init();
            break;
        case 'cart.html':
            new CartPage().init();
            break;
        case 'about.html':
            new AboutPage().init();
            break;
        case 'contacts.html':
            new ContactsPage().init();
            break;
            
       
        case 'admin.html': 
            const adminInstance = new AdminPage();
          
            window.adminPanel = adminInstance; 
            adminInstance.init();
            break;
            
        default:
            break;
    }
});