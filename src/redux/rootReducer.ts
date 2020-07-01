import { Actions } from './actionTypes';
import { ANY_TODO } from './../core/utils';
export const rootReducer = (state: ANY_TODO, action: ANY_TODO) => {
    switch (action.type) {
        case Actions.resizeTable:
            const { data } = action;
            return {
                ...state,
                tableState: {
                    ...state.tableState,
                    [`${data.resizeType}s`]: {
                        ...state.tableState[`${data.resizeType}s`],
                        [data.id]: data.value
                    }
                }
            }
        case Actions.changeTablecellText:
            return {
                ...state,
                tableState: {
                    ...state.tableState,
                    currentText: action.data.value,
                    dataState: {
                        ...state.tableState.dataState,
                        [action.data.id]: action.data.value
                    }
                }
            }
        default:
            return state
    }
}