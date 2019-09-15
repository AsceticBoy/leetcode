/**
 * copyright by liudu
 * 
 * @from ZhiHu
 * @time 2019-09-15
 * @author liudu
 * 
 * 约瑟夫环问题：
 * 
 * 描述：
 * 编号为 1-N 的 N 个士兵围坐在一起形成一个圆圈，从编号为 1 的士兵开始依次报数（1，2，3...这样依次报），
 * 数到 m 的 士兵会被杀死出列，之后的士兵再从 1 开始报数。直到最后剩下一士兵，求这个士兵的编号
 * 
 * 说明：
 * n = 6, m = 3
 * 
 *      1            4           1            2            2        2
 *   6     2  __  3     5  __       2  __        3  __        __
 *   5     3      2           4            1            1
 *      4            1           3
 * 最后留下的是 2 的位置，即一开始为 1 的士兵
 * 
 * 参考：
 * https://zhuanlan.zhihu.com/p/74436158
 * http://tingyun.site/2018/04/26/%E7%BA%A6%E7%91%9F%E5%A4%AB%E7%8E%AF%E9%97%AE%E9%A2%98%E8%AF%A6%E8%A7%A3/
 */

"use strict"

const assert = require('assert');

class Node {
    constructor (data, next) {
        this.data = data
        this.next = next
    }
}

function createLinkCircle (n) {
    const head = new Node(1, null)
    let prev = head
    for (let i = 2; i < n + 1; i++) {
        prev.next = new Node(i, null)
        prev = prev.next
    }
    prev.next = head
    return { head, tail: prev }
}

function solution1 (n, m) {
    const { head, tail } = createLinkCircle(n)
    let current = head, prev = tail, count = 1
    while (current.next !== current) {
        if (count === m) {
            prev.next = current.next
            current = current.next
            count = 1
        } else {
            prev = current
            current = current.next
            count++
        }
    }
    return current.data
}

// 1 2 3 4 5 6 -> old
// 4 5   1 2 3 -> new
// old = (new + m - 1) % n + 1
function solution2 (n, m) {
    return n === 1 ? n : (solution2(n - 1, m) + m - 1) % n + 1
}

(function josephusCircle () {
    // solution1
    assert.equal(solution1(1, 1), 1)
    assert.equal(solution1(5, 1), 5)
    assert.equal(solution1(6, 3), 1)
    assert.equal(solution1(6, 8), 3)
    // solution2
    assert.equal(solution1(1, 1), 1)
    assert.equal(solution2(5, 1), 5)
    assert.equal(solution2(6, 3), 1)
    assert.equal(solution2(6, 8), 3)
})()