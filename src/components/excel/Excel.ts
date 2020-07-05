import { StoreSubscriber } from './../../core/StoreSubscriber';
import { Emitter } from './../../core/Emitter';
import { $ } from '../../core/dom';
import { ANY_TODO } from '../../core/utils';

type Ioptions = {
  components: object[]
  store: ANY_TODO
}
class Excel {
  $el: ANY_TODO;
  components: ANY_TODO;
  emitter: Emitter;
  store: object;
  subscriber: StoreSubscriber;

  constructor(selector: string, options: Ioptions) {
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map((Component: ANY_TODO) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // DEBUG
      if (component.name) {
        // @ts-expect-error
        window[`c${component.name}`] = component
      }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component: ANY_TODO) => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.array.forEach((component: ANY_TODO) => {
      component.destroy()
    });
  }
}

export default Excel;