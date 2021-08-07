/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的
 * 
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 * 
 * 输入：l1 = [], l2 = []
 * 输出：[]
 * 
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 */

'use strict'

const assert = require('assert');

const { LinkNode, LinkedList } = require('./classical/structure/doubly-linked-list');

function solution (linkedList1, linkedList2) {
    if (linkedList1.head && linkedList2.head) {
        let min = linkedList1.head.data >= linkedList2.head.data ? linkedList2.head : linkedList1.head;
        let max = min === linkedList2.head ? linkedList1.head : linkedList2.head;
        const head = min === linkedList2.head ? linkedList2 : linkedList1;

        while (min) {
            if (min.next && (min.next.data <= max.data)) {
                min = min.next;
                continue;
            }
            const next = min.next;
            min.next = max;
            min = next;
            [min, max] = [max, min];
        }
        return head;
    } else {
        return linkedList1.head ? linkedList1 : linkedList2
    }
}


(function mergeTwoSorted () {
    const linkedList1 = new LinkedList();
    const linkedList2 = new LinkedList();
    const linkedList3 = new LinkedList();
    const linkedList4 = new LinkedList();

    linkedList1
        .add(new LinkNode(1), null)
        .add(new LinkNode(2), new LinkNode(1))
        .add(new LinkNode(4), new LinkNode(2));

    linkedList2
        .add(new LinkNode(1), null)
        .add(new LinkNode(3), new LinkNode(1))
        .add(new LinkNode(4), new LinkNode(3));

    linkedList3
        .add(new LinkNode(1), null)
        .add(new LinkNode(2), new LinkNode(1))
        .add(new LinkNode(9), new LinkNode(2));

    linkedList4
        .add(new LinkNode(4), null)
        .add(new LinkNode(5), new LinkNode(4))
        .add(new LinkNode(6), new LinkNode(5));

    assert.deepEqual(solution(linkedList1, linkedList2).toArray(), [1, 1, 2, 3, 4, 4])
    assert.deepEqual(solution(linkedList3, linkedList4).toArray(), [1, 2, 4, 5, 6, 9])
    assert.deepEqual(solution(new LinkedList(), new LinkedList()).toArray(), [])
    assert.deepEqual(solution(new LinkedList(), new LinkedList().add(new LinkNode(1), null)).toArray(), [1])
})()