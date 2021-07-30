/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组
 * 
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 
 * 输入：nums = []
 * 输出：[]

 * 输入：nums = [0]
 * 输出：[]
 */

'use strict'

const assert = require('assert');

function isEqualArray (arr1, arr2) {
    return arr1.every(val => arr2.includes(val)) && arr2.every(val => arr1.includes(val));
}

function solution (data) {
    const array = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const sum = data[i] + data[j];
            // 第三个数只需要找索引 j 以后的数做比较
            for (let k = j + 1; k < data.length; k++) {
                const arr = [data[i], data[j], data[k]];
                const repeat = array.some(val => isEqualArray(val, arr));
                if (repeat) continue;
                if (sum + data[k] === 0) {
                    array.push(arr);
                }
            }
        }
    }
    return array
}


(function _3sum () {
    const compareOverall = (result, target) => result.reduce((less, item) => {
        const match = less.find(val => isEqualArray(val, item))
        if (match) {
            return less.filter(val => val !== match)
        } else {
            assert.fail(`${result.valueOf()} not equal ${target.valueOf()}`);
        }
    }, target);

    compareOverall(solution([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
    compareOverall(solution([]), []);
    compareOverall(solution([1, 0, -1]), [[1, -1, 0]]);
})()