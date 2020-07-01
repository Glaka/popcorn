import { ANY_TODO } from './utils';
import DomListener from "./DomListener"
import { Ielement, rootOptions } from "./types";

export class ExcelComponent extends DomListener {
  constructor($root: Ielement, options: rootOptions = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.prepare()
    this.unsubscribers = []
    this.storeSub = null
  }

  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  $emit(event: ANY_TODO, ...args: ANY_TODO) {
    this.emitter.dispatch(event, ...args)
  }

  $on(event: ANY_TODO, fn: ANY_TODO) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub)
  }

  $dispatch(action: ANY_TODO) {
    this.store.dispatch(action)
  }

  $subscribe(fn: ANY_TODO) {
    this.storeSub = this.store.subscribe(fn)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub: ANY_TODO) => unsub());
    this.storeSub.unsubscribe();
  }
}
