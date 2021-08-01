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
    const sorted = data.sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
        if (i === 0 || sorted[i - 1] !== sorted[i]) {
            let j = i + 1;
            let k = sorted.length - 1;
            // 双指针向中间逼近
            while (j < k) {
                const total = sorted[i] + sorted[j] + sorted[k];
                if (total === 0) {
                    array.push([sorted[i], sorted[j], sorted[k]]);
                }
                if (total > 0) {
                    // 往前找
                    let k0 = k - 1;
                    while (j < k0 && sorted[k0] === sorted[k]) {
                        k0--;
                    }
                    k = k0;
                } else {
                    // 往后找
                    let j0 = j + 1;
                    while (j0 < k && sorted[j0] === sorted[j]) {
                        j0++;
                    }
                    j = j0;
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