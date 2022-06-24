/**
 * 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）
 * 
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 * 
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 * 
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2-2 = 1/22 = 1/4 = 0.25
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (x, n) {
    if (n === 0) return 1;
    const _pow = (x, n) => {
        let pow = 1;
        // 快速幂
        while (n) {
            // 二进制最低位为 1
            if (n & 1) pow = pow * x;
            x = x * x;
            // 二进制右移
            n = n >> 1;
        }
        return pow;
    }
    return n > 0 ? _pow(x, n) : 1 / _pow(x, -n);
 }
 
 
 (function powXN () {
    assert.strictEqual(solution(2, 10), 1024);
    assert.strictEqual(solution(2, 3), 8);
    assert.strictEqual(solution(2, -2), 0.25);
 })()