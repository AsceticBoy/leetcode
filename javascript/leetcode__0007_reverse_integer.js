/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-05
 * @author liudu
 * 
 * 整数反转：
 * 
 * 描述：
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转
 * 
 * 说明：
 * ------------------------------------------
 * Input: 123
 * Output: 321
 * ------------------------------------------
 * Input: -123
 * Output: -321
 * ------------------------------------------
 * Input: 120
 * Output: 21
 * ------------------------------------------
 * 
 * 注解：
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31, 2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0
 */

"use strict"

const assert = require('assert');

const INT_MAX = Math.pow(2, 31) - 1
const INT_MIN = -Math.pow(2, 31)

function solution (integer) {
    let reserve = 0
    
    while (integer) {
        let mod = integer % 10
        // 右移取整
        // 20.1 >> 0 = 20, 20.9 >> 0 = 20
        // -20.1 >> 0 = -20, -20.9 >> 0 = -20
        integer = (integer / 10) >> 0
        // x * 10 + mod > INT_MAX 溢出
        // x * 10 + mod < INT_MAX 溢出
        if (reserve > (INT_MAX - mod) / 10 || reserve < (INT_MIN - mod) / 10)
            return 0

        // 这步比较关键
        reserve = reserve * 10 + mod
    }
    return reserve
}

(function reserveInteger () {
    assert.equal(solution(123), 321)
    assert.equal(solution(-123), -321)
    assert.equal(solution(120), 21)
    assert.equal(solution(826006), 600628)
    assert.equal(solution(-Math.pow(2, 30)), 0) // 溢出
    assert.equal(solution(Math.pow(2, 30)), 0) // 溢出
})()