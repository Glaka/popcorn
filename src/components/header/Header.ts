import { ExcelComponent } from "../../core/ExcelComponent"
import { ANY_TODO } from "../../core/utils";

class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root: ANY_TODO) {
    super($root, {
      name: 'Header',
      // listeners: ['mousedown', 'mousemove', 'mouseup'],
    });
  }

  toHTML() {
    return `
      <input type="text" class="input" value="Новая таблица" />

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
}

export default Header
