/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-08
 * @author liudu
 * 
 * 整数转罗马数字：
 * 
 * 描述：
 * 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M
 * 字符          数值
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 * 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II
 * 
 * 通常情况下，罗马数字中小的数字在大的数字的右边，但也存在特例，例如 4 不写做 IIII，而是 IV。这样的特例有以下六种情况：
 * I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9
 * X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90
 * C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900
 * 
 * 说明：
 * ------------------------------------------
 * Input: 3
 * Output: 'III'
 * ------------------------------------------
 * Input: 4
 * Output: 'IV'
 * ------------------------------------------
 * Input: 9
 * Output: 'IX'
 * ------------------------------------------
 * Input: 58
 * Output: 'LVIII' (L = 50, V = 5, III = 3)
 * ------------------------------------------
 * Input: 1994
 * Output: 'MCMXCIV' (M = 1000, CM = 900, XC = 90, IV = 4)
 * ------------------------------------------
 * 
 * 注解：
 * 输入确保在 1 到 3999 的范围内
 */

"use strict"

const assert = require('assert');

const ROMANS = [
    ['M', 1000],
    ['D', 500],
    ['C', 100],
    ['L', 50],
    ['X', 10],
    ['V', 5],
    ['I', 1],
]

function solution (integer) {
    let target = '', lastRoman = ''

    for (let i = 0; i < ROMANS.length; i++) {
        let [ roman, int ] = ROMANS[i]
        let quot = (integer / int) >> 0
        // 特殊情况
        if (quot >= 4) {
            if (lastRoman !== ROMANS[i - 1][0]) {
                // 147 -> CXXXXVII -> CXLVII
                target += (roman + ROMANS[i - 1][0])
            } else {
                // 197 -> CLXXXXVII -> CXCVII
                target = target.slice(0, target.length - 1) + (roman + ROMANS[i - 2][0])
            }
        } else {
            while (quot) {
                lastRoman = roman
                target += roman
                quot--
            }
        }
        integer = integer % int
    }

    return target
}

(function integer2Roman () {
    assert.equal(solution(3), 'III')
    assert.equal(solution(4), 'IV')
    assert.equal(solution(9), 'IX')
    assert.equal(solution(58), 'LVIII')
    assert.equal(solution(1447), 'MCDXLVII')
    assert.equal(solution(1994), 'MCMXCIV')
    assert.equal(solution(2994), 'MMCMXCIV')
})()