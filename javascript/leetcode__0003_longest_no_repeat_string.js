/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-02
 * @author liudu
 * 
 * 无重复字符的最长子串：
 * 
 * 描述：
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
 * 
 * 说明：
 * =================================
 * Input: "abcabcbb"
 * Output: 3(abc)
 * =================================
 * Input: "bbbbb"
 * Output: 1(b)
 * =================================
 * Input: "pwwkew"
 * Output: 3(wke)
 * =================================
 * 
 * 注解：
 * 最长的子串必须是连续的
 */

"use strict"

const assert = require('assert');

// 利用滑动窗口处理
function solution (string) {
    let maxString = ''
    let slide = []
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i)
        if (slide.includes(char)) {
            if (slide.length > maxString.length)
                maxString = slide.join('');
            slide = slide.slice(slide.indexOf(char) + 1, slide.length).concat(char)
        } else {
            slide.push(char)
        }
    }
    return maxString
}

(function longestNoRepeatString () {
    assert.equal(solution('abcabcbb'), 'abc')
    assert.equal(solution('bbbbb'), 'b')
    assert.equal(solution('pwwkew'), 'wke')
})()