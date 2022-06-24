/**
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 * 
 * 输入：nums = [1]
 * 输出：[[1]]
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (numbers) {
    let result = [];
    let length = numbers.length;

    const _walk = (num, exits = [], data = []) => {
        if (data.length === length) {
            result = result.concat([data]);
        }
        for (let i = 0; i < num.length; i++) {
            if (!exits.includes(i)) {
                exits.push(i);
                _walk(num, exits, data.concat(num[i]))
                exits.pop();
            }
        }
    }

    _walk(numbers);

    return result;
 }
 
 
 (function permutations () {
    assert.strictEqual(
        JSON.stringify(solution([1,2,3])),
        JSON.stringify([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]])
    );
    assert.strictEqual(
        JSON.stringify(solution([0,1])),
        JSON.stringify([[0,1],[1,0]])
    );
    assert.strictEqual(
        JSON.stringify(solution([1])),
        JSON.stringify([[1]])
    );
 })()