/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-01
 * @author liudu
 * 
 * 两数之和：
 * 
 * 描述：
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标
 * 
 * 说明：
 * Input: nums = [2, 7, 11, 15] target = 9
 * 
 * nums[0] + nums[1] = 2 + 7 = 9
 * 
 * Output: [0, 1]
 * 
 * 注解：
 * 返回匹配到的第一组解即可
 */

"use strict"

const assert = require('assert').strict;

function solution (numbers, target) {
    const collector = new Map()
    for (let i = 0; i < numbers.length; i++) {
        const other = target - numbers[i]
        if (collector.has(other)) {
            return [collector.get(other), i]
        } else {
            collector.set(numbers[i], i)
        }
    }
}

(function twoSum () {
    assert.deepStrictEqual(solution([2, 7, 11, 15], 9), [0, 1])
    assert.deepStrictEqual(solution([5, 7, 1, 9], 8), [1, 2])
})()