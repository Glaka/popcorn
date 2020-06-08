import { tableResizeHandler } from './tableResizeHandler';
import createTable from "./tableTemplate";
import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize } from './tableUtils';

class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root: any) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mousemove', 'mouseup'],
        });
    }
    toHTML() {
        return createTable(20);
    }

    onMousedown(e: any): () => void {
        if (shouldResize(e)) return null;
        tableResizeHandler(e, this.$root)
    }
    onMousemove(e: any) {
        // console.log(e);
    }
    onMouseup(e: any) {
        // console.log(e);
    }
}
export default Table