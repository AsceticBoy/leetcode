/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-06
 * @author liudu
 * 
 * 回文数：
 * 
 * 描述：
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数
 * 
 * 说明：
 * ------------------------------------------
 * Input: 121
 * Output: true
 * ------------------------------------------
 * Input: -121
 * Output: false(121-)
 * ------------------------------------------
 * Input: 10
 * Output: false(01)
 * ------------------------------------------
 * 
 * 注解：
 * 不将整数转换为字符串处理这个问题
 */

"use strict"

const assert = require('assert');

function solution (number) {
    let copy = number
    let reverse = 0
    while (copy) {
        let mod = copy % 10
        reverse = reverse * 10 + mod
        copy = (copy / 10) >> 0 // 右移不可超过 Int 大小
    }
    return number >= 0 && reverse === number
}

(function palindromeNumber () {
    assert.equal(solution(121), true)
    assert.equal(solution(-121), false)
    assert.equal(solution(10), false)
    assert.equal(solution(10101), true)
    assert.equal(solution(0), true)
})()