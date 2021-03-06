import { range, ANY_TODO } from "../../core/utils";

export const shouldResize = (event: ANY_TODO): boolean => !event.target.dataset.resize ? false : true

export const shouldCellSelect = (event: ANY_TODO): boolean => event.target.dataset.type === 'cell'

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

export enum TableKeys {
    tab = "Tab",
    enter = "Enter",
    up = "ArrowUp",
    down = "ArrowDown",
    left = "ArrowLeft",
    right = "ArrowRight",
}

type idSelectors = { row: number, col: number }
export const nextSelector = (key: string, { row, col }: idSelectors) => {
    switch (key) {
        case TableKeys.down:
        case TableKeys.enter:
            row++
            break;
        case TableKeys.right:
        case TableKeys.tab:
            col++
            break;
        case TableKeys.up:
            row--
            break;
        case TableKeys.left:
            col--
            break;
        default:
            break;
    }
    return `[data-id="#${row < 0 ? 0 : row}:${col < 0 ? 0 : col}"]`
}