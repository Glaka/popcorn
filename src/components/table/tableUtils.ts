import { range } from "../../core/utils";

export const shouldResize = (event: any): boolean => {
    return !event.target.dataset.resize ? false : true
}

export const shouldCellSelect = (event: any): boolean => {
    return event.target.dataset.type === 'cell'
}

export const getCellsMatrix = (target: any, current: any) => {
    const colsRange = range(target.col, current.col);
    const rowsRange = range(target.row, current.row);
    return colsRange.reduce((acc: any, col: number) => {
        rowsRange.forEach((row: number) => {
            acc.push(`#${row}:${col}`)
        });
        return acc
    }, [])
};
