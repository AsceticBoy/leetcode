/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 你可以认为每种硬币的数量是无限的
 * 
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 
 * 输入：coins = [2], amount = 3
 * 输出：-1
 * 
 * 输入：coins = [1], amount = 0
 * 输出：0
 */

 'use strict'
 
 function solution (coins, amount) {
     const dp = [];
     const sortedCoins = coins.sort((a, b) => a - b);

     if (amount === 0) return 0;
     if (sortedCoins.includes(amount)) return 1;

     dp[0] = [];
     dp[1] = sortedCoins.slice();

     for (let i = 2; i > 0; i++) {
        if (!dp[i - 1].length) return -1;
        dp[i] = [];
        // dp[i] = dp[i - 1] * coins
        for (let j of dp[i - 1]) {
            for (let m of sortedCoins) {
                if (j + m === amount) return i;
                if (j + m > amount) break;
                if (!dp[i].includes(j + m)) dp[i].push(j + m);
            }
        }
     }
 }
 
 
 (function coinChange () {
     console.log(solution([1, 9, 7, 6], 18))
 })()