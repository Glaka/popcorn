import { ANY_TODO } from './../core/utils';
export const rootReducer = (state: ANY_TODO, action: ANY_TODO) => {
    switch (action.type) {
        case 'TABLE_RESIZE':
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
            break;

        default:
            return state
            break;
    }
}