import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/tableTemplate';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'mousemove', 'mouseup'],
        });
    }
    toHTML() {
        return createTable(20);
    }

    onMousedown(e) {
        const $resizer = $(e.target);
        const $parent = $resizer.$el.parentNode;

        console.log($parent);
        console.log($resizer.dataset);
        console.log($resizer.getBoundingClientRect());

        document.onmousemove = (e) => {};
    }
    onMousemove(e) {
        // console.log(e);
    }
    onMouseup(e) {
        // console.log(e);
    }
}
