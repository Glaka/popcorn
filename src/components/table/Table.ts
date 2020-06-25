import { ANY_TODO } from './../../core/utils';
import { Ielement } from './../../core/types';
import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { $ } from '../../core/dom';
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize, shouldCellSelect, getCellsMatrix, nextSelector, Keys } from './tableUtils';
class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root: Ielement, options: ANY_TODO
    ) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
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
        if (Object.keys(Keys).filter(enumKey => enumKey === key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selected.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selected.select($next);
        }
    }

    prepare() {
        this.selected = new TableSelection();
    }

    init() {
        super.init();
        const $cellSelected = this.$root.find('[data-id="#0:0"]')
        this.selected.select($cellSelected)
        this.emitter.subscribe('formula:input_text', (text: string) => {
            this.selected.current.text(text);
        })
    }
}
export default Table