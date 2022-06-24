/**
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列
 * 
 * 输入：nums = [1,1,2]
 * 输出：[[1,1,2],[1,2,1],[2,1,1]]
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (numbers) {
    let exits = [];
    let result = [];
    let length = numbers.length;

    const _walk = (num, index = [], data = []) => {
        if (data.length === length) {
            result = result.concat([data]);
        }
        // exits 用来记录当前层级已经处理过的数字
        exits.push([]);
        for (let i = 0; i < num.length; i++) {
            const last = exits[exits.length - 1];
            if (!index.includes(i) && !last.includes(num[i])) {
                index.push(i);
                last.push(num[i]);
                _walk(num, index, data.concat(num[i]));
                index.pop();
            }
        }
        // 当前层级遍历完后退出
        exits.pop();
    }

    _walk(numbers);

    return result;
 }
 
 
 (function permutationsII () {
    assert.strictEqual(
        JSON.stringify(solution([1,1,2])),
        JSON.stringify([[1,1,2],[1,2,1],[2,1,1]])
    );
    assert.strictEqual(
        JSON.stringify(solution([1,2,3])),
        JSON.stringify([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]])
    );
    assert.strictEqual(
        JSON.stringify(solution([1,2,2,1])),
        JSON.stringify([[1,2,2,1],[1,2,1,2],[1,1,2,2],[2,1,2,1],[2,1,1,2],[2,2,1,1]])
    );
 })()