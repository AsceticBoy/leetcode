/**
 * copyright by liudu
 * 
 * @from Leetcode
 * @time 2019-09-01
 * @author liudu
 * 
 * 两数相加：
 * 
 * 描述：
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和
 * 
 * 说明：
 * Input: 
 * 342: (3 -> 4 -> 2)
 * 465: (5 -> 6 -> 4)
 * 342 + 465 = 807
 * Output:
 * 807: (7 -> 0 -> 8)
 * 
 * 注解：
 * 假设除了数字 0 之外，这两个数都不会以 0 开头
 */

"use strict"

const assert = require('assert').strict;

class LinkNode {
    constructor (value, next) {
        this.value = value
        this.next = next
    }
}

class SinglyLinkList {
    constructor (number = 0) {
        this.number = number
        this.head = null
        this.tail = null
    }

    calcLinks (number = this.number) {
        let last = null
        let node = null
        let i = 0
        do {
            node = new LinkNode(number % 10, null)

            if (i === 0) {
                this.head = this.tail = node
            } else {
                this.tail = node
            }

            if (last)
                last.next = node

            last = node
            number = Math.floor(number / 10)
            i++
        } while (number)
        return this
    }

    normalize () {
        let self = this.head
        let digitals = []
        while (self) {
            digitals.push(self.value)
            self = self.next
        }
        return digitals
    }
}

function solution (...numbers) {
    let less = 0
    let pointer = numbers.map(node => node.head)
    const target = new SinglyLinkList()
    for (let i = 0; pointer.length; i++) {
        // 当前位上的值等于上一位剩余 + 当前位
        const sum = pointer.reduce((total, cur) => cur ? (total + cur.value) : total, less)

        const node = new LinkNode(sum % 10, null)

        if (i === 0) {
            target.head = target.tail = node
        } else {
            target.tail.next = node
            target.tail = node
        }

        less = Math.floor(sum / 10)
        // 所有 linknode 往前走一步
        pointer = pointer.reduce(
            (nodes, cur) => cur.next ? nodes.concat(cur.next) : nodes, []
        )   
    }
    return target.normalize()
}

(function addTwoNumbers () {
    // 342 + 465 = 807
    assert.deepStrictEqual(
        solution(
            new SinglyLinkList(342).calcLinks(),
            new SinglyLinkList(465).calcLinks(),
        ),
        new SinglyLinkList(807).calcLinks().normalize()
    )
    // 76 + 0 = 76
    assert.deepStrictEqual(
        solution(
            new SinglyLinkList(76).calcLinks(),
            new SinglyLinkList(0).calcLinks(),
        ),
        new SinglyLinkList(76).calcLinks().normalize()
    )
    // 1001 + 254 = 1255
    assert.deepStrictEqual(
        solution(
            new SinglyLinkList(1001).calcLinks(),
            new SinglyLinkList(254).calcLinks(),
        ),
        new SinglyLinkList(1255).calcLinks().normalize()
    )
    // 2763 + 3846 + 92 = 6701
    assert.deepStrictEqual(
        solution(
            new SinglyLinkList(2763).calcLinks(),
            new SinglyLinkList(3846).calcLinks(),
            new SinglyLinkList(92).calcLinks(),
        ),
        new SinglyLinkList(6701).calcLinks().normalize()
    )
})()