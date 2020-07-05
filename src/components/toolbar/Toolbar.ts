import { initialState } from './../../redux/initialState';
import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { ExcelComponent } from "../../core/ExcelComponent"
import { createToolbap } from './toolbat.template';
import { $ } from '../../core/dom';
import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { defaultStyles } from '../../constatnts';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root: Ielement, options: ANY_TODO) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbap(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event: any) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0];
      this.$emit('toolbar:select_style', value)
      // this.setState({ [key]: value[key] })
      // console.log(this.state);
    }
  }

  storeChanged(changes: any) {
    this.setState(changes.currentStyles)
  }


}

export default Toolbar
