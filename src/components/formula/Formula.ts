import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { ExcelComponent } from "../../core/ExcelComponent"
class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root: Ielement, options: ANY_TODO) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  // onInput(event: InputEvent) {
  onInput(event: ANY_TODO) {
    const text = event.target.textContent.trim();
    this.emitter.dispatch('formula:input_text', text)
  }

}
export default Formula;