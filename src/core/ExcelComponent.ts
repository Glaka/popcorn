import { ANY_TODO } from './utils';
import DomListener from "./DomListener"
import { Ielement, rootOptions } from "./types";

export class ExcelComponent extends DomListener {
  constructor($root?: Ielement, options: rootOptions = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.prepare()
    this.unsubscribers = []
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

  storeChanged(chanes: any) { }

  isWatching(key: any) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub: ANY_TODO) => unsub());
  }
}
