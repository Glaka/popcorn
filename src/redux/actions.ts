import { ANY_TODO } from './../core/utils';

export interface IresizeData {
    id: string
    resizeType: "col" | "row"
    value: number
}

export const tableResize = (data: ANY_TODO) => {
    console.log(data);
    return {
        type: 'TABLE_RESIZE',
        data
    }
}