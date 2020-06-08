import { ExcelComponent } from "../../core/ExcelComponent"
class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root: any) {
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

  onInput(event: any) {
    // console.log(this.$root)
    // console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    // console.log('mk')
  }
}
export default Formula;