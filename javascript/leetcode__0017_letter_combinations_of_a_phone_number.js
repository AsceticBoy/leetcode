/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回
 * 
 * 注：给定数字顺序就是按键组合顺序
 * 
 * 映射如下：
 * 1 - 无对应
 * 2 - a、b、c
 * 3 - d、e、f
 * 4 - g、h、i
 * 5 - j、k、l
 * 6 - m、n、o
 * 7 - p、q、r、s
 * 8 - t、u、v
 * 9 - w、x、y、z
 * 
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * 输入：digits = ""
 * 输出：[]
 * 
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 */

'use strict'

const DigitsMap = new Map([
    [2, ['a', 'b', 'c']],
    [3, ['d', 'e', 'f']],
    [4, ['g', 'h', 'i']],
    [5, ['j', 'k', 'l']],
    [6, ['m', 'n', 'o']],
    [7, ['p', 'q', 'r', 's']],
    [8, ['t', 'u', 'v']],
    [9, ['w', 'x', 'y', 'z']]
]);

function isEqualArray (arr1, arr2) {
    return arr1.every(val => arr2.includes(val)) && arr2.every(val => arr1.includes(val));
}

const assert = require('assert');
 
 
function solution (digit) {
    let lastCombination = [];
    let combination = [];
    for (let i = 0; i < digit.length; i++) {
        const match = DigitsMap.get(Number(digit[i]));
        lastCombination = combination.slice();
        combination = [];
        for (let j = 0; j < match.length; j++) {
            if (lastCombination.length) {
                for (let k = 0; k < lastCombination.length; k++) {
                    combination.push(lastCombination[k] + match[j]);
                }
            } else {
                combination.push(match[j])
            }
        }
    }
    return combination
}
 
 
(function letterCombinations () {
    console.log(solution('789').length)
    assert.strictEqual(isEqualArray(solution(''), []), true);
    assert.strictEqual(isEqualArray(solution('2'), ['a', 'b', 'c']), true);
    assert.strictEqual(isEqualArray(solution('23'), ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']), true);
    assert.strictEqual(
        isEqualArray(
            solution('789'),
            [ 
                'ptw', 'qtw', 'rtw', 'stw',
                'puw', 'quw', 'ruw', 'suw',
                'pvw', 'qvw', 'rvw', 'svw',
                'ptx', 'qtx', 'rtx', 'stx',
                'pux', 'qux', 'rux', 'sux',
                'pvx', 'qvx', 'rvx', 'svx',
                'pty', 'qty', 'rty', 'sty',
                'puy', 'quy', 'ruy', 'suy',
                'pvy', 'qvy', 'rvy', 'svy',
                'ptz', 'qtz', 'rtz', 'stz',
                'puz', 'quz', 'ruz', 'suz',
                'pvz', 'qvz', 'rvz', 'svz'
            ]),
        true
    );
})()