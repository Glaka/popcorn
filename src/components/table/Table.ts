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
        const $resizer = $(e.target);
        const $parent = $resizer.closest('[data-resizeable="true"]');
        const resizeType = $resizer.data.resize
        const relElements = this.$root.findAll(`[data-${resizeType}="${$parent.data[resizeType]}"]`);
        const isCol = resizeType === 'col' ? true : false;
        const side = isCol ? 'width' : 'height';
        const cords = $parent.getCoordinates();

        document.onmousemove = (e: MouseEvent) => {
            const delta = isCol ? Math.floor(e.pageX - cords.right) : Math.floor(e.pageY - cords.bottom);
            const elSize = cords[side] + delta;
            $parent.$el.style[side] = `${elSize}px`;
            relElements.forEach((element: HTMLElement) => {
                element.style[side] = `${elSize}px`;
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