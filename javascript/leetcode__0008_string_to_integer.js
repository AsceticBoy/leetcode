/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-06
 * @author liudu
 * 
 * 字符串转换整数(atoi)：
 * 
 * 描述：
 * 实现一个 atoi 函数，使其能将字符串转换成整数
 * 1、该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止
 * 2、找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号
 * 3、假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换
 * 4、环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31, 2^31−1]。如果数值超过这个范围，请返回  INT_MAX (2^31−1) 或 INT_MIN (−2^31) 
 * 5、在任何情况下，若函数不能进行有效的转换时，请返回 0
 * 
 * 说明：
 * ------------------------------------------
 * Input: “42”
 * Output: 42
 * ------------------------------------------
 * Input: “    -42”
 * Output: -42
 * ------------------------------------------
 * Input: “4193 with words”
 * Output: 4193
 * ------------------------------------------
 * Input: “words and 987”
 * Output: 0
 * ------------------------------------------
 * Input: “-91283472332”
 * Output: -2147483648
 * ------------------------------------------
 * 
 */

"use strict"

const assert = require('assert');

const INT_MAX = Math.pow(2, 31) - 1
const INT_MIN = -Math.pow(2, 31)

function solution (string) {
    let integer = 0
    let step = 1

    for (let i = 0; i < string.length; i++) {
        const unicode = string.charCodeAt(i)
        // space 32
        if (unicode === 32)
            continue
        // '-' 45
        if (unicode === 45) {
            step = -1
            continue
        }
        // '0 - 9' 48 - 57
        if (unicode >= 48 && unicode <= 57) {
            integer = integer * 10 + step * (~~String.fromCharCode(unicode))
        } else {
            break
        }
    }

    return Math.min(INT_MAX, Math.max(INT_MIN, integer))
}

(function atoi () {
    assert.equal(solution('42'), 42)
    assert.equal(solution('     -42'), -42)
    assert.equal(solution('4193 with words'), 4193)
    assert.equal(solution('words and 987'), 0)
    assert.equal(solution('-91283472332'), INT_MIN)
})()