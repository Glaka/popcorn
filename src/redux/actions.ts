import { ANY_TODO } from './../core/utils';
import { Actions } from './actionTypes';

// export interface IresizeData {
//     id: string
//     resizeType: "col" | "row"
//     value: number
// }

export const tableResize = (data: ANY_TODO) => {
    return {
        type: Actions.resizeTable,
        data
    }
}

export const changeTableCellText = (data: { value: string, id: string }) => {
    return {
        type: Actions.changeTablecellText,
        data
    }
}