/**
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 * 
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (matrix) {
    // 存放交换前的数据
    let raw = [];

    // 记录会因交换顶掉的原始数据
    for (let i = 0; i < matrix.length; i++) {
        const data = [];
        for (let m = i; m < matrix.length; m++) {
            data.push(matrix[m][matrix.length - 1 - i]);
        }
        raw.push(data);
    }

    for (let i = 0; i < matrix.length; i++) {
        // 交换数据
        for (let j = 0; j < matrix[i].length; j++) {
            let swap = matrix[i][j];
            // 需要从原始数据中获取
            if (matrix[i].length - 1 - j <= i) {
                swap = raw[matrix[i].length - 1 - j].shift();
            }
            matrix[j][matrix.length - 1 - i] = swap;
        }
    }

    return matrix;
 }
 
 
 (function rotateImage () {
    assert.strictEqual(
        JSON.stringify(solution([[1,2,3], [4,5,6], [7,8,9]])),
        JSON.stringify([[7,4,1], [8,5,2], [9,6,3]])
    );
    assert.strictEqual(
        JSON.stringify(solution(([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]))),
        JSON.stringify([[15,13,2,5], [14,3,4,1], [12,6,8,9], [16,7,10,11]])
    );
 })()