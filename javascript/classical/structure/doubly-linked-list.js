/**
 * copyright by liudu
 * 
 * @time 2019-09-21
 * @author liudu
 * 
 * 双向链表 (DoubleLinkedList)
 * 
 * 结构:
 * 
 *                head                                               tail
 *        prev  -------   prev   -------   prev   -------   prev   -------
 *  null  <--  | node1 |  <-->  | node2 |  <-->  | node3 |  <-->  | node4 |  -->  null
 *              -------   next   -------   next   -------   next   -------  next
 * 
 * 
 * 说明:
 * 查找: O(n)  插入: O(1)  删除: O(1)
 */

"use strict"

class LinkNode {
    constructor () {
        this.prev = null
        this.next = null
    }
}

class DoubleLinkedList {
    constructor () {
        this.head = null
        this.tail = null
    }

    verify (node) {
        if (node instanceof LinkNode)
            return true
        return node === null
    }

    isEmpty () {
        return this.head === null && this.tail === null
    }

    /**
     * 头插、尾插、中间插
     * @param {*} insert 需要增加的节点
     * @param {*} before 节点前一个节点
     */
    add (insert, before) {
        if (![insert, before].every(this.verify))
            throw Error('Please Use Effective LinkNode')
        // 是否是头部插入
        if (before) {
            if (before.next) {
                // 中间插
                before.next.prev = insert
                insert.next = before.next
                before.next = insert
                insert.prev = before
            } else {
                if (this.tail) {
                    this.tail.next = insert
                    insert.prev = this.tail
                } else {
                    this.head = insert
                    this.head.prev = null
                }
                this.tail = insert
                this.tail.next = null
            }
        } else {
            // 头插
            if (this.head) {
                this.head.prev = insert
                insert.next = this.head
            } else {
                this.tail = insert
                this.tail.next = null
            }
            this.head = insert
            this.head.prev = null
        }
        return insert
    }

    remove (node) {
        if (!this.verify(node))
            throw Error('Please Use Effective LinkNode')
        // 中间节点
        if (node.prev && node.next) {
            node.prev.next = node.next
            node.next.prev = node.prev
        } else {
            if (this.head === node) {
                this.head = node.next
                if (node.next)
                    node.next.prev = null
                else
                    this.tail = null
            }
            if (this.tail === node) {
                this.tail = node.prev
                if (node.prev)
                    node.prev.next = null
                else
                    this.head = null
            }
        }
        node.prev = node.next = null
        return node
    }

    // TODO
    get () {}
}

module.exports = {
    LinkNode,
    DoubleLinkedList
}

