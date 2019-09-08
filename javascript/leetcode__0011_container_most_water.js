/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-07
 * @author liudu
 * 
 * 盛最多水的容器：
 * 
 * 描述：
 * 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai)
 * 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
 * 
 * 说明：
 * Input: [1,8,6,2,5,4,8,3,7]
 * 
 * 8-|     |______________|_____    max = (9 - 2) * 7 = 49
 * 7-|     |              |     |
 * 6-|     |  |           |     |
 * 5-|     |  |     |     |     |
 * 4-|     |  |     |  |  |     |
 * 3-|     |  |     |  |  |  |  |
 * 3-|     |  |  |  |  |  |  |  |
 * 1-|  |  |  |  |  |  |  |  |  |
 *    ----------------------------
 *      1  2  3  4  5  6  7  8  9
 * 
 * Output: 49
 * 
 * 注解：
 * 1、不能倾斜容器，且 n 的值至少为 2
 * 2、中间的垂线如果高过两侧的围栏垂线，可以无视
 */

"use strict"

const assert = require('assert');

function solution1 (array) {
    let max = 0
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            max = Math.max(max, Math.min(array[i], array[j]) * (j - i))
        }
    }
    return max
}

// 双指针
// max = (j - i) * Min(aj, ai)
// i = 0, j = len - 1 是 j - i 最大的结果，可以假设此时为 max
// 现在需要做的是，减少 j - i 会不会存在 (j - i) * Min(aj, ai) > max
// 所以尽可能的希望 Min(aj, ai) 最大化
function solution2 (array) {
    let head = 0, tail = array.length - 1
    let max = 0
    while (head !== tail) {
        max = Math.max(max, Math.min(array[tail], array[head]) * (tail - head))
        if (array[tail] > array[head]) {
            head++
        } else {
            tail--
        }
    }
    return max
}

(function containerMostWater () {
    assert.equal(solution1([1,8,6,2,5,4,8,3,7]), 49)
    assert.equal(solution2([1,8,6,2,5,4,8,3,7]), 49)
    assert.equal(solution1([8,8,8,8,8,8,8,8,8]), 64)
    assert.equal(solution1([8,8,80,80,8,8,8,8,8]), 80)
    assert.equal(solution2([8,8,80,80,8,8,8,8,8]), 80)
})()