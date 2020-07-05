import { ANY_TODO } from './../core/utils';
import { defaultStyles, defaultTitle } from './../constatnts';
import { storage } from "../core/utils";

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    titleState: defaultTitle,
    currentStyles: defaultStyles
}

const normalizeState = (state: ANY_TODO) => {
    return state
}

export const initialState = normalizeState(storage('app_state')) || defaultState;