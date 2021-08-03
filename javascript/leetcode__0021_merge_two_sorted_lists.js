/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 
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