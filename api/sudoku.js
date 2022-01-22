class Sudoku {
    constructor() {
        this.seed = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    generateRow() {
        let c_row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 20; i++) {
            let randomInt = random(1, 9);
            let temp = c_row[0];
            c_row[0] = c_row[randomInt];
            c_row[randomInt] = temp;
        }
        return c_row;
    }

    generateLimitRow(arr) {
        let len = arr.length;
        let irow = [];
        let row_mask = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let k = 0; k < 9; k++) {
            let temp = k;
            if (row_mask[k] == len) {
                row_mask[k] = 0;
                k -= 2;
            }
            else {
                if (k == 0) {
                    irow[k] = arr[row_mask[k]][k]
                    row_mask[k] += 1;
                } else {
                    irow[k] = arr[row_mask[k]][k]
                    row_mask[k] += 1;
                    for (let j = 0; j < temp; j++) {
                        if (irow[temp] == irow[j]) {
                            k -= 1;
                        }
                    }

                }
            }
        }
        return irow;
    }

    getLimitArr(row) {
        let len = 9 - row;
        let arr = [];
        for (let p = 0; p < len; p++) {
            arr[p] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        for (let i = 0; i < 9; i++) {
            let temp = this.generateRow();
            let m = 0;
            for (let k = 0; k < 9; k++) {
                let flag = 1;
                for (let j = 0; j < row; j++) {
                    if (temp[k] == this.seed[j][i]) {
                        flag = 0;
                    }
                }
                if (flag && m < len) {
                    arr[m][i] = temp[k];
                    m = m + 1;
                }
            }
        }
        return arr;
    }

    clearRow(row) {
        for (let i = 0; i < 9; i++) {
            this.seed[row][i] = 0;
        }
    }

    clearSeed() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.seed[i][j] = 0;
            }
        }
    }

    checkConflict(row) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < row; j++) {
                if (this.seed[row][i] == this.seed[j][i]) {
                    return false;
                }
            }
        }
        if (!(row == 0 || row == 3 || row == 6)) {
            if (row == 1 || row == 4 || row == 7) {
                for (let i = 0; i < 9; i++) {
                    if (i < 3) {
                        if ((this.seed[row][i] == this.seed[row - 1][0]) || (this.seed[row][i] == this.seed[row - 1][1]) || (this.seed[row][i] == this.seed[row - 1][2])) {
                            return false;
                        }
                    } else {
                        if (i < 6) {
                            if ((this.seed[row][i] == this.seed[row - 1][3]) || (this.seed[row][i] == this.seed[row - 1][4]) || (this.seed[row][i] == this.seed[row - 1][5])) {
                                return false;
                            }
                        } else {
                            if ((this.seed[row][i] == this.seed[row - 1][6]) || (this.seed[row][i] == this.seed[row - 1][7]) || (this.seed[row][i] == this.seed[row - 1][8])) {
                                return false;
                            }
                        }
                    }
                }
            }
            if (row == 2 || row == 5 || row == 8) {
                for (let i = 0; i < 9; i++) {
                    if (i < 3) {
                        if ((this.seed[row][i] == this.seed[row - 1][0]) || (this.seed[row][i] == this.seed[row - 1][1]) || (this.seed[row][i] == this.seed[row - 1][2])) {
                            return false;
                        }
                        if ((this.seed[row][i] == this.seed[row - 2][0]) || (this.seed[row][i] == this.seed[row - 2][1]) || (this.seed[row][i] == this.seed[row - 2][2])) {
                            return false;
                        }
                    } else {
                        if (i < 6) {
                            if ((this.seed[row][i] == this.seed[row - 1][3]) || (this.seed[row][i] == this.seed[row - 1][4]) || (this.seed[row][i] == this.seed[row - 1][5])) {
                                return false;
                            }
                            if ((this.seed[row][i] == this.seed[row - 2][3]) || (this.seed[row][i] == this.seed[row - 2][4]) || (this.seed[row][i] == this.seed[row - 2][5])) {
                                return false;
                            }
                        } else {
                            if ((this.seed[row][i] == this.seed[row - 1][6]) || (this.seed[row][i] == this.seed[row - 1][7]) || (this.seed[row][i] == this.seed[row - 1][8])) {
                                return false;
                            }
                            if ((this.seed[row][i] == this.seed[row - 2][6]) || (this.seed[row][i] == this.seed[row - 2][7]) || (this.seed[row][i] == this.seed[row - 2][8])) {
                                return false;
                            }
                        }
                    }
                }
            }

        }
        return true;
    }

    generateSudoku() {
        let k = 0;
        for (let row = 0; row < 9; row++) {
            if (k < 10000) {
                if (row == 0) {
                    let temp_row = this.generateRow();
                    this.seed[row] = temp_row;
                } else {
                    if (row < 5) {
                        let temp_row = this.generateRow();
                        this.seed[row] = temp_row;
                        if (!this.checkConflict(row)) {
                            this.clearRow(row);
                            row -= 1;
                        }
                        k = k + 1;
                    } else {
                        let temp = this.getLimitArr(row);
                        if (row < 8) {
                            this.seed[row] = this.generateLimitRow(temp);
                            if (!this.checkConflict(row)) {
                                this.clearRow(row);
                                row -= 1;
                            }
                            k = k + 1;
                        } else {
                            this.seed[row] = temp[0];
                        }
                    }
                }
            } else {
                k = 0;
                row = -1;
                this.clearSeed();
            }
        }
        let temp_sudoku = this.seed;
        return temp_sudoku;
    }

    generateHole(arr, level = 0) {
        let array = this.copyArray(arr);
        let per = 0;
        if (level > 1) {
            per = 5;
        } else {
            if (level) {
                per = 3;
            } else {
                per = 2;
            }
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < per; j++) {
                array[i][random(0, 9)] = 0;
            }
        }
        return array;
    }

    copyArray(arr) {
        let array = [];
        for (let i = 0; i < arr.length; i++) {
            let [...arr1] = arr[i];
            array.push(arr1);
        }
        return array;
    }

    validateArrayItem(arr, row, col) {
        let array = this.copyArray(arr);
        let start = [];
        if (row < 3) {
            start[0] = 0;
        } else {
            if (row < 6) {
                start[0] = 3;
            } else {
                start[0] = 6;
            }
        }
        if (col < 3) {
            start[1] = 0;
        } else {
            if (col < 6) {
                start[1] = 3;
            } else {
                start[1] = 6;
            }
        }
        for (let i = 0; i < 9; i++) {
            if (i != row) {
                if (array[row][col] == array[i][col]) {
                    return false;
                }
            }
            if (i != col) {
                if (array[row][col] == array[row][i]) {
                    return false;
                }
            }
            let rowOffset = Math.floor(i / 3);
            let colOffset = i % 3;
            if ((start[0] + rowOffset) != row && (start[1] + colOffset) != col) {
                if (array[start[0] + rowOffset][start[1] + colOffset] == array[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    validateArray(arr) {
        let array = this.copyArray(arr);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!this.validateArrayItem(array, i, j)) {
                    return false;
                }
            }
        }
        return true;
    }
}

const random = (start, end) => Math.floor(Math.random() * (end - start) + start);


export default {

    getSudoku() {
        let sudoku = new Sudoku();
        let arr = sudoku.generateSudoku();

        return arr;
    },

    getRandomRow() {
        let sudoku = new Sudoku();
        return sudoku.generateRow();
    },

    getRandom(start, end) {
        return random(start, end);
    },

    getQuestion(arr, level = 0) {
        let sudoku = new Sudoku();
        return sudoku.generateHole(arr, level);
    },
    copyArr(arr) {
        let sudoku = new Sudoku();
        return sudoku.copyArray(arr);
    },
    validateArr(arr, row = -1, col = -1) {
        let sudoku = new Sudoku();
        if (row == -1 && col == -1) {
            return sudoku.validateArray(arr);
        } else {
            if (row >= 0 && row < 9 && col >= 0 && col < 9) {
                return sudoku.validateArrayItem(arr, row, col);
            } else {
                return false;
            }
        }
    },
}