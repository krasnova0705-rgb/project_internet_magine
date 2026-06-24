
export const NAVIGATION_LINKS = [
    {title: 'Главная', href: './index.html'},
    {title: 'Каталог', href: './catalog.html'},
    {title: 'О нас', href: './about.html'},
    {title: 'Контакты', href: './contacts.html'},
];

export const FOOTER_INFO = {
    copyright: 'LUMIÈRE — интернет-магазин одежды',
    email: 'info@LUMIÈRE-shop.ru',
    phone: '+7 900 000-00-00',
};


export const CATEGORIES = [
    {id: 'all', title: 'Все'},
    {id: 'tshirts', title: 'Футболки'},
    {id: 'trousers', title: 'Брюки'},
    {id: 'shirts', title: 'Рубашки'},
    {id: 'blazers', title: 'Пиджаки'},
    {id: 'polo', title: 'Поло'},
    {id: 'belts', title: 'Ремни'},
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const PRODUCTS = [
    {
        id: 1,
        title: 'Базовая белая футболка',
        category: 'tshirts',
        price: 1200,
        sizes: ['XS', 'S', 'M', 'L'],
        image: './images/tshirt1.jpg',
        description: 'Лёгкая хлопковая футболка свободного кроя',
        isNew: true,
    },

    {
        id: 2,
        title: 'Футболка оверсайз бежевая',
        category: 'tshirts',
        price: 1400,
        sizes: ['S', 'M', 'L', 'XL'],
        image: './images/tshirt2.jpg',
        description: 'Трендовая оверсайз футболка в нейтральном тоне',
        isNew: false,
    },

    {
        id: 3,
        title: 'Широкие брюки кремовые',
        category: 'trousers',
        price: 3200,
        sizes: ['XS', 'S', 'M'],
        image: './images/trousers1.jpg',
        description: 'Широкие брюки с высокой талией из лёгкой ткани',
        isNew: true,
    },

    {
        id: 4,
        title: 'Классические чёрные брюки',
        category: 'trousers',
        price: 2800,
        sizes: ['S', 'M', 'L'],
        image: './images/trousers2.jpg',
        description: 'Строгие брюки прямого кроя для офиса и прогулок',
        isNew: false,
    },

    {
        id: 5,
        title: 'Рубашка оверсайз в полоску',
        category: 'shirts',
        price: 2200,
        sizes: ['XS', 'S', 'M', 'L'],
        image: './images/shirt1.jpg',
        description: 'Удобная рубашка свободного кроя в классическую полоску',
        isNew: true,
    },

    {
        id: 6,
        title: 'Белая рубашка классика',
        category: 'shirts',
        price: 1900,
        sizes: ['S', 'M', 'L', 'XL'],
        image: './images/shirt2.jpg',
        description: 'Базовая белая рубашка — основа любого образа',
        isNew: false,
    },

    {
        id: 7,
        title: 'Пиджак бежевый оверсайз',
        category: 'blazers',
        price: 5500,
        sizes: ['XS', 'S', 'M'],
        image: './images/blazer1.jpg',
        description: 'Мягкий пиджак свободного кроя в нейтральном оттенке.',
        isNew: true,
    },

    {
        id: 8,
        title: 'Чёрный пиджак приталенный',
        category: 'blazers',
        price: 4900,
        sizes: ['S', 'M', 'L'],
        image: './images/blazer2.jpg',
        description: 'Элегантный приталенный пиджак для особых случаев.',
        isNew: false,
    },

    {
        id: 9,
        title: 'Поло коричневого цвета',
        category: 'polo',
        price: 1800,
        sizes: ['XS', 'S', 'M', 'L'],
        image: './images/polo1.jpg',
        description: 'Классическое поло из мягкого хлопка.',
        isNew: false,
    },

    {
        id: 10,
        title: 'Ремень кожаный коричневый',
        category: 'belts',
        price: 1500,
        sizes: ['S', 'M', 'L'],
        image: './images/belt1.jpg',
        description: 'Кожаный ремень с золотистой пряжкой.',
        isNew: false,
    },

];


export const CURRENCIES = [
    {label: '🇷🇺 Рубль (₽)', rate: 1, symbol: '₽'},
    {label: '🇺🇸 Доллар ($)', rate: 0.011, symbol: '$'},
    {label: '🇪🇺 Евро (€)', rate: 0.010, symbol: '€'},
];

export const REVIEWS = [
    { text: 'Качество отличное, сидит идеально!', rating: 5 },
    { text: 'Быстрая доставка, всё соответствует описанию.', rating: 5 },
    { text: 'Очень мягкая ткань, буду заказывать ещё.', rating: 4 },
    { text: 'Стильно и удобно, рекомендую!', rating: 5 },
    { text: 'Хорошее соотношение цены и качества.', rating: 4 }
];