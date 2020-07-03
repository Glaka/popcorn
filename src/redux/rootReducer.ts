import { Actions } from './actionTypes';
import { ANY_TODO } from './../core/utils';
export const rootReducer = (state: ANY_TODO, action: ANY_TODO) => {
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
        default:
            return state
    }
}