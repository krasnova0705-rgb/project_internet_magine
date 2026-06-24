import { FOOTER_INFO } from '../data/constants.js';

export class Footer {
    constructor(containerId = 'footer-container') {
        this.container = document.getElementById(containerId);
    }

    render() {
        return `
            <div class="footer-inner">
                <p class="footer-copyright">${FOOTER_INFO.copyright}</p>
                <p class="footer-copyright">${FOOTER_INFO.phone} &mdash; ${FOOTER_INFO.email}</p>
            </div>
        `;
    }

    init() {
        if (this.container) {
            this.container.innerHTML = this.render();
        }
    }
}