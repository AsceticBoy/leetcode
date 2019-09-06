/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-04
 * @author liudu
 * 
 * 寻找两个有序数组的中位数：
 * 
 * 描述：
 * 给定两个大小为 m 和 n 的有序数组 num1 和 num2
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))
 * 可以假设 num1 和 num2 不会同时为空
 * 
 * 说明：
 * ------------------------------------------
 * Input: [1, 3], [2]
 * Output: 2.0
 * ------------------------------------------
 * Input: [1, 2], [3, 4]
 * Output: (2 + 3)/2 = 2.5
 * ------------------------------------------
 * 
 * 注解：
 * 算法的时间复杂度为 O(log(m + n))
 */

"use strict"

const assert = require('assert');

function solution (arrayOne, arrayTwo) {
    
}

(function medianSortedArray () {
    assert.equal(solution([1, 3], [2]), 2.0)
    assert.equal(solution([1, 2], [3, 4]), 2.5)
})()