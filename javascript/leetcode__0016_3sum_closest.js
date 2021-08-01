/**
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案
 * 
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 
 */

 'use strict'

const assert = require('assert');
 
 
function solution (data, target) {
    let closet = Number.MAX_SAFE_INTEGER;
    const sorted = data.sort((a, b) => a - b);
    const length = sorted.length;
    for (let i = 0; i < length; i++) {
        if (i === 0 || sorted[i - 1] !== sorted[i]) {
            let j = i + 1;
            let k = length - 1;
            // 因为已经排序，可以用双指针向中间逼近
            while (j < k) {
                const total = sorted[i] + sorted[j] + sorted[k];
                if (total === target) {
                    return total
                }
                if (total > target) {
                    closet = Math.abs(target - total) < Math.abs(target - closet) ? total : closet;
                    // 向左逼近，且不需要和上一位相等
                    let k0 = k - 1
                    while (j < k0 && sorted[k0] === sorted[k]) {
                        k0--;
                    }
                    k = k0;
                } else {
                    closet = Math.abs(target - total) < Math.abs(target - closet) ? total : closet;
                    // 向右边逼近，且不需要和上一位相等
                    let j0 = j + 1;
                    while (j0 < k && sorted[j0] === sorted[j]) {
                        j0++;
                    }
                    j = j0;
                }
            }
        }
    }
    return closet
}
 
 
(function _3sum_closet () {
    assert.strictEqual(solution([-1, 2, 1, -4], 1), 2);
    assert.strictEqual(solution([1, 2, 4, 7, 8, 9], 100), 24);
    assert.strictEqual(solution([-1, 2, -4, 7, 8, -9], -10), -11)
})()