/**
 * 编写一个程序，通过填充空格来解决数独问题
 * 数独的解法需 遵循如下规则：
 *  1、数字 1-9 在每一行只能出现一次。
 *  2、数字 1-9 在每一列只能出现一次。
 *  3、数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 * 数独部分空格内已填入了数字，空白格用 '.' 表示。
 * 
 * 输入：board = [
 *  ["5","3",".",".","7",".",".",".","."],
 *  ["6",".",".","1","9","5",".",".","."],
 *  [".","9","8",".",".",".",".","6","."],
 *  ["8",".",".",".","6",".",".",".","3"],
 *  ["4",".",".","8",".","3",".",".","1"],
 *  ["7",".",".",".","2",".",".",".","6"],
 *  [".","6",".",".",".",".","2","8","."],
 *  [".",".",".","4","1","9",".",".","5"],
 *  [".",".",".",".","8",".",".","7","9"]
 * ]
 * 
 * 输出：[
 *  ["5","3","4","6","7","8","9","1","2"],
 *  ["6","7","2","1","9","5","3","4","8"],
 *  ["1","9","8","3","4","2","5","6","7"],
 *  ["8","5","9","7","6","1","4","2","3"],
 *  ["4","2","6","8","5","3","7","9","1"],
 *  ["7","1","3","9","2","4","8","5","6"],
 *  ["9","6","1","5","3","7","2","8","4"],
 *  ["2","8","7","4","1","9","6","3","5"],
 *  ["3","4","5","2","8","6","1","7","9"]
 * ]
 * 
 */

 'use strict'
 
 function solution (board) {
     const n = board.length;
     // 记录每行可填数字，索引横向递增
     const rowMap = Array(n).fill().map(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);
     // 记录每行可填数字，索引竖向递增
     const colMap = Array(n).fill().map(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);
     // 记录每3*3可填数字，索引先横后竖递增
     const rectMap = Array(n).fill().map(() => [1, 2, 3, 4, 5, 6, 7, 8, 9]);

     for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const point = board[i][j];
            if (point !== '.') {
                const num = Number(point);
                // 横竖坐标与索引的关系
                const m = (~~(i / 3) * 3) + ~~(j / 3);
                rowMap[i] = rowMap[i].filter(v => v !== num);
                colMap[j] = colMap[j].filter(v => v !== num);
                rectMap[m] = rectMap[m].filter(v => v !== num);
            }
        }
     }
     console.log(rowMap);
     console.log(colMap);
     console.log(rectMap);
 }
 
 
 (function SudokuSolver () {
     console.log(solution(
         [
             ["5","3",".",".","7",".",".",".","."],
             ["6",".",".","1","9","5",".",".","."],
             [".","9","8",".",".",".",".","6","."],
             ["8",".",".",".","6",".",".",".","3"],
             ["4",".",".","8",".","3",".",".","1"],
             ["7",".",".",".","2",".",".",".","6"],
             [".","6",".",".",".",".","2","8","."],
             [".",".",".","4","1","9",".",".","5"],
             [".",".",".",".","8",".",".","7","9"]
        ]
    ))
 })()