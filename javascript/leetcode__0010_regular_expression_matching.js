/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-07
 * @author liudu
 * 
 * 正则表达式匹配：
 * 
 * 描述：
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 
 * 说明：
 * ------------------------------------------
 * Input:
 * s = "aa"
 * p = "a"
 * Output: false "a" 无法匹配 "aa" 整个字符串
 * ------------------------------------------
 * Input:
 * s = "aa"
 * p = "a*"
 * Output: true 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次
 * ------------------------------------------
 * Input:
 * s = "ab"
 * p = ".*"
 * Output: true '.*' 表示可匹配零个或多个任意字符
 * ------------------------------------------
 * Input:
 * s = "aab"
 * p = "c*a*b"
 * Output: true 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"
 * ------------------------------------------
 * Input:
 * s = "mississippi"
 * p = "mis*is*p*."
 * Output: false
 * ------------------------------------------
 * 
 * 注解：
 * s 可能为空，且只包含从 a-z 的小写字母
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *
 */

"use strict"

const assert = require('assert');

const isInvalid = (str, ptr) => str.charAt(ptr) === '*' && str.charAt(ptr + 1) === '*'

const isEffect = (str, ptr) => str.charAt(ptr) === '.' && str.charAt(ptr + 1) === '*'

// 动态规划
function dynamicProgram (string, regular) {
    let variable
    const dpTable = new Map()

    const dpLoop = (sIndex, rIndex) => {
        if (dpTable.has(`[${sIndex},${rIndex}]`)) return dpTable.get(`[${sIndex},${rIndex}]`)
        // regular 超过自身长度，判断 sIndex 是否也已经到头
        if (rIndex >= regular.length) return sIndex === string.length
        // . 和 普通字符待遇应该是一样的
        let selfVerify = sIndex < string.length
            && (string[sIndex] === regular[rIndex] || regular[rIndex] === '.')
        // 判断有 * 的情况（不包括**）
        if (rIndex + 1 <= regular.length - 1
            && regular[rIndex] !== '*' && regular[rIndex + 1] === '*') {
            // 1、x* 匹配到 0 个的情况 -> rIndex 移出*继续判断
            // 2、x* 匹配到 {1,n} 的情况 -> sIndex 移到下一个继续上述判断
            variable = dpLoop(sIndex, rIndex + 2) || (selfVerify && dpLoop(sIndex + 1, rIndex))
        } else {
            variable = selfVerify && dpLoop(sIndex + 1, rIndex + 1)
        }
        dpTable.set(`[${sIndex},${rIndex}]`, variable)
        return variable
    }

    return dpLoop(0, 0)
}

// 自己的双指针移动，思路和dp的核心规则一致，但是有点复杂，边界的特判也过多
function solution (string, regular) {
    let ptr1 = 0, ptr2 = 0

    let char1, char2, last2 = '', next2 = ''

    // 双指针有一方到达终点，检验结束
    while (ptr1 < string.length && ptr2 < regular.length) {

        char1 = string.charAt(ptr1)
        char2 = regular.charAt(ptr2)

        // 越早检查出 ‘.*’ / ‘**’ 越好
        if (isEffect(regular, ptr2)) return true

        if (isInvalid(regular, ptr2)) return false

        // [a-z]* 的情况
        if (last2 && char2 === '*') {
            if (char1 === last2) {
                // ptr1 指向第一个非 last2 的字符
                while (char1 === last2) { char1 = string.charAt(++ptr1) }
                // pt2 指向第一个非 last2 的字符
                while (char2 === last2
                    || char2 === '*'
                    || char2 === '.') {
                        if (isEffect(regular, ptr2)) return true

                        if (isInvalid(regular, ptr2)) return false
                        
                        next2 = regular.charAt(ptr2 + 1)

                        // 如果遇到 . 且后一个字符也不是 last2 需要终止
                        if (char2 === '.' && next2 !== last2) {
                            // 这个 . 这里还有两种情况，直接决定了 ptr2 移动在 . 上还是 next2 上
                            if (next2 === char1) ptr2++
                            break
                        }
                        char2 = regular.charAt(++ptr2)
                }
                // 清空 last2, next2 继续下一轮
                last2 = ''
                next2 = ''
            } else {
                // a b c
                // a d * x
                // 此时 .* 充当 0 字符的角色
                ptr2++
            }
            continue
        }
        
        last2 = char2

        if (char1 === char2) {
            if (regular.charAt(ptr2 + 1) !== '*') ptr1++
        } else {
            if (char2 === '.') {
                ptr1++
                ptr2++
                continue
            }
            if (regular.charAt(ptr2 + 1) !== '*') return false
        }

        ptr2++

    }

    // ptr1 先到达终点，剩余可以接纳 ‘.*’
    return ptr1 === string.length && (ptr2 === regular.length || isEffect(regular, ptr2))
}

