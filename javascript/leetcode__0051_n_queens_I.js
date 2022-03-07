/**
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案
 * 
 * 输入：n = 4
 * 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * 
 * 输入：n = 1
 * 输出：[["Q"]]
 */

 'use strict'
 
 function solution (number) {
     const result = [];
     const queensList = Array(number).fill(Array(number).fill('.').join(''));

     const canQueen = (posX, posY) => {
         const queensMatrix = queensList
            .map((queen, index) => queen.includes('Q') ? [index, queen.indexOf('Q')] : [])
            .filter(queen => queen.length);
        if (queensMatrix.some(matrix => {
            // 横、竖、斜
            return matrix[0] === posX
                || matrix[1] === posY
                || Math.abs(matrix[0] - posX) === Math.abs(matrix[1] - posY)
        })) {
            return false
        }
        return true
     }

     const addQueen = (posX, posY) => {
        const row = queensList[posX].split('');
        row[posY] = 'Q';
        queensList[posX] = row.join('');
     }

     const removeQueen = (posX, posY) => {
        const row = queensList[posX].split('');
        row[posY] = '.';
        queensList[posX] = row.join('');
     }

     const loop = (count = 0) => {
        if (number < count) return result;
        if (number === count) {
            result.push(queensList.map(queen => queen.slice()));
            return result;
        }
        for (let i = 0; i < number; i++) {
            if (canQueen(count, i)) {
                addQueen(count, i);
                loop(count + 1);
                removeQueen(count, i);
            }
        }
     }

     loop();

     return result;
 }
 
 
 (function NQueensI () {
     console.log(solution(4))
 })()