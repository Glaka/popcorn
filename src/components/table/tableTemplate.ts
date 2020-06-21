const CODES = {
    A: 65,
    Z: 90,
};

const createCell = (row: number) => {
    return (text = 'text', col: number) => {
        return `<div 
            class="cell"  
            data-col="${col}" 
            data-id="#${row}:${col}" 
            data-type="cell"
            contenteditable>${text}</div>`;
    }
};

const createColumn = (text: string, index: number) => {
    return `
    <div class="column" data-resizeable="true" data-col="${index}">
    ${text}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `;
};
const createRow = (data: string, index: string | number = '') => {
    return `
    <div class="row" ${index > 0 && `data-resizeable="true" data-row="${index}"`}>
        <div class="row-info">
        ${index}
        
        ${index > 0 ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
        <div class="row-data">${data}</div>
    </div>`;
};

const toChar = (_: null, index: number) => String.fromCharCode(CODES.A + index);

const createTable = (rowsCount = 10) => {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('');

    rows.push(createRow(cols));

    for (let row = 0; row < rowsCount; row++) {
        const cols = new Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('');
        rows.push(createRow(cols, row + 1));
    }

    const toRender =
        Array.isArray(rows) && rows.length > 0
            ? rows.join('')
            : '<h1>no row elements</h1>';
    return toRender;
};

export default createTable
// console.log(typeof createTable);
