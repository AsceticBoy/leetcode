/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-09
 * @author liudu
 * 
 * 最长公共前缀：
 * 
 * 描述：
 * 编写一个函数来查找字符串数组中的最长公共前缀
 * 
 * 说明：
 * ------------------------------------------
 * Input: ['flower','flow','flight']
 * Output: 'fl'
 * ------------------------------------------
 * Input: ['dog','racecar','car']
 * Output: ''
 * ------------------------------------------
 * 
 * 注解：
 * 如果不存在公共前缀，返回空字符串 ''
 */

'use strict'

const assert = require('assert');


function solution (arrayString) {
    let pointer = 0, prefix = ''
    const firstString = arrayString.shift()
    while (firstString && firstString[pointer]) {
        // 有不相等的就退出
        if (arrayString.some(str => str[pointer] !== firstString[pointer])) break
        // 累加
        prefix += firstString[pointer]
        pointer++
    }
    return prefix
}

(function longestCommonPrefix () {
    assert.equal(solution(['flower','flow','flight']), 'fl')
    assert.equal(solution(['dog','racecar','car']), '')
    assert.equal(solution(['abcd', 'abc', 'ab']), 'ab')
})()