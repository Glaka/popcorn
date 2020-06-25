import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { $ } from '../../core/dom';
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize, shouldCellSelect, getCellsMatrix, nextSelector, TableKeys } from './tableUtils';
import { FormulaEvents } from '../formula/Formula';

export enum TableActions {
    cellChange = 'table:cell_change',
    cellInput = 'table:cell_input',
}
class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root: Ielement, options: ANY_TODO
    ) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
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
            } else { // single select
                this.selected.select($target)
            }
        }
        return null
    }

    onKeydown(event: KeyboardEvent) {
        const { key } = event;
        // @ts-expect-error
        if (Object.keys(TableKeys).filter((enumKey: any) => TableKeys[enumKey] === key).length > 0 && !event.shiftKey) {
            event.preventDefault();
            const id = this.selected.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next)
        }
    }

    onInput(event: ANY_TODO) {
        this.$dispatch(TableActions.cellInput, $(event.target).text())
    }

    prepare() {
        this.selected = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="#0:0"]'))
        this.$on(FormulaEvents.typing, (text: string) => {
            this.selected.current.text(text);
        })
        this.$on(FormulaEvents.enter, () => {
            this.selected.current.focus()
        })
    }

    selectCell($cell: ANY_TODO) {
        this.selected.select($cell);
        this.$dispatch(TableActions.cellChange, $cell)
    }
}
export default Table