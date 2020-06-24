import { ANY_TODO } from "./utils"
import { IclassName } from "./types"

class Dom {
  $el: ANY_TODO | null
  constructor(selector: string | HTMLElement) {
    // // console.log("Dom -> $el", this.$el);
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
  }

  removeClass(className: IclassName) {
    this.changeClass('remove')(className);
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
    // console.log("append -> node", node)
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

// event.target
export function $(selector: string | HTMLElement) {
  // // console.log("selector", selector)
  // // console.log("selector", typeof selector)
  return new Dom(selector)
}

$.create = (tagName: string, classes: string = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
