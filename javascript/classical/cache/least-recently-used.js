/**
 * copyright by liudu
 * 
 * @time 2019-09-19
 * @author liudu
 * 
 * LRU算法 (Least Recently Used)
 * 
 * 描述:
 * 根据数据的历史访问记录来淘汰数据，淘汰那些好久没被访问的，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”
 * 
 * 结构:
 *                                     head
 *                                   --------
 *                                  |  node  |
 *                                   --------
 *                                   p |  | n
 *                                   --------
 *                                  |  node  |
 *                                   --------
 *                                   p |  | n
 *                                   --------
 *                         -------> |  node  |
 *                        |          --------
 *  -------- --------     |          p |  | n
 * |  key1  |  node  |----           --------
 *  -------- --------       |-----> |  node  |
 * |  key2  |  node  |------         --------
 *  -------- --------                p |  | n
 * |  key3  |  node  |----           --------
 *  -------- --------     |-------> |  node |
 *       HashMap                     --------
 *                                   p |  | n
 *                                   --------
 *                                  |  node  |
 *                                   --------
 *                                     tail
 *                                (Double Linked)
 * 
 * 为啥不用顺序存储结构：因为当中间节点再次访问需要更新到头部时，需要将 head -> current 之间的节点也需要整体平移，效率低
 * 
 * 
 * 说明:
 * 优势：如果存在稳定热点数据访问，LRU的效果会很好
 * 劣势：如果存在偶发性、周期性的数据，LRU命中率会急剧下架，缓存污染的情况会比较严重
 * 
 * 参考：
 * https://blog.bcmeng.com/post/lru-lfu.html
 */

"use strict"

const assert = require('assert').strict
const HashMap = require('../structure/hash-map')
const { LinkNode, DoubleLinkedList } = require('../structure/doubly-linked-list')

class LRUNode extends LinkNode {
    constructor (key, val) {
        super()
        this.key = key
        this.value = val
    }
}

class LRUCache {
    constructor (capacity) {
        // <key, LRUNode> 保证 O(1) 的效率
        this.table = new HashMap()
        // 容器最大限制
        this.capacity = capacity || LRUCache.DEFAULT_MAX_CAPACITY
        // 数据节点链表
        this.recentLink = new DoubleLinkedList()
        // 当前链表节点数
        this.size = 0
    }

    put (key, val) {
        const node = this.table.get(key)
        if (node) {
            // 已经存在更新位置
            node.value = val
            this.refreshNode(node)
        } else {
            ++this.size
            // 超过了 capacity
            if (this.size > this.capacity) {
                const tail = this.recentLink.remove(this.recentLink.tail)
                this.table.remove(tail.key)
                --this.size
            }
            // 加入一个新的节点到头部
            const recent = new LRUNode(key, val)
            this.recentLink.add(recent, null)
            this.table.put(key, recent)
        }
    }

    delete (key) {
        const node = this.table.get(key)
        if (node) {
            const tail = this.recentLink.remove(node)
            this.table.remove(tail.key)
            --this.size
        }
        return node ? true : false
    }

    get (key) {
        const node = this.table.get(key)
        if (node) {
            this.refreshNode(node)
        }
        return node ? node.value : null
    }

    refreshNode (node) {
        // 已经在头部就不需要更新
        if (this.recentLink.head === node)
            return node.key
        // 先移除，在添加
        this.recentLink.remove(node)
        this.recentLink.add(node, null)
        return node.key
    }
}

LRUCache.DEFAULT_MAX_CAPACITY = 1 << 3;

(function () {
    let h, t, h2t, t2h
    const cache = new LRUCache()

    cache.put('case1', 'case1')
    assert.equal(cache.table.containsKey('case1'), true)

    cache.put('case2', 'case2')
    assert.equal(cache.table.containsKey('case2'), true)

    cache.put('case3', 'case3')
    assert.equal(cache.table.containsKey('case3'), true)

    cache.put('case4', 'case4')
    assert.equal(cache.table.containsKey('case4'), true)

    cache.put('case5', 'case5')
    assert.equal(cache.table.containsKey('case5'), true)

    cache.put('case6', 'case6')
    assert.equal(cache.table.containsKey('case6'), true)

    cache.put('case7', 'case7')
    assert.equal(cache.table.containsKey('case7'), true)

    cache.put('case8', 'case8')
    assert.equal(cache.table.containsKey('case8'), true)

    assert.equal(cache.recentLink.head.value, 'case8')
    assert.equal(cache.recentLink.tail.value, 'case1')

    h = cache.recentLink.head; t = cache.recentLink.tail; h2t = []; t2h = [];
    do {
        h2t.push(h.value)
        t2h.push(t.value)  
    } while ((h = h.next) !== null && (t = t.prev) !== null)

    assert.deepStrictEqual(h2t, [ 'case8', 'case7', 'case6', 'case5', 'case4', 'case3', 'case2', 'case1' ])
    assert.deepStrictEqual(t2h, [ 'case1', 'case2', 'case3', 'case4', 'case5', 'case6', 'case7', 'case8' ])

    // 移除第一个
    cache.put('case9', 'case9')
    assert.equal(cache.table.containsKey('case9'), true)
    assert.equal(cache.table.containsKey('case1'), false)

    assert.equal(cache.recentLink.head.value, 'case9')
    assert.equal(cache.recentLink.tail.value, 'case2')

    h = cache.recentLink.head; t = cache.recentLink.tail; h2t = []; t2h = [];
    do {
        h2t.push(h.value)
        t2h.push(t.value)  
    } while ((h = h.next) !== null && (t = t.prev) !== null)

    assert.deepStrictEqual(h2t, [ 'case9', 'case8', 'case7', 'case6', 'case5', 'case4', 'case3', 'case2' ])
    assert.deepStrictEqual(t2h, [ 'case2', 'case3', 'case4', 'case5', 'case6', 'case7', 'case8', 'case9' ])

    // 更新
    assert.equal(cache.get('case6'), 'case6')
    assert.equal(cache.recentLink.head.value, 'case6')
    assert.equal(cache.recentLink.tail.value, 'case2')

    h = cache.recentLink.head; t = cache.recentLink.tail; h2t = []; t2h = [];
    do {
        h2t.push(h.value)
        t2h.push(t.value)  
    } while ((h = h.next) !== null && (t = t.prev) !== null)

    assert.deepStrictEqual(h2t, [ 'case6', 'case9', 'case8', 'case7', 'case5', 'case4', 'case3', 'case2' ])
    assert.deepStrictEqual(t2h, [ 'case2', 'case3', 'case4', 'case5', 'case7', 'case8', 'case9', 'case6' ])

    // 删除
    assert.equal(cache.delete('case7'), true)
    assert.equal(cache.table.containsKey('case7'), false)
    assert.equal(cache.size, 7)

    h = cache.recentLink.head; t = cache.recentLink.tail; h2t = []; t2h = [];
    do {
        h2t.push(h.value)
        t2h.push(t.value)  
    } while ((h = h.next) !== null && (t = t.prev) !== null)

    assert.deepStrictEqual(h2t, [ 'case6', 'case9', 'case8', 'case5', 'case4', 'case3', 'case2' ])
    assert.deepStrictEqual(t2h, [ 'case2', 'case3', 'case4', 'case5', 'case8', 'case9', 'case6' ])
        
}())

