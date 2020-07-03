import { ANY_TODO } from './../../core/utils';

const SIZES = {
    width: '120px',
    height: '24px'
}

type Column = {
    text: string;
    index: number;
    size: typeof SIZES
}

const CODES = {
    A: 65,
    Z: 90,
};


const getSize = (state: ANY_TODO, index: ANY_TODO) => {
    return {
        width: `${state.colState[index]}px` || SIZES.width,
        height: `${state.rowState[index]}px` || SIZES.height
    }
}

const getSizeObject = (state: ANY_TODO) => {
    return (text: string, index: number) => {
        return {
            text, index, size: getSize(state, index)
        }
    }
}

const toChar = (_: null, index: number) => String.fromCharCode(CODES.A + index);

const createColumn = ({ text, index, size }: ANY_TODO) => {
    return `
    <div 
        class="column" 
        data-resizeable="true" 
        data-col="${index}" 
        style="width: ${size.width}" 
    >
        <span>${text}</span>
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
};

const createRow = (data: string, state: any = null, index: string | number = '') => {
    const size = index > 0 && getSize(state, index);
    return `
    <div 
        class="row" 
        ${index > 0 && (
            `data-resizeable="true" data-row="${index}"
            style="height: ${size.height}"`
        )}
    >
        <div class="row-info">
            <span>${index}</span>
            ${index > 0 ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
        <div class="row-data">${data}</div>
    </div>`;
};

const createCell = (row: number, state: ANY_TODO) => {
    return (_ = '', col: number) => {
        const text = state.dataState[`#${row}:${col}`] || ''

        const size = getSize(state, col);
        return `<div 
            class="cell"  
            data-col="${col}" 
            data-id="#${row}:${col}" 
            data-type="cell"
            style="width: ${size.width}" 
            contenteditable>${text}</div>`;
    }
};

const createTable = (rowsCount = 10, state: ANY_TODO = {}) => {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(getSizeObject(state))
        .map(createColumn)
        .join('');

    rows.push(createRow(cols));

    for (let row = 0; row < rowsCount; row++) {
        const cols = new Array(colsCount)
            .fill('')
            .map(createCell(row, state))
            .join('');
        rows.push(createRow(cols, state, row + 1));
    }

    const toRender =
        Array.isArray(rows) && rows.length > 0
            ? rows.join('')
            : '<h1>no row elements</h1>';
    return toRender;
};

export default createTable