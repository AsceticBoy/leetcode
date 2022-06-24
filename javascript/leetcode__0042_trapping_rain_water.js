/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (struct) {
    let waters = 0;

    // 计算左右索引范围内的水滴
    const calcWater = (array, left, right) => {
        let barrie = 0;
        const height = Math.min(array[left], array[right]);
        const width = right - left - 1;
        for (let index = left + 1; index < right; index++) {
            barrie += array[index];
        }
        return height * width - barrie;
    }

    // 给定结构数组计算流程
    const walk = (array) => {
        // 左右指针、最高位的对应指针
        let left = 0;
        let right = 0;
        let stepMax = 0;
        
        if (array.length <= 1) return;

        while (right < array.length) {
            right += 1;
            // stepMax >= 0
            stepMax = stepMax ? stepMax : right;
            // 计算max
            if (array[right] > array[stepMax]) {
                stepMax = right;
            }
            // 满足计算收集水滴的条件
            if (array[right] >= array[left]) {
                waters += calcWater(array, left, right);
                break;
            }
        }
        // 右边有比左边大
        if (right < array.length) {
            return walk(array.slice(right));
        } else {
            waters += calcWater(array, left, stepMax);
            return walk(array.slice(stepMax));
        }
    }

    walk(struct);

    return waters;
 }
 
 
 (function trappingRainWater () {
    assert.strictEqual(solution([0,1,0,2,1,0,1,3,2,1,2,1]), 6)
    assert.strictEqual(solution([4,2,0,3,2,5]), 9)
 })()