import DomListener from "./DomListener"
import { Ielement, rootOptions } from "./types";

export class ExcelComponent extends DomListener {
  constructor($root: Ielement, options: rootOptions = {}) {
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
