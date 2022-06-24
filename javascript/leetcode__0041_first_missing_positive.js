/**
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 * 
 * 输入：nums = [1,2,0]
 * 输出：3
 * 
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (numbers) {
    // 最小正数范围：0 < x < numbers.length + 1
    // 保留范围：1 <= x <= numbers.length
    const length = numbers.length;
    const filters = new Array(length);
    for (let i = 0; i < length; i++) {
        if (numbers[i] >= 1 && numbers[i] <= length) {
            // 假设 filters 为最大排序列，true 为该位置有值
            filters[numbers[i] - 1] = true
        }
    }
    // 查找最小正数
    for (let j = 0; j < filters.length; j++) {
        if (!filters[j]) return j + 1;
    }
    return filters.length + 1
 }
 
 
 (function filterMissingPositive () {
    assert.strictEqual(solution([1,2,0]), 3)
    assert.strictEqual(solution([3,4,-1,1]), 2)
    assert.strictEqual(solution([7,8,9,11,12]), 1)
 })()