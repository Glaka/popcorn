import { TableSelection } from './TableSelection';
import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize } from './tableUtils';

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
        if (shouldResize(e)) return null;
        tableResizeHandler(e, this.$root)
    }

    prepare() {
        console.log('prepare');
        this.selected = new TableSelection();
    }

    init() {
        super.init();
        console.log('init table');
        const $cellSelected = this.$root.find('[data-id="#0:0"]')
        this.selected.select($cellSelected)
    }
}
export default Table