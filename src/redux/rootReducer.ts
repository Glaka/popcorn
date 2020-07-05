import { Actions } from './actionTypes';
import { ANY_TODO, tiInineStyles } from './../core/utils';
export const rootReducer = (state: ANY_TODO, action: ANY_TODO) => {
    let field: string
    let val: ANY_TODO
    switch (action.type) {
        case Actions.resizeTable:
            const { data } = action;
            return {
                ...state,
                [`${data.resizeType}State`]: {
                    ...state[`${data.resizeType}State`],
                    [data.id]: data.value
                }
            }
        case Actions.changeTablecellText:
            return {
                ...state,
                currentText: action.data.value,
                dataState: {
                    ...state.dataState,
                    [action.data.id]: action.data.value
                },
            }
        case Actions.currentCellStyle:
            return {
                ...state,
                currentStyles: action.data
            }
        case Actions.applyStyle:
            field = 'stylesState';
            val = state[field] || {}
            action.data.ids.forEach((id: string | number) => {
                val[id] = { ...val[id], ...action.data.value }
                // val[id] = tiInineStyles(action.data.value)
            });
            return {
                ...state,
                [field]: val,
                currentStyles: { ...state.currentStyles, ...action.data.value }
            }
        case Actions.changeTitle:
            return {
                ...state,
                titleState: action.data
            }
        default:
            return state
    }
}