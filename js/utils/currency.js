
import { CURRENCIES } from '../data/constants.js';

export class Currency {
    static KEY = 'selectedCurrency';

    static getCurrent() {
        const saved = localStorage.getItem(Currency.KEY);
        if (saved) {
            const found = CURRENCIES.find(c => c.symbol === saved);
            if (found) return found;
        }
        return CURRENCIES[0];
    }

    static set(symbol) {
        localStorage.setItem(Currency.KEY, symbol);
    }

    static format(priceInRubles) {
        const cur = Currency.getCurrent();
        const converted = (priceInRubles * cur.rate).toFixed(cur.rate === 1 ? 0 : 2);
        return `${converted} ${cur.symbol}`;
    }
}