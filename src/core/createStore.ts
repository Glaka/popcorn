import { ANY_TODO } from './utils';
export const createStore = (rootReducer: ANY_TODO, initialState = {}) => {
    let state = rootReducer({ ...initialState }, { type: '__INIT__' })
    let listeners: ANY_TODO = [];

    return {
        subscribe(fn: ANY_TODO) {
            listeners.push(fn);
            return {
                unsubscribe() {
                    listeners = listeners.filter((listener: ANY_TODO) => {
                        listener !== fn
                    })
                }
            }
        },
        dispatch(action: {}) {
            state = rootReducer(state, action)
            listeners.forEach((listener: ANY_TODO) => {
                listener(state)
            });
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
            // return state
        }
    }
}