(function regularExpressionMatching () {
    assert.equal(solution('', ''), true)
    assert.equal(solution('', '.*'), true)
    assert.equal(solution('', 'a'), false)
    assert.equal(solution('', '**'), false)
    assert.equal(solution('', '*'), false)
    assert.equal(solution('a', ''), false)
    assert.equal(solution('a', '.*'), true)
    assert.equal(solution('a', '.a'), false)
    assert.equal(solution('a', '**'), false)
    assert.equal(solution('a', '*'), false)
    assert.equal(solution('aa', '.*'), true)
    assert.equal(solution('aa', '.a'), true)
    assert.equal(solution('ab', '*b'), false)
    assert.equal(solution('aa', '**'), false)
    assert.equal(solution('aa', '*'), false)
    assert.equal(solution('aa', 'aa.*'), true)
    assert.equal(solution('aa', 'a*'), true)
    assert.equal(solution('aa', 'a'), false)
    assert.equal(solution('abbbbbcd', 'ab*b.d'), true)
    assert.equal(solution('abbbbbcd', 'ab*b.cd'), true)
    assert.equal(solution('aab', 'c*a*b'), true)
    assert.equal(solution('mississippi', 'mis*is*p*.'), false)
    assert.equal(solution('mississippi', 'mis*is*.ip*i'), true)
    assert.equal(solution('mississippi', 'mis*is*.*'), true)
    assert.equal(solution('sppi', 's*.p*i'), true)
    assert.equal(solution('sppi', 's*.iiip*i'), false)
    // dynamic
    assert.equal(dynamicProgram('', ''), true)
    assert.equal(dynamicProgram('', '.*'), true)
    assert.equal(dynamicProgram('', 'a'), false)
    assert.equal(dynamicProgram('', '**'), false)
    assert.equal(dynamicProgram('', '*'), false)
    assert.equal(dynamicProgram('a', ''), false)
    assert.equal(dynamicProgram('a', '.*'), true)
    assert.equal(dynamicProgram('a', '.a'), false)
    assert.equal(dynamicProgram('a', '**'), false)
    assert.equal(dynamicProgram('a', '*'), false)
    assert.equal(dynamicProgram('aa', '.*'), true)
    assert.equal(dynamicProgram('aa', '.a'), true)
    assert.equal(dynamicProgram('ab', '*b'), false)
    assert.equal(dynamicProgram('aa', '**'), false)
    assert.equal(dynamicProgram('aa', '*'), false)
    assert.equal(dynamicProgram('aa', 'aa.*'), true)
    assert.equal(dynamicProgram('aa', 'a*'), true)
    assert.equal(dynamicProgram('aa', 'a'), false)
    assert.equal(dynamicProgram('abbbbbcd', 'ab*b.d'), true)
    assert.equal(dynamicProgram('abbbbbcd', 'ab*b.cd'), true)
    assert.equal(dynamicProgram('aab', 'c*a*b'), true)
    assert.equal(dynamicProgram('mississippi', 'mis*is*p*.'), false)
    assert.equal(dynamicProgram('mississippi', 'mis*is*.ip*i'), true)
    assert.equal(dynamicProgram('mississippi', 'mis*is*.*'), true)
    assert.equal(dynamicProgram('sppi', 's*.p*i'), true)
    assert.equal(dynamicProgram('sppi', 's*.iiip*i'), false)
})()