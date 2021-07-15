const board = document.getElementById("board");
const click = document.getElementById("click");
const reset = document.getElementById("reset");
const result = document.getElementById("result");
const gridSize = board.rows.length;
let element = board.children[0];
let flag = true;
let sudoku = [];

click.addEventListener("click", () => {
    for (let i = 0; i < gridSize; i++) {
        let tr = element.children[i];
        let sudokuRow = [];
        for (let j = 0; j < gridSize && flag; j++) {
            let val = tr.children[j].children[0].value.toString();
            if ((val.length == 1 && val.charCodeAt(0) >= 48 && val.charCodeAt(0) <= 57) || val === "") {
                if (val !== "") {
                    sudokuRow.push(Number(val));
                } else {
                    sudokuRow.push(0);
                }
            } else {
                flag = false;
                break;
            }
        }
        sudoku.push(sudokuRow);
    }

    if (solvesudoku(sudoku) && flag) {
        printSudoku();
        result.innerHTML = "Successfully Solved";
    } else {
        result.innerHTML = "Invalid input (^__^)";
        clrscr();
        flag = true;
        sudoku.splice(0, sudoku.length);
    }

    click.disabled = "true";
});

function isNumberInRow(sudoku, number, row) {
    for (let i = 0; i < gridSize; i++) {
        if (sudoku[row][i] == number) {
            return true;
        }
    }
    return false;
}

function isNumberInColumn(sudoku, number, column) {
    for (let i = 0; i < gridSize; i++) {
        if (sudoku[i][column] == number) {
            return true;
        }
    }
    return false;
}

function isNumberInSubgrid(sudoku, number, row, column) {
    let rowIndex = row - row % 3;
    let columnIndex = column - column % 3;

    for (let i = rowIndex; i < rowIndex + 3; i++) {
        for (let j = columnIndex; j < columnIndex + 3; j++) {
            if (sudoku[i][j] == number) {
                return true;
            }
        }
    }
    return false;
}

function issudokuSafe(sudoku, number, row, column) {
    return !isNumberInRow(sudoku, number, row) && !isNumberInColumn(sudoku, number, column) && !isNumberInSubgrid(sudoku, number, row, column);
}

function solvesudoku(sudoku) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (sudoku[i][j] == 0) {
                for (let num = 1; num <= gridSize; num++) {
                    if (issudokuSafe(sudoku, num, i, j)) {
                        sudoku[i][j] = num;

                        if (solvesudoku(sudoku)) {
                            return true;
                        } else {
                            sudoku[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function printSudoku() {
    for (let i = 0; i < gridSize; i++) {
        let tr = element.children[i];
        for (let j = 0; j < gridSize; j++) {
            tr.children[j].children[0].value = sudoku[i][j];
        }
    }
}

function clrscr() {
    for (let i = 0; i < gridSize; i++) {
        let tr = element.children[i];
        for (let j = 0; j < gridSize; j++) {
            tr.children[j].children[0].value = "";
        }
    }
}

reset.addEventListener("click", () => {
    clrscr();
    click.disabled = false;
    result.innerHTML = "";
    sudoku.splice(0, sudoku.length);
});