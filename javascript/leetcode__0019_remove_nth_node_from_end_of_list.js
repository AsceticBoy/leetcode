/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 进阶：你能尝试使用一趟扫描实现吗？
 * 
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 输入：head = [1], n = 1
 * 输出：[]
 * 
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 */

'use strict'

const assert = require('assert');

const { LinkNode, LinkedList } = require('./classical/structure/doubly-linked-list')

// nth >= 1
function solution (linkList, nth) {
    const stack = [];
    let nthNode;
    let current = linkList.head;
    
    while (current) {
        stack.unshift(current);
        current = current.next;
    }

    if (nth === stack.length) return new LinkedList();
    
    for (let i = 0; i < stack.length; i++) {
        if (i === nth - 1) nthNode = stack[i];
        if (i === nth) {
            stack[i].next = nthNode.next;
            break;
        }
    }
    return linkList
}


(function removeNthFromEnd () {
    const linkedList1 = new LinkedList();
    const linkedList2 = new LinkedList();
    const linkedList3 = new LinkedList();

    linkedList1
        .add(new LinkNode(1), null)
        .add(new LinkNode(2), new LinkNode(1))
        .add(new LinkNode(3), new LinkNode(2))
        .add(new LinkNode(4), new LinkNode(3))
        .add(new LinkNode(5), new LinkNode(4));

    linkedList2
        .add(new LinkNode(1), null);

    linkedList3
        .add(new LinkNode(1), null)
        .add(new LinkNode(2), new LinkNode(1));
    
    assert.deepEqual(solution(linkedList1, 2).toArray(), [1, 2, 3, 5])
    assert.deepEqual(solution(linkedList2, 1).toArray(), [])
    assert.deepEqual(solution(linkedList3, 1).toArray(), [1])
})()