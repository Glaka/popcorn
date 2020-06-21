import DomListener from "./DomListener"
import { ANY_TODO } from "./utils";

export class ExcelComponent extends DomListener {
  name: ANY_TODO
  constructor($root: ANY_TODO, options: ANY_TODO = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.prepare()
  }

  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
