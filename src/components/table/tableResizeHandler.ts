import { $ } from '../../core/dom';

export const tableResizeHandler = (e: any, $root: any) => {
    const $resizer = $(e.target);
    const resizeType = $resizer.data.resize
    const $parent = $resizer.closest('[data-resizeable="true"]');
    const isCol = resizeType === 'col' ? true : false;
    const side = isCol ? 'width' : 'height';
    const sideResizer = isCol ? { 'height': '100vh' } : { 'width': '100vw' };
    const cords = $parent.getCoordinates();
    let elSize: number

    document.onmousemove = (e: MouseEvent) => {
        const delta = isCol ? Math.floor(e.pageX - cords.right) : Math.floor(e.pageY - cords.bottom);
        elSize = cords[side] + delta;
        $resizer.css({
            'opacity': '1',
            'z-index': '100',
            'transform': `translate(${isCol ? `${delta}px, 0px` : `0px, ${delta}px`})`,
            ...sideResizer
        });
    };
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        const sideResizer = isCol ? { 'height': '100%' } : { 'width': '100%' };
        const relElements = $root.findAll(`[data-${resizeType}="${$parent.data[resizeType]}"]`);
        relElements.forEach((element: any) => element.style[side] = `${elSize}px`);
        $resizer.css({
            'opacity': '0',
            'transform': `translate(0px, 0px)`,
            'z-index': 'initial',
            ...sideResizer
        });
    }
}