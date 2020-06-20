import { range, ANY_TODO } from "../../core/utils";

export const shouldResize = (event: ANY_TODO): boolean => {
    return !event.target.dataset.resize ? false : true
}

export const shouldCellSelect = (event: ANY_TODO): boolean => {
    return event.target.dataset.type === 'cell'
}

export const getCellsMatrix = (target: ANY_TODO, current: ANY_TODO) => {
    const colsRange = range(target.col, current.col);
    const rowsRange = range(target.row, current.row);
    return colsRange.reduce((acc: ANY_TODO, col: number) => {
        rowsRange.forEach((row: number) => {
            acc.push(`#${row}:${col}`)
        });
        return acc
    }, [])
};
