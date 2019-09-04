/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-04
 * @author liudu
 * 
 * 最长回文子串：
 * 
 * 描述：
 * 给定一个字符串 s，找到 s 中最长的回文子串
 * 
 * 说明：
 * =================================
 * Input: "babad"
 * Output: "bab"("aba"也是有效答案)
 * =================================
 * Input: "cbbd"
 * Output: "bb"
 * =================================
 * 
 * 注解：
 * 回文字符串可理解为正反可以重合的字符串
 */

"use strict"

const assert = require('assert');

function solution (string) {
    let doubleStrLen = 2 * string.length
    let longest = []
    // b x a x b x a x d
    // 0   1   2   3   4
    // 0 1 2 3 4 5 6 7 8
    for (let i = 0; i < doubleStrLen - 1; i++) {
        // 第一次：奇数 1 向两侧步进，偶数 2 向两侧步进
        const step = i & 1 ? 1 : 2

        let left = i - step, right = i + step
        
        // 偶数需要取一次 i / 2 本身的值
        const manacher = i & 1 ? [] : [string[i / 2]]

        while (left >= 0 && right <= doubleStrLen - 2) {
            if (string[left / 2] === string[right / 2]) {
                manacher.unshift(string[left / 2])
                manacher.push(string[right / 2])
            } else {
                break
            }
            // 统一步进
            left -= 2
            right += 2
        }
        // 比较最长的回文
        if (manacher.length > longest.length)
            longest = manacher
    }
    return longest.reduce((prev, next) => prev + next)
}

(function longestPalindromicSubstring () {
    assert.equal(solution('aaaaa'), 'aaaaa')
    assert.equal(solution('absuhauuaht'), 'hauuah')
    assert.equal(solution('liuduuduil'), 'liuduuduil')
    assert.equal(solution('babad'), 'bab')
    assert.equal(solution('cbbd'), 'bb')
})()