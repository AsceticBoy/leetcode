/**
 * copyright by liudu
 * 
 * @from ByteDance
 * @time 2019-09-06
 * @author liudu
 * 
 * 老鼠试药问题：
 * 
 * 描述：
 * 给定 8 瓶药水，已知其中包含 1 瓶毒药，如果用小白鼠来测试毒药，会在一礼拜后毒发身亡，现只给一周时间，
 * 请问至少需要几只小白鼠才能够找出那瓶毒药
 * 
 * 说明：
 * 小白鼠喝的药水可以相互混合，比如：小白鼠 A 可以喝 1、2、3、4... 瓶毒药的混合体
 * 
 * 扩展：
 * 1、现在 1000 瓶药，1 瓶毒药，可给两周时间测出毒药，请问需要几只小白鼠
 * 2、现在 1000 瓶药，2 瓶毒药，可给一周时间测出毒药，请问需要几只小白鼠
 * 3、现在 1000 瓶药，1 瓶毒药，可给一周时间，需要测出 998 瓶无毒药，需要几只小白鼠
 * 
 * 思路：
 * 1、算出根据药和毒的组合，算出所有可能性,记为 m 如：C(8, 1)
 * 2、为这些可能性从 0 开始标上数字，并且转换为对应的二进制
 * 3、算出每只老鼠可以在给定时间内表现出几种有效状态，记为 s
 * 4、这些有效状态依次去检验 2 中得出的二进制各个位数 1 的混合毒物，活下来说明这个位上的数必然为 1
 * 5、需要的老鼠数 n = log(s)(m)
 */

"use strict"

const assert = require('assert');

// 组合
function combination (m, n) {
    let c = 1
    while (n) {
        c *= m / n
        m--
        n--
    }
    return c
}

function solution (medicine, poison, validStates) {
    // C(m, n) = (m * (m - 1) * ... * (m - n + 1)) / n!
    const situation = combination(medicine, poison)

    return Math.ceil(Math.log(situation) / Math.log(validStates))
}

(function mouseTestPoison () {
    // 8 药 1 毒 3 鼠，算时间
    // 步骤1：组合状态： C(8, 1)
    // 步骤2：
    // 0 0 0 - 药 1 可能为毒
    // 0 0 1 - 药 2 可能为毒
    // 0 1 0 - 药 3 可能为毒
    // 0 1 1 - 药 4 可能为毒
    // 1 1 0 - 药 5 可能为毒
    // 1 0 1 - 药 6 可能为毒
    // 1 0 0 - 药 7 可能为毒
    // 1 1 1 - 药 8 可能为毒
    // 步骤3：每只老鼠只有两种有效状态 死 / 活
    // 步骤4：老鼠1喝（2、4、6、8）混合，老鼠2喝（3、4、5、8）混合，老鼠3喝（5、6、7、8）混合
    // 老鼠的死都能确定当前位的值是 1 / 0，各个位合起来就能确定有毒的那瓶的二进制数
    assert.equal(solution(8, 1, 2), 3)

    // 扩展1
    // 时间变为两周意味着，第一周活着的老鼠可以进入下一轮的测试，有更多的有效状态
    // 有效状态（死了就不能下一轮测试）：
    // 1轮活，2轮活
    // 1轮活，2轮死
    // 1轮死
    assert.equal(solution(1000, 1, 3), 7)

    // 扩展2
    // 2瓶毒药说明组合可能变多了，C(1000, 2)
    assert.equal(solution(1000, 2, 2), 19)
    // C(1000, 3)
    assert.equal(solution(1000, 3, 2), 28)

    // 扩展3
    // 要测 998 瓶一定无毒，说明有 2 瓶可能有毒
    // 测 2 瓶需要 1 只，1000 瓶需要 10 只
    assert.equal(solution(1000, 1, 2) - solution(2, 1, 2), 9)
})()