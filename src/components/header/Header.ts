import { defaultTitle } from './../../constatnts';
import { changeTitle } from './../../redux/actions';
import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { ExcelComponent } from "../../core/ExcelComponent"
import { $ } from '../../core/dom';

class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: Ielement, options: ANY_TODO) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    const title = this.store.getState().titleState || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event: ANY_TODO) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}

export default Header
