/**
 * copyright by liudu
 * 
 * @from ZhiHu
 * @time 2019-09-01
 * @author liudu
 * 
 * 蓄水池抽样问题：
 * 
 * 描述：
 * 给定 N 个元素，其中 N 的大小未知，可能非常大，现需要从中随机的抽取 k 个元素，要求所有数据被选中的概率相同
 * 
 * 说明：
 * N: 总数
 * k: 选取元素个数
 * Outputs: [a0, a1, a2, ... ak] (所有元素理论上被选到的可能都是 k / N)
 * 注：N 非常大或未知，不可能靠记录 N 来处理
 * 
 * 解释：
 * m: 当前元素是第几个
 * 当 m < k + 1，直接推入收集器，当 m >= k + 1，元素存在 k / m 被留下的可能，并随机替换掉收集器中任意元素
 * 最后留在收集器中的元素就可以认为是等概率获取的 N 个元素中的 k 个
 * 
 * 证明：
 * 假设当 m = n 时，前面的元素被留下的概率 p(n) = k / n
 * 那么当 m = n + 1 时：
 *    前面留下的元素，这次留下的概率分为两种情况：
 *      1、前一次被留下了，n + 1 没有被抽中
 *      2、前一次被留下了，n + 1 抽中了，但是没有把自己替换掉
 * p(n+1) = (k / n) * (1 - (k / n + 1)) + (k / n) * ((k / n + 1) * (1 - 1 / k)) = k / n + 1
 * 所以是符合预期的
 */

"use strict"

function random (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function solution (max) {
    let i = 0
    const collector = []
    return (ele) => {
        if (i < max) {
            collector.push(ele)
        } else {
            const ptr = random(0, i)
            if (ptr < max)
                collector[ptr] = ele
        }
        i++
        return collector
    }
}

(function reservoirSampling () {
    const samples = Array.from(Array(10).keys())
    const loop = solution(5)
    for (let i = 0; i < samples.length; i++) {
        console.log(loop(samples[i]))
    }
})()