import { ExcelComponent } from "../../core/ExcelComponent"
import { ANY_TODO } from "../../core/utils";
class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root: ANY_TODO) {
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

  onInput(event: ANY_TODO) {
    // console.log(this.$root)
    // console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    // console.log('mk')
  }
}
export default Formula;