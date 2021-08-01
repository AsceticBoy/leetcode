/**
 * 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组
 * 
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]
 * 
 * 输入：nums = [], target = 0
 * 输出：[]
 */

'use strict'

const assert = require('assert');

function isEqualArray (arr1, arr2) {
    return arr1.every(val => arr2.includes(val)) && arr2.every(val => arr1.includes(val));
}

function solution (data, target) {
    const array = [];
    const sorted = data.sort((a, b) => a - b);
    for (let i = 0; i < sorted.length; i++) {
        if (i === 0 || sorted[i - 1] !== sorted[i]) {
            for (let j = i + 1; j < sorted.length; j++) {
                if (j === i + 1 || sorted[j - 1] !== sorted[j]) {
                    let m = j + 1;
                    let k = sorted.length - 1;
                    // 双指针向中间逼近
                    while (m < k) {
                        const total = sorted[i] + sorted[j] + sorted[m] + sorted[k];
                        if (total === target) {
                            array.push([sorted[i], sorted[j], sorted[m], sorted[k]]);
                        }
                        if (total > target) {
                            // 往前找
                            let k0 = k - 1;
                            while (j < k0 && sorted[k0] === sorted[k]) {
                                k0--;
                            }
                            k = k0;
                        } else {
                            // 往后找
                            let m0 = m + 1;
                            while (m0 < k && sorted[m0] === sorted[m]) {
                                m0++;
                            }
                            m = m0;
                        }
                    }
                }
            }
        }
    }
    return array
}


(function _4sum () {
    const compareOverall = (result, target) => result.reduce((less, item) => {
        const match = less.find(val => isEqualArray(val, item))
        if (match) {
            return less.filter(val => val !== match)
        } else {
            assert.fail(`${result.valueOf()} not equal ${target.valueOf()}`);
        }
    }, target);

    compareOverall(solution([-1, 0, 1, 2, 0, -2], 0), [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]);
    compareOverall(solution([], 0), []);
    compareOverall(solution([1, 0, -1, 0], 0), [[1, -1, 0, 0]]);
})()