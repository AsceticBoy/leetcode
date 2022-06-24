/**
 * 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配
 * '?' 可以匹配任何单个字符。
 * '*' 可以匹配任意字符串（包括空字符串）
 * 
 * s 可能为空，且只包含从 a-z 的小写字母
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *
 * 
 * 输入：
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串
 * 
 * 输入:
 * s = "aa"
 * p = "*"
 * 输出: true
 * 解释: '*' 可以匹配任意字符串
 * 
 * 输入:
 * s = "cb"
 * p = "?a"
 * 输出: false
 * 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'
 * 
 * 输入:
 * s = "adceb"
 * p = "*a*b"
 * 输出: true
 * 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce"
 * 
 * 输入:
 * s = "acdcb"
 * p = "a*c?b"
 * 输出: false
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (string, pattern) {
    const sLen = string.length + 1;
    const pLen = pattern.length + 1;
    // 横坐标为字符串的索引
    // 纵坐标为模式串的索引
    // match table 描述 (x,y) 情况下是否能够匹配
    const matchTable = Array(pLen).fill().map(() => Array(sLen).fill(false));
    // 双空可通过
    matchTable[0][0] = true;
    for (let j = 1; j < pLen; j++) {
        // * 可匹配空值
        matchTable[j][0] = matchTable[j - 1][0] && pattern[j - 1] === '*'
    }
    for (let i = 1; i < pLen; i++) {
        for (let j = 1; j < sLen; j++) {
            if (pattern[i - 1] === '*') {
                // 表格上面或者左边为 true 那当前项就为 true
                matchTable[i][j] = matchTable[i - 1][j] || matchTable[i][j - 1];
            }
            if (pattern[i - 1] === '?' || string[j - 1] === pattern[i - 1]) {
                // 表格左上角位置为 true 那当前项就为 true
                matchTable[i][j] = matchTable[i - 1][j - 1];
            }
        }
    }
    return matchTable[pLen - 1][sLen - 1]
 }
 
 
 (function wildcardMatching () {
    assert.strictEqual(solution("aa", "a"), false)
    assert.strictEqual(solution("aa", "*"), true)
    assert.strictEqual(solution("cb", "?a"), false)
    assert.strictEqual(solution("adceb", "*a*b"), true)
    assert.strictEqual(solution("acdcb", "a*c?b"), false)
 })()