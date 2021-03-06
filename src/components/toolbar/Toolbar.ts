import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { ExcelComponent } from "../../core/ExcelComponent"

export class Toolbar extends ExcelComponent {
  // console.log("Toolbar", Toolbar)
  static className = 'excel__toolbar'

  constructor($root: Ielement, options: ANY_TODO) {
    super($root, {
      name: 'Toolbar',
      ...options
    })
  }

  toHTML() {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>

      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>

      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>

      <div class="button">
        <i class="material-icons">format_underlined</i>
      </div>
    `
  }


}

export default Toolbar
