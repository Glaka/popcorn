import { Ielement } from './../../core/types';
import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { $ } from '../../core/dom';
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize, shouldCellSelect, getCellsMatrix } from './tableUtils';

class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root: Ielement) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
        });
    }
    toHTML() {
        return createTable(20);
    }

    onMousedown(e: MouseEvent): () => void {

        if (shouldResize(e)) {
            tableResizeHandler(e, this.$root)
        } else if (shouldCellSelect(e)) {
            const $target = $(event.target as HTMLElement);
            if (e.shiftKey) {
                const target = $target.id(true)
                const current = this.selected.current.id(true)
                const $cells = getCellsMatrix(target, current).map((id: string) => this.$root.find(`[data-id="${id}"]`))
                this.selected.selectGroup($cells)
            } else {
                this.selected.select($target)
            }
        }
        return null
    }

    onKeydown(event: KeyboardEvent) {
        console.log(event);
        const keys = [13, 9, 37, 38, 39, 40];
        const { keyCode } = event;
        if (keys.includes(keyCode)) {
            event.preventDefault();
            console.log(event.keyCode);
            // const $next = null || this.$root.find();
            // this.selection.select($next);


        }
    }

    prepare() {
        this.selected = new TableSelection();
    }

    init() {
        super.init();
        const $cellSelected = this.$root.find('[data-id="#0:0"]')
        this.selected.select($cellSelected)
    }
}
export default Table