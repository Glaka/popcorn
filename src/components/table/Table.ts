import { defaultStyles } from './../../constatnts';
import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { $ } from '../../core/dom';
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize, shouldCellSelect, getCellsMatrix, nextSelector, TableKeys } from './tableUtils';
import { FormulaEvents } from '../formula/Formula';
import { tableResize, changeTableCellText, getCurrentCellStyles, applyStyles } from '../../redux/actions';
import { parse } from '../../core/parse';

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
            subscribe: ['dataState', 'currentText'],
            ...options
        });
    }

    toHTML() {
        return createTable(20, this.store.getState());
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="#0:0"]'))
        this.$on(FormulaEvents.typing, (value: string) => {
            this.selected.current.attr('data-value', value)
            this.selected.current.text(parse(value));
            this.updateTextInStore(value)

        })
        this.$on(FormulaEvents.enter, () => {
            this.selected.current.focus()
        })
        this.$on('toolbar:select_style', (value: any) => {
            this.selected.applyStyle(value)
            this.$dispatch(applyStyles({
                value,
                ids: this.selected.selectedIds
            }))
        })
    }

    async resizeTable(e: MouseEvent) {
        try {
            const data = await tableResizeHandler(e, this.$root)
            this.$dispatch(tableResize(data))
        } catch (e) {
            console.warn('error message', e)
        }
    }

    onMousedown(e: MouseEvent): () => void {
        if (shouldResize(e)) {
            this.resizeTable(e);
        } else if (shouldCellSelect(e)) {
            const $target = $(event.target as HTMLElement);
            if (e.shiftKey) {
                const target = $target.id(true)
                const current = this.selected.current.id(true)
                const $cells = getCellsMatrix(target, current).map((id: string) => this.$root.find(`[data-id="${id}"]`))
                this.selected.selectGroup($cells)
            } else { // single select
                this.selected.select($target)
                this.selectCell($target)
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

    updateTextInStore(value: string) {
        this.$dispatch(changeTableCellText({
            id: this.selected.current.id(),
            value
        }))
    }

    onInput(event: ANY_TODO) {
        this.updateTextInStore($(event.target).text())
    }

    prepare() {
        this.selected = new TableSelection();
    }

    selectCell($cell: ANY_TODO) {
        this.selected.select($cell);
        this.$emit(TableActions.cellChange, $cell)
        this.$dispatch(getCurrentCellStyles($cell.getStyles(Object.keys(defaultStyles))))
    }
}
export default Table