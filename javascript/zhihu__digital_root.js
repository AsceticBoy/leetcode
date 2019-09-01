/**
 * copyright by liudu
 * 
 * @from ZhiHu
 * @time 2019-08-31
 * @author liudu
 * 
 * 数字根问题：
 * 
 * 描述：
 * 给定一个正整数，循环求它各位上的和，直到变为个位数，求该值
 * 
 * 说明：
 * =================================
 * Input: 1234567
 * 28 = 1 + 2 + 3 + 4 + 5 + 6 + 7
 * 10 = 2 + 8
 * 1 = 1 + 0
 * Output: 1
 * =================================
 * Input: 90
 * 9 = 9 + 0
 * Output: 9
 * =================================
 * 
 * 注解：
 * 该值其实就是数字根，是自然数的一种性质
 */

"use strict"

const assert = require('assert');

function solution (x) {
    // 任意自然数：
    // A: x = a(n) * 10^(n) + a(n-1) * 10^(n-1) + ... + a(0) * 10^(0)
    //
    // B: 1 = 10^(n) % 9 | 10^(n-1) % 9 | ... | 10^(0) % 9
    //
    // >>> C: x = a(n) + a(n-1) + ... + a(0)
    //
    // 继续 A 以此类推 (9的倍数比较特殊)
    return (x - 1) % 9 + 1
}

(function digitalRoot () {
    assert.equal(solution(1234567), 1)
    assert.equal(solution(90), 9)
})()