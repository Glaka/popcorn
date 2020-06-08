import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { $ } from '../../core/dom';

import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize, shouldCellSelect } from './tableUtils';

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

    onMousedown(e: any): () => void {
        console.log(shouldResize(e));
        if (shouldResize(e)) {
            tableResizeHandler(e, this.$root)
        } else if (shouldCellSelect(e)) {
            const $target = $(event.target);
            this.selected.select($target)
            console.log(e.target.dataset);
        }
        return null
    }

    prepare() {
        // console.log('prepare');
        this.selected = new TableSelection();
    }

    init() {
        super.init();
        const $cellSelected = this.$root.find('[data-id="#0:0"]')
        this.selected.select($cellSelected)
    }
}
export default Table