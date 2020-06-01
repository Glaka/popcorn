const CODES = {
    A: 65,
    Z: 90,
};

const createCell = (text = 'text') => {
    return `<div class="cell" contenteditable>${text}</div>`;
};

const createColumn = (text) => {
    return `
    <div class="column">
    ${text}
    </div>
    `;
};
const createRow = (data, index = '') => {
    return `
    <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">${data}</div>
    </div>`;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export const createTable = (rowsCount = 10) => {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('');

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cols = new Array(colsCount)
            .fill('')
            .map(createCell)
            .map(createColumn)
            .join('');
        rows.push(createRow(cols, i + 1));
    }

    const toRender =
        Array.isArray(rows) && rows.length > 0
            ? rows.join('')
            : '<h1>no row elements</h1>';
    console.log(toRender);
    return toRender;
};

console.log(typeof createTable);
