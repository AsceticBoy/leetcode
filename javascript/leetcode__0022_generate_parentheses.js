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

function generateParentheses(n) {
    // dp[n] 为 n 个括号的可能性
    // dp[n] = (dp[i])dp[j]
    // n = i + 1 +j
    const dp = Array(n + 1).fill().map(() => new Array());
    dp[0] = ['']
    dp[1] = ['()']
    if (n === 0 || n === 1) return dp[n];
    for (let i = 2; i <= n; i++) {
        for (let j = 0; j <= i - 1; j++) {
            const right = dp[j];
            const left = dp[i - 1 - j];
            for (const p of right) {
                for (const q of left) {
                    dp[i].push(`(${p})${q}`);
                }
            }
        }
    }
    return dp[n];
}