import createTable from "./tableTemplate";
import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from '../../core/dom';

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

    onMousedown(e: any) {
        console.log('s');
        const $resizer = $(e.target);
        console.log($resizer.data)
        console.log($resizer.data.resize)
        const $parent = $resizer.closest('[data-resizeable="true"]');
        const relElements = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

        const cords = $parent.getCoordinates();

        document.onmousemove = (e) => {
            const delta = Math.floor(e.pageX - cords.right)
            const elWidth = cords.width + delta;
            console.log(this.$root);
            $parent.$el.style.width = `${elWidth}px`;
            relElements.forEach((element: HTMLElement) => {
                element.style.width = `${elWidth}px`;
            });
        };
        document.onmouseup = () => {
            document.onmousemove = null
        }
    }
    onMousemove(e: any) {
        // console.log(e);
    }
    onMouseup(e: any) {
        // console.log(e);
    }
}
export default Table