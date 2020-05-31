class Dom {
    constructor(selector) {
        this.$el =
            typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;
    }

    html(html) {
        typeof html === 'string'
            ? (this.$el.innerHTML = html)
            : this.$el.outerHTML.trim();
        return this;
    }

    clear() {
        this.html('');
        return this;
    }
    on(event, callback) {
        this.$el.addEventListener(event, callback);
    }
    of(event, callback) {
        this.$el.removeEventListener(event, callback);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        Element.prototype.append
            ? this.$el.append(node)
            : this.$el.appendChild(node);

        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
