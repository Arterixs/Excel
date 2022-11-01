const CODES = {
    A: 'A'.charCodeAt(),
    Z: '['.charCodeAt(),
}

function toCell() {
    return `<div class = "cell" contenteditable></div>`
}

function toColumn(col) {
    return `
    <div class = "column">${col}</div>
    `
}

function createRow(content, num = '') {
    return `
    <div class = "row">
        <div class = "row-info">${num}</div>
        <div class = "row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

    const cell = new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('')

    rows.push(createRow(cols))

    for (let i = 1; i <= rowsCount; i++) {
        rows.push(createRow(cell, i))
    }

    return rows.join('')
}
