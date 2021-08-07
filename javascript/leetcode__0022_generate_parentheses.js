/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合
 * 
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 * 
 * 输入：n = 1
 * 输出：["()"]
 */

'use strict'

const assert = require('assert');

const wrap = n => {
    let str = '';
    for (let i = 0; i < n; i++) {
        str = '(' + str + ')';
    }
    return str;
}

function solution (count) {
    const parentheses = [];
    const _loop = (n, l) => {
        for (let i = 1; i <= n; i++) {
            _loop(n - i, l + wrap(i));
        }
        if (!n) parentheses.push(l)
    }
    _loop(count, '')
    return parentheses;
}


(function generateParentheses () {
    console.log(solution(3))
})()