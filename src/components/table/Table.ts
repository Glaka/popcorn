import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { $ } from '../../core/dom';
import { range } from '../../core/utils';
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize, shouldCellSelect, getCellsMatrix } from './tableUtils';

class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root: any) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown'],
        });
    }
    toHTML() {
        return createTable(20);
    }

    onMousedown(e: any | MouseEvent): () => void {

        if (shouldResize(e)) {
            tableResizeHandler(e, this.$root)
        } else if (shouldCellSelect(e)) {
            const $target = $(event.target);
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