import { $ } from '../../core/dom';
import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { ExcelComponent } from "../../core/ExcelComponent"
import { TableActions } from '../table/Table';

export enum FormulaEvents {
  typing = 'formula:input_text',
  enter = 'formula:enter'
}
class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root: Ielement, options: ANY_TODO) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }
  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on(TableActions.cellChange, ($cell: any) => {
      this.$formula.text($cell.text())
    })
    this.$on(TableActions.cellInput, (text: string) => {
      this.$formula.text(text)
    })
    this.$subscribe((state: ANY_TODO) => {
      console.log('Formula state', state);
    })
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  // onInput(event: InputEvent) {
  onInput(event: ANY_TODO) {
    // const text = event.target.textContent.trim();
    this.$emit(FormulaEvents.typing, $(event.target).text())
  }

  onKeydown(event: ANY_TODO) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit(FormulaEvents.enter)
    }
  }

}
export default Formula;