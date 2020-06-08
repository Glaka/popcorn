import DomListener from "./DomListener"

export class ExcelComponent extends DomListener {
  name: any
  constructor($root: any, options: any = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
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
