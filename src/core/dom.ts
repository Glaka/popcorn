import { ANY_TODO } from "./utils"
import { IclassName } from "./types"

class Dom {
  $el: ANY_TODO | null
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
    Object.keys(styles).forEach((styleName: string) => this.$el.style[styleName] = styles[styleName]);
  }

  changeClass(type: string) {
    return (className: IclassName) => {
      if (Array.isArray(className)) {
        className.forEach(name => this.$el.classList[type](name))
      } else this.$el.classList[type](className);
    };
  }

  addClass(className: IclassName) {
    this.changeClass('add')(className);
    return this
  }

  removeClass(className: IclassName) {
    this.changeClass('remove')(className);
    return this
  }

  text(text?: string) {
    if (typeof text === 'string' || typeof text === 'number') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  getStyles(styles: [] = []) {
    return styles.reduce((res: any, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  id(parse?: boolean) {

    if (parse) {
      const parsed: string[] = this.id().replace('#', '').split(":")
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }


  attr(name: any, value: any) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
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

  append(node: ANY_TODO) {
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

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(selector: string | HTMLElement) {
  return new Dom(selector)
}

$.create = (tagName: string, classes: string = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
