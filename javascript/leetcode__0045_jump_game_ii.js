/**
 * 给你一个非负整数数组 nums ，你最初位于数组的第一个位置
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置
 * 假设你总是可以到达数组的最后一个位置
 * 
 * nums = [2,3,1,7,4]
 * 输出：2
 * 解释: 跳到最后一个位置的最小跳跃数是 2, 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置
 * 
 * 输入：nums = [2,3,0,1,4]
 * 输出：2
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (numbers) {
    let step = 0;
    // 索引位置
    let index = 0;
    // 直到索引到达最后一位停止
    while (index !== numbers.length - 1) {
        step += 1;
        // 最优步数：当前步数 + 跳跃位置下一步可跳最远步数
        let optimalStep = 1;
        for (let j = 1; j <= numbers[index]; j++) {
            const far = j + numbers[index + j];
            const preFar = optimalStep + numbers[index + optimalStep];
            if (far > preFar) {
                optimalStep = j;
            }
        }
        // 如果 optimalStep 直接能到终点则退出
        if (index + optimalStep + numbers[optimalStep + index] === numbers.length - 1) {
            step += 1;
            break;
        }
        index = optimalStep + index;
    }
    return step;
 }
 
 
 (function jumpGameII () {
    assert.strictEqual(solution([2,3,1,7,4]), 2)
    assert.strictEqual(solution([2,3,0,1,4]), 2)
 })()