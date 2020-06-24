import { Ielement } from './../../core/types';
import { ExcelComponent } from "../../core/ExcelComponent"
class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root: Ielement) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event: InputEvent) {
  }

  onClick() {
  }
}
export default Formula;