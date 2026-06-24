
export class ContactForm {
    constructor(containerId = 'contact-form-container') {
        this.containerId = containerId;
        this.container = null;
        this.form = null;
        this.nameInput = null;
        this.phoneInput = null;
        this.emailInput = null;
        this.today = new Date().toISOString().split('T')[0];
    }

    render() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) return;

        this.container.innerHTML = `
            <h2>Напишите нам</h2>
            <form id="contactForm" novalidate>
                <div class="form-group">
                    <label for="fullname">ФИО</label>
                    <input type="text" id="fullname" placeholder="Иванова Мария Ивановна">
                </div>
                <div class="form-group">
                    <label for="phone">Телефон</label>
                    <input type="tel" id="phone" placeholder="+79139885678">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" placeholder="example@mail.ru">
                </div>
                <div class="form-group">
                    <label for="contactDate">Дата для связи</label>
                    <input type="date" id="contactDate" min="${this.today}">
                </div>
                <div class="form-group">
                    <label for="message">Сообщение</label>
                    <textarea id="message" rows="5" placeholder="Ваше сообщение..." style="resize: none;"></textarea>
                </div>
                <button type="submit" class="btn-primary">Отправить</button>
            </form>
            <div class="fullname-output" id="fullname-output" style="display:none">
                <h3>Введённые данные:</h3>
                <p>Фамилия: <span id="outLast">-</span></p>
                <p>Имя: <span id="outFirst">-</span></p>
                <p>Отчество: <span id="outMiddle">-</span></p>
            </div>
        `;

        this.cacheElements();
        this.initValidation();
    }

    cacheElements() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('fullname');
        this.phoneInput = document.getElementById('phone');
        this.emailInput = document.getElementById('email');
        this.dateInput = document.getElementById('contactDate');
    }

    initValidation() {
        this.nameInput.addEventListener('input', () => {
            let val = this.nameInput.value.replace(/[^\p{L}\s-]/gu, '');
            const words = val.trimStart().split(/\s+/);
            if (words.length > 3) {
                val = words.slice(0, 3).join(' ');
            } else if (words.length === 3) {
                val = words.join(' ');
            }
            this.nameInput.value = val;
        });

        this.phoneInput.addEventListener('input', () => {
            let val = this.phoneInput.value.replace(/[^\d+]/g, '');
            if (val.startsWith('+')) {
                val = '+' + val.slice(1).replace(/\D/g, '');
            }
            if (val.length > 0 && !val.startsWith('+7') && !val.startsWith('+8')) {
                val = '+7' + val.replace(/^\+?\d*/, '').replace(/\D/g, '');
            }
            if (val.length > 12) {
                val = val.slice(0, 12);
            }
            this.phoneInput.value = val;
        });

        this.emailInput.addEventListener('input', () => {
            this.emailInput.value = this.emailInput.value.replace(/\s/g, '');
        });

        this.dateInput.addEventListener('blur', () => {
            if (!this.dateInput.value) return;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selected = new Date(this.dateInput.value);
            if (selected < today) {
                this.dateInput.classList.add('error');
                alert('Дата не может быть раньше сегодняшней!');
            } else {
                this.dateInput.classList.remove('error');
            }
        });

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
    let ok = true;


    const words = this.nameInput.value.trim().split(/\s+/);
    if (words.length !== 3 || !words.every(w => /^[\p{L}-]+$/u.test(w))) {
        this.nameInput.classList.add('error');
        ok = false;
    } else {
        this.nameInput.classList.remove('error');
        document.getElementById('outLast').textContent = words[0];
        document.getElementById('outFirst').textContent = words[1];
        document.getElementById('outMiddle').textContent = words[2];
        document.getElementById('fullname-output').style.display = 'block';
    }

    if (!/^\+7[3489]\d{9}$/.test(this.phoneInput.value)) {
        this.phoneInput.classList.add('error');
        ok = false;
    } else {
        this.phoneInput.classList.remove('error');
    }


    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/.test(this.emailInput.value)) {
        this.emailInput.classList.add('error');
        ok = false;
    } else {
        this.emailInput.classList.remove('error');
    }

    if (!this.dateInput.value) {
        this.dateInput.classList.add('error');
        ok = false;
    } else {
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(this.dateInput.value);
        if (selected < today) {
            this.dateInput.classList.add('error');
            ok = false;
        } else {
            this.dateInput.classList.remove('error');
        }
    }

    if (ok) {
        alert('Сообщение отправлено. Спасибо!');
        this.form.reset();
        document.getElementById('fullname-output').style.display = 'none';
    } else {
        alert('Пожалуйста, заполните все обязательные поля правильно.');
    }
    }
}
