import { capitalize } from './utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`);
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMlisteners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented`);
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        });
    }
    removeDOMlisteners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method].bind(this));
        });
    }
}

const getMethodName = (eventName) => `on${capitalize(eventName)}`;
