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
      subscribe: ['currentText'], // переписать стор
      ...options
    })
  }
  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on(TableActions.cellChange, ($cell: any) => {
      const newText = $cell.data.value
      // BUG TO FIX 
      console.warn('BUG TO FIX - not changing formula on cell change')
      this.$formula.text(newText)
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
    this.$emit(FormulaEvents.typing, $(event.target).text())
  }

  storeChanged({ currentText }: any) {
    this.$formula.text(currentText)
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