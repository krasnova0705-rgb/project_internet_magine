import { PRODUCTS } from '../data/constants.js'; 

export class AdminPage {
    
    constructor() {}

    init() {
        if (!document.getElementById('adminDashboard')) return;

        this.bindEvents();
        this.setupPriceValidation();
        this.renderAllProducts(); 
    }

    bindEvents() {
      

        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        document.getElementById('cancelEditBtn').addEventListener('click', () => {
            this.resetForm();
        });
    }

    setupPriceValidation() {
        const priceInput = document.getElementById('productPrice');
        
        priceInput.addEventListener('keydown', (e) => {
            if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                e.preventDefault(); 
            }
        });

        priceInput.addEventListener('input', (e) => {
            if (parseFloat(e.target.value) < 0) {
                e.target.value = 0;
            }
        });
    }

   

    saveProduct() {
        const editId = document.getElementById('editProductId').value;
        
        const price = parseFloat(document.getElementById('productPrice').value);
        if (isNaN(price) || price <= 0) {
            alert('Ошибка: Цена должна быть строгим положительным числом!');
            return;
        }

        const productData = {
            name: document.getElementById('productName').value,
            price: price,
            category: document.getElementById('productCategory').value,
            discount: parseInt(document.getElementById('productDiscount').value) || 0,
            image: document.getElementById('productImage').value || 'https://via.placeholder.com/150',
            description: document.getElementById('productDescription').value || '',
            isNew: document.getElementById('productIsNew').checked,
            isAdmin: true
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];

        if (editId) {
            const index = products.findIndex(p => p.id == editId);
            if (index !== -1) {
                products[index] = { ...products[index], ...productData };
            } else {
                const baseProduct = PRODUCTS.find(p => p.id == editId);
                if (baseProduct) {
                    products.push({
                        id: baseProduct.id,
                        ...productData,
                        isAdmin: false 
                    });
                }
            }
            alert('Товар успешно обновлен!');
        } else {
            productData.id = Date.now();
            products.push(productData);
            alert('Товар успешно добавлен!');
        }

        localStorage.setItem('products', JSON.stringify(products));
        this.resetForm(); 
        this.renderAllProducts();
    }

    resetForm() {
        document.getElementById('productForm').reset();
        document.getElementById('editProductId').value = ''; 
        document.getElementById('formTitle').textContent = 'Добавить новый товар';
        document.getElementById('formSubmitBtn').textContent = 'Добавить';
        document.getElementById('cancelEditBtn').classList.add('hidden');
    }

    editProduct(id) {
        const allProducts = this.getAllProductsData();
        const product = allProducts.find(p => p.id == id);

        if (!product) return;

        document.getElementById('editProductId').value = product.id;
        document.getElementById('productName').value = product.title || product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDiscount').value = product.discount || 0;
        document.getElementById('productImage').value = product.image || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productIsNew').checked = product.isNew || false;

        document.getElementById('formTitle').textContent = 'Редактирование товара';
        document.getElementById('formSubmitBtn').textContent = 'Сохранить изменения';
        document.getElementById('cancelEditBtn').classList.remove('hidden');

        document.querySelector('.product-form-container').scrollIntoView({ behavior: 'smooth' });
    }

    deleteProduct(id) {
        if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
        
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let deletedIds = JSON.parse(localStorage.getItem('deletedIds')) || [];

        const isBaseProduct = PRODUCTS.some(p => p.id == id);

        if (isBaseProduct) {
            if (!deletedIds.includes(id)) {
                deletedIds.push(id);
            }
            products = products.filter(p => p.id != id);
        } else {
            products = products.filter(p => p.id != id);
        }

        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('deletedIds', JSON.stringify(deletedIds));

        if (document.getElementById('editProductId').value == id) {
            this.resetForm();
        }

        this.renderAllProducts();
    }

    getAllProductsData() {
        const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
        const deletedIds = JSON.parse(localStorage.getItem('deletedIds')) || [];

        const baseProducts = PRODUCTS
            .filter(p => !deletedIds.includes(p.id))
            .map(p => {
                const override = adminProducts.find(ap => ap.id === p.id);
                return {
                    id: p.id,
                    title: p.title,
                    name: p.title,
                    price: override ? override.price : p.price,
                    category: p.category,
                    discount: override ? override.discount : 0,
                    image: override ? override.image : p.image,
                    description: override ? override.description : (p.description || ''),
                    isAdmin: false
                };
            });

        const customProducts = adminProducts
            .filter(p => p.isAdmin)
            .map(p => ({
                id: p.id,
                title: p.name,
                name: p.name,
                price: p.price,
                category: p.category,
                discount: p.discount || 0,
                image: p.image,
                description: p.description || '',
                isAdmin: true
            }));

        return [...baseProducts, ...customProducts];
    }

    renderAllProducts() {
        const container = document.getElementById('allProductsList');
        const allProducts = this.getAllProductsData();

        if (allProducts.length === 0) {
            container.innerHTML = '<p>Товаров пока нет</p>';
            return;
        }

        container.innerHTML = allProducts.map(p => `
            <div class="admin-product-item">
                <div>
                    <strong>${p.title}</strong> — ${p.price} ₽ 
                    ${p.discount > 0 ? `<span style="color: red; font-weight: bold;">(Скидка: ${p.discount}%)</span>` : ''}
                    <br>
                    <small>Категория: ${p.category} | ID: ${p.id}</small>
                    ${p.description ? `<br><small>Описание: ${p.description.substring(0, 60)}${p.description.length > 60 ? '...' : ''}</small>` : ''}
                </div>
                <div style="display: flex;">
                    <button class="btn-edit" onclick="window.adminPanel.editProduct(${p.id})">Редактировать</button>
                    <button class="btn-delete" onclick="window.adminPanel.deleteProduct(${p.id})">Удалить</button>
                </div>
            </div>
        `).join('');
    }
}

