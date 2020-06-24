import { $ } from '../../core/dom';
import { ANY_TODO } from '../../core/utils';

type Ioptions = {
  components?: object[]
}
class Excel {
  $el: ANY_TODO;
  components: ANY_TODO;

  constructor(selector: string, options: Ioptions) {

    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map((Component: ANY_TODO) => {
      const $el = $.create('div', Component.className)
      // console.log("Excel -> getRoot ->  $el", $el)
      const component = new Component($el)
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
