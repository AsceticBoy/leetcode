/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 
 * 有效字符串需满足：
 *     1、左括号必须用相同类型的右括号闭合
 *     2、左括号必须以正确的顺序闭合
 * 
 * 输入：s = "()"
 * 输出：true
 * 
 * 输入：s = "()[]{}"
 * 输出：true
 * 
 * 输入：s = "(]"
 * 输出：false
 * 
 * 输入：s = "([)]"
 * 输出：false
 * 
 * 输入：s = "{[]}"
 * 输出：true
 */

'use strict'

const assert = require('assert');

function solution (parentheses) {
    const stack = [];

    const compare = (prev, next) => (prev === '(' && next === ')') || (prev === '[' && next === ']') || (prev === '{' && next === '}');

    for (let i = 0; i < parentheses.length; i++) {
        if (!stack.length) {
            stack.unshift(parentheses[i])
            continue;
        }
        if (compare(stack[0], parentheses[i])) {
            stack.shift()
        } else {
            stack.unshift(parentheses[i])
        }
    }
    return !stack.length
}


(function validParentheses () {
    assert.strictEqual(solution('()'), true)
    assert.strictEqual(solution('()[]{}'), true)
    assert.strictEqual(solution('(]'), false)
    assert.strictEqual(solution('([)]'), false)
    assert.strictEqual(solution('{[]}'), true)
})()