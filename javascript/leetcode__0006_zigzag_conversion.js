/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-04
 * @author liudu
 * 
 * Z 字形变换：
 * 
 * 描述：
 * 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列，
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串
 * 
 * 说明：
 * ------------------------------------------
 * Input: 'LEETCODEISHIRING'
 * 
 * L   C   I   R
 * E T O E S I I G
 * E   D   H   N
 * 
 * Output: 'LCIRETOESIIGEDHN'
 * ------------------------------------------
 * Input: 'LEETCODEISHIRING'
 * 
 * L     D     R
 * E   O E   I I
 * E C   I H   N
 * T     S     G
 * 
 * Output: 'LDREOEIIECIHNTSG'
 * 
 */

"use strict"

const assert = require('assert');
// 以最复杂的 ‘ABCDEFGHIJKLYMNZOPQ’ - (6) 来寻找迭代规律
//
// A B C D E F G H I J  K  L  Y  M  N  Z  O  P  Q
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
//
// A      K
// B    J L
// C   I  Y   Q
// D  H   M  P
// E G    N O
// F      Z
//
// 单次 Z 遵循以下规律
// n = rows (6)
// A -> 2*(n-1) -> K -> 2*(n-1)-2*(n-1) -> null
// B -> 2*(n-2) -> J -> 2*(n-1)-2*(n-2) -> L
// C -> 2*(n-3) -> I -> 2*(n-1)-2*(n-3) -> Y
// D -> 2*(n-4) -> H -> 2*(n-1)-2*(n-4) -> M
// E -> 2*(n-5) -> G -> 2*(n-1)-2*(n-5) -> N
// F -> 2*(n-6) -> null -> 2*(n-1)-2*(n-6) -> Z
function solution (string, rows) {
    const lastIndex = string.length - 1
    const maxStep = 2 * (rows - 1)

    let step = 0
    let headStep = 0
    let tailStep = 0
    let convert = ''

    for (let i = 0; i < rows; i++) {
        let pointer = i

        headStep = 2 * (rows - i - 1)
        tailStep = maxStep - 2 * (rows - i - 1)

        for (let j = 0; pointer <= lastIndex; j++) {
            step = j & 1 ? tailStep : headStep
            if (step) {
                convert += string[pointer]
            }
            pointer += step
        }
    }
    return convert
}

(function zigzagConversion () {
    assert.equal(solution('LEETCODEISHIRING', 3), 'LCIRETOESIIGEDHN')
    assert.equal(solution('LEETCODEISHIRING', 4), 'LDREOEIIECIHNTSG')
    assert.equal(solution('ABCDEFGHIJKLY', 6), 'AKBJLCIYDHEGF')
    assert.equal(solution('ABCDEFGHIJKLYMNZOPQ', 6), 'AKBJLCIYQDHMPEGNOFZ')
})()