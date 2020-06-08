class Dom {
  $el: any
  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html: string) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType: string, callback: () => void) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType: string, callback: () => void) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector: string) {
    return $(this.$el.closest(selector))
  }

  css(styles: { [key: string]: string }) {
    Object.keys(styles).forEach((styleName: any) => this.$el.style[styleName] = styles[styleName]);
  }

  changeClass(type: any) {
    return (className: any) => {
      if (Array.isArray(className)) {
        className.forEach(name => this.$el.classList[type](name))
      } else this.$el.classList[type](className);

    };
  }

  addClass(className: any) {
    this.changeClass('add')(className);
  }

  removeClass(className: any) {
    this.changeClass('remove')(className);
  }


  getCoordinates() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  find(selector: string) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector: string) {
    return this.$el.querySelectorAll(selector)
  }

  append(node: any) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
}

// event.target
export function $(selector: any) {
  return new Dom(selector)
}

type sttt = string | string[]
$.create = (tagName: string, classes: any = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
