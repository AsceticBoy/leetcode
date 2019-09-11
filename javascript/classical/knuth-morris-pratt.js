/**
 * copyright by liudu
 * 
 * @time 2019-09-10
 * @author liudu
 * 
 * KMP字符串匹配算法（Knuth-Morris-Pratt）
 * 
 * 描述：
 * 给定字符串 s 以及匹配串 m 可以计算: m 是否与 s 相匹配、匹配位置、m 在 s 中全局匹配了几次等
 * 
 * 说明：
 * * KMP 的核心是张部分匹配表 PMT (Partial-Match-Table)
 * ------------------------------------------
 * e.g abababca
 * 前缀：a、ab、aba、abab、ababa、ababab、abababc (不包括自己)
 * 后缀：a、ca、bca、abca、babca、ababca、bababca (不包括自己)
 * 公共前后缀：a
 * ------------------------------------------
 * 同理算出 a、ab、aba、abab、ababa、ababab、abababc 的公共前后缀
 * PMT:
 * a ab aba abab ababa ababab abababc abababca
 * 0 0   1   2     3     4       0        1
 * 
 * 算法：
 * 字符串(s)：bababababcap
 * 匹配串(m)：abababca
 * ------------------------------------------
 * i
 * |
 * b a b a b a b a b c a p
 * a b a b a b c a
 * |
 * j
 * ------------------------------------------
 * s(i) === m(j) i、j 都往后移动
 * s(i) !== m(j) i 往后移动
 * * 后面发现也可以把它理解成 j 先移动到 PMT(0)，然后 i j 都往后移，这样和后面的步进规则就保持了统一（假设 PMT(0) = -1）
 * ------------------------------------------
 *   i
 *   |
 * b a b a b a b a b c a p
 *   a b a b a b c a
 *   |
 *   j
 * ------------------------------------------
 * ...
 * ------------------------------------------
 *               i
 *               |
 * b a b a b a b a b c a p
 *   a b a b a b c a
 *   — — — — — - |
 *               j
 * ------------------------------------------
 * * 发现 s(i) !== m(j) j 往前移动 (已匹配的字符数 - 对应的部分PMT) 即 (ababab - PMT(ababab)) = 6 - 4 = 2
 * * 其实就是移动到 公共前缀 的 下一个字符，也就是 PMT(ababab) = 4 的位置
 * ------------------------------------------
 *               i
 *               |
 * b a b a b a b a b c a p
 *       a b a b a b c a
 *               |
 *               j (PMT(ababab) 是 abab 所以 j 移到了下一个字符 a 上开始重新比较)
 * ------------------------------------------
 * 继续开始比较 s(i) 和 m(j)
 * 如果相同 i j 一起后移动
 * 如果不同 j 移动到 PMT(abab) 的位置，再一起往后移
 * ------------------------------------------
 *                     i
 *                     |
 * b a b a b a b a b c a p
 *       a b a b a b c a
 *                     |
 *                     j
 * ------------------------------------------
 * 如果不需要完全匹配：j 继续往后走就溢出了，说明已经完成了匹配
 * 如果需要完全匹配：j 移动到 PMT(abababc) = 0 的位置重新开始
  * ------------------------------------------
 *                     i
 *                     |
 * b a b a b a b a b c a p
 *                     a b a b a b c a
 *                     |
 *                     j
 * ------------------------------------------
 * 继续重复上面的步骤 (需要花时间自己体会下里面的精妙之处)
 * ------------------------------------------
 * 
 * * 这里其实最难理解的地方应该是：当 s[i] !== m[j] 时，为啥要移到 PMT(xxx) 的位置
 * 
 * * 个人思考到一种能感受性理解的解释：
 * 
 *               i
 *               |
 * b a b a b a b a b c a p
 *   a b a b a b c a
 *   — — — — — - |
 *               j
 * 以上面这个为例，abababca 是要整串匹配于字符串的，此时 i j 对应的 a c 开始不相等了，而 PMT(ababab) = abab
 * 
 * a b a b c  也就是说 公共的最长后缀 + c 和 ababa 是不想等的
 * - - - -
 *   后缀
 * 
 * 那我们要尽可能早的发现最大匹配的可能性，应该需要拿 公共的最长前缀 + 后一位 去比较看看是否有相等的可能   a b a b a
 *                                                                                         - - - - 
 *                                                                                           前缀
 * 
 * 参考：
 * http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
 * https://www.zhihu.com/question/21923021
 */

'use strict'

const assert = require('assert');

// PMT 计算过程其实也是一个字符串匹配的过程
// e.g: abababca
// 设置一个数组 pmt 用索引值代表前缀字符数量，记录对应的 PM
// ------------------------------------------
// pmt[0] = -1 无实际意义，为了后面编码统一性考虑
// a 字符 PM一定是 0 所以 pmt[1] = 0
// ------------------------------------------
//   i
//   |
// a b a b a b c a
//   a b a b a b c a
//   |
//   j
// ab 字符PM最大可能匹配应该是
// a b
//   a b
// b !== a 所以 pmt[2] = 0，i 往前移，检查 aba
// ------------------------------------------
// 对于 aba 来说 ba !== ab (因为上面得出), 所以直接可以进行 次可能的匹配
// 即 a === a 所以 pmt[3] = 1，i j 都往前移，检查 abab
// ------------------------------------------
// 对于 abab 来说 pmt[2] = 0 (bab !== aba) 已经否定了最大匹配的可能
// 而 pmt[3] = 1 (a === a) 保障了已经有一个 前缀字符 === 后缀字符，如果存在最大匹配需要往后面检查
// 即 ab === ab 所以 pmt[4] = 2，i j 都往前移
// ------------------------------------------
// ......
// ------------------------------------------
// 对于 abababc 来说 pmt[6] = 4，如果相等就是 pmt[7] = 5，但是后面一个字符不相等
// a b a b a b c
//     a b a b a a b c
// 那我又希望能尽可能的最大匹配，处理方案就和字符串匹配一模一样了，回到 pmt[abab] 的地方开始检查，只有这样才有可能找到次大的公共匹配
// 大体已经有规律了，后面就是算法描述
function PMT (partial) {
    let i = 0, j = -1
    // pmt[1,2,3...] 分别代表 1、2、3... 字符的情况
    const pmt = [ -1 ]
    while (i < partial.length) {
        if (j === -1 || partial[i] === partial[j]) {
            ++i
            ++j
            pmt[i] = j
        } else {
            // j = pmt[0] = -1 的设计就是为了统一的过程
            // 等到下一轮判断就是 i + 1，j 不动的过程
            j = pmt[j]
        }
    }
    return pmt
}

function KMP (string, partial) {
    let i = 0, j = 0
    const pmt = PMT(partial)
    // i 和 j 有一方溢出视为结束
    while (i < string.length && j < partial.length) {
        if (j === -1 || string[i] === partial[j]) {
            ++i
            ++j
        } else {
            j = pmt[j]
        }
    }
    // 返回匹配串第一个字符在 string 上的索引位置
    return j === partial.length ? i - j : -1
}

assert.equal(KMP('bababababcap', 'abababca'), 3)
assert.equal(KMP('btbpblsancap', 'san'), 6)