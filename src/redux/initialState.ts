import { storage } from "../core/utils";

const defaultState = {
    headerState: {},
    toolbarState: {},
    formulaState: {},
    tableState: {
        cols: {},
        rows: {},
        dataState: {},
        currentText: ''
    },
}

export const initialState = storage('app_state') || defaultState;