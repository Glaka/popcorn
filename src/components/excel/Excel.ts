import { Emitter } from './../../core/Emitter';
import { $ } from '../../core/dom';
import { ANY_TODO } from '../../core/utils';

type Ioptions = {
  components?: object[]
}
class Excel {
  $el: ANY_TODO;
  components: ANY_TODO;
  emitter: Emitter;

  constructor(selector: string, options: Ioptions) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter
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
    this.components.forEach((component: ANY_TODO) => component.init())
  }
}

export default Excel;
