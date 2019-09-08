/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-09
 * @author liudu
 * 
 * 罗马数字转整数：
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
 * Input: 'III'
 * Output: 3
 * ------------------------------------------
 * Input: 'IV'
 * Output: 4
 * ------------------------------------------
 * Input: 'IX'
 * Output: 9
 * ------------------------------------------
 * Input: 'LVIII'
 * Output: 58 (L = 50, V = 5, III = 3)
 * ------------------------------------------
 * Input: 'MCMXCIV'
 * Output: 1994 (M = 1000, CM = 900, XC = 90, IV = 4)
 * ------------------------------------------
 * 
 * 注解：
 * 输入确保在 1 到 3999 的范围内
 */

"use strict"

const assert = require('assert');

const ROMANS = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1,
}

function solution (roman) {
    let target = 0

    for (let i = 0; i < roman.length; i++) {
        if (i < roman.length - 1 && ROMANS[roman[i]] < ROMANS[roman[i + 1]]) {
            target += (ROMANS[roman[i + 1]] - ROMANS[roman[i]])
            i++
        } else {
            target += ROMANS[roman[i]]
        }
    }

    return target
}

(function roman2Integer () {
    assert.equal(solution('III'), 3)
    assert.equal(solution('IV'), 4)
    assert.equal(solution('IX'), 9)
    assert.equal(solution('LVIII'), 58)
    assert.equal(solution('MCDXLVII'), 1447)
    assert.equal(solution('MCMXCIV'), 1994)
    assert.equal(solution('MMCMXCIV'), 2994)
})()