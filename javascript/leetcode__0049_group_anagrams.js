/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
 * 
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * 输入: strs = [""]
 * 输出: [[""]]
 * 
 * 输入：strs = ["a"]
 * 输出: [["a"]]
 * 
 */

 'use strict'

 const assert = require('assert');
 
 function solution (stringArray) {
    const data = [];

    let iterator = stringArray.shift();

    while (iterator !== undefined) {
        const group = [];
        for (let i = 0; i < stringArray.length; i++) {
            let copyA = iterator.slice();
            let copyB = stringArray[i].slice();
            // 长度不等直接跳过
            if (copyA.length !== copyB.length) continue;
            // 逐位比较
            for (let m = 0; m < copyA.length; m++) {
                let j = -1;
                for (let n = 0; n < copyB.length; n++) {
                    if (copyA[m] === copyB[n]) j = n;
                }
                if (j === -1) {
                    break;
                } else {
                    copyA = copyA.substring(0, m) + '&' + copyA.substring(m + 1);
                    copyB = copyB.substring(0, j) + '&' + copyB.substring(j + 1)
                }
            }
            // 字母异位词
            if (copyA === copyB) {
                group.push(stringArray[i]);
                // 删除对应数组位，并调整索引
                stringArray.splice(i, 1);
                i--;
            }
        }
        data.push(group.concat(iterator));
        iterator = stringArray.shift();
    }
    return data;
 }
 
 
 (function powXN () {
    assert.strictEqual(
        JSON.stringify(solution(["eat", "tea", "tan", "ate", "nat", "bat"])),
        JSON.stringify([["tea","ate","eat"],["nat","tan"],["bat"]])
    );
    assert.strictEqual(
        JSON.stringify(solution(['aacd', 'abcd', 'efg', 'kpm', 'mpk', 'egf', 'acb'])),
        JSON.stringify([["aacd"],["abcd"],["egf","efg"],["mpk","kpm"],["acb"]])
    );
    assert.strictEqual(
        JSON.stringify(solution([""])),
        JSON.stringify([[""]])
    );
    assert.strictEqual(
        JSON.stringify(solution(["a"])),
        JSON.stringify([["a"]])
    );
 })()