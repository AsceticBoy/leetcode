/**
 * copyright by liudu
 * 
 * @time 2019-09-19
 * @author liudu
 * 
 * LFU算法 (Least Frequently Used)
 * 
 * 描述：
 * 根据数据的历史访问频率来淘汰数据，淘汰历史访问频次少的，如果次数相同，按时间顺序淘汰，其核心思想是“如果数据过去被访问多次，那么将来被访问的频率也更高”
 * 
 * 结构:
 *                                      head
 *                                   ----------         --------
 *                                  | 1frqNode |  -->  | dNode4 |
 *                                   ----------         --------
 *                                    p |  | n
 *                                   ----------         --------     n     --------
 *                                  | 2frqNode |  -->  | dNode5 | < --- > | dNode7 |
 *                                   ----------         --------     p     --------
 *                                    p |  | n
 *                                   ----------         --------     n     --------     n     --------
 *                         -------> | 3frqNode |  -->  | dNode6 | < --- > | dNode1 | < --- > | dNode8 |
 *                        |          ----------         --------     p     --------     p     --------
 *  -------- --------     |           p |  | n
 * |  key1  | dNode1 |----           ----------         --------
 *  -------- --------       |-----> | 4frqNode |  -->  | dNode2 |
 * |  key2  | dNode2 |------         ----------         --------
 *  -------- --------                 p |  | n
 * |  key3  | dNode3 |----           ----------         --------
 *  -------- --------     |-------> | 5frqNode |  -->  | dNode3 |
 *       HashMap                     ----------         --------
 *                                    p |  | n
 *                                   ----------         --------     n     ---------
 *                                  | 6frqNode |  -->  | dNode9 | < --- > | dNode10 |
 *                                   ----------         --------     p     ---------
 *                                      tail
 *                                 (Double Linked)            (Double Linked)
 * 
 * 说明:
 * 优势：因为记录了历史的访问频次，所以能有效避免偶发性、周期性导致的缓存命中率下降的问题
 * 劣势：同样是因为记录了访问频次，如果数据访问模式发生变化，需要较长时间才能被调整过来（刷掉原先的记录需要大量的访问）
 * 
 * 参考：
 * http://dhruvbird.com/lfu.pdf
 */

"use strict"

const assert = require('assert').strict
const HashMap = require('../structure/hash-map')
const { LinkNode, DoubleLinkedList } = require('../structure/doubly-linked-list')

// 数据节点
class LFUNode extends LinkNode {
    constructor (key, val) {
        super()
        this.key = key
        this.value = val
        // 指向频次记录节点
        this.freqNode = null
    }
}

// 频次记录节点
class LFUFrequentNode extends LinkNode {
    constructor (freq) {
        super()
        // 频次
        this.freq = freq
        // 当前频次的 数据节点key 链表
        this.dataKeyLink = new DoubleLinkedList()
    }
}

class LFUCache {
    constructor (capacity) {
        // <key, LFUNode> 保证 O(1) 的效率
        this.table = new HashMap()
        // 容器最大限制
        this.capacity = capacity || LFUCache.DEFAULT_MAX_CAPACITY
        // 频次节点链表
        this.freqLink = new DoubleLinkedList()
        // 节点数量
        this.size = 0
    }

    put (key, val) {
        const node = this.table.get(key)
        if (node) {
            node.value = val
            // 提升频率
            this.upFrequency(node)
        } else {
            ++this.size
            // 新增节点，更新频次
            const recent = new LFUNode(key, val)
            this.table.put(key, recent)
            this.upFrequency(recent)
            // 丢弃检查
            if (this.size > this.capacity) {
                --this.size
                // 频次最低且时间最早的 O(1)
                const rmFreq = this.freqLink.head // head -> tail freq+
                const rmData = this.freqLink.head.dataKeyLink.tail // head -> tail old+
                this.removeInvalid(rmFreq, rmData)
                this.table.remove(rmData.key)
            }
        }
    }

    delete (key) {
        const node = this.table.get(key)
        if (node) {
            this.removeInvalid(node.freqNode, node)
            this.table.remove(node.key)
            --this.size
        }
        return node ? true : false
    }

    get (key) {
        const node = this.table.get(key)
        if (node) {
            this.upFrequency(node)
        }
        return node ? node.value : null
    }

    upFrequency (node) {
        let currentFreqNode = node.freqNode, nextFreqNode, nextFrequent
        // 之前已经有低频次节点了
        if (currentFreqNode) {
            nextFreqNode = currentFreqNode.next
            nextFrequent = currentFreqNode.freq + 1
        } else {
            // 第一次访问
            nextFreqNode = this.freqLink.head
            nextFrequent = 1
        }
        // 下一个频次节点不存在或者下一个频次节点的频次和 nextFrequent 不符
        if (nextFreqNode === null || nextFrequent !== nextFreqNode.freq) {
            const freqNode = new LFUFrequentNode(nextFrequent)
            // 有频次节点: 往 currentFreqNode 后加
            // 没频次节点: 往 this.freqLink 头部加
            if (currentFreqNode) {
                nextFreqNode = this.freqLink.add(freqNode, currentFreqNode)
            } else {
                nextFreqNode = this.freqLink.add(freqNode, null)
            }
        }
        node.freqNode = nextFreqNode
        // 先在原频次节点中移除相应的数据节点
        if (currentFreqNode)
            this.removeInvalid(currentFreqNode, node)
        // 再把数据节点加入到当前频次节点头部
        nextFreqNode.dataKeyLink.add(node, null)
    }

    removeInvalid (freqNode, dataNode) {
        // 先从频次节点中移除数据节点
        freqNode.dataKeyLink.remove(dataNode)
        // 如果当前频次节点是空节点，需要移除，腾出空间
        if (freqNode.dataKeyLink.isEmpty())
            this.freqLink.remove(freqNode)
    }
}

LFUCache.DEFAULT_MAX_CAPACITY = 1 << 3;

(function () {
    const cache = new LFUCache(4)

    cache.put('case1', 'case1')
    assert.equal(cache.table.containsKey('case1'), true)

    cache.put('case1', 'case1')
    assert.equal(cache.table.containsKey('case1'), true)

    cache.put('case2', 'case2')
    assert.equal(cache.table.containsKey('case2'), true)

    assert.equal(cache.freqLink.head.freq, 1)
    assert.equal(cache.freqLink.head.dataKeyLink.head.key, 'case2')
    assert.equal(cache.freqLink.head.dataKeyLink.tail.key, 'case2')
    assert.equal(cache.freqLink.tail.freq, 2)
    assert.equal(cache.freqLink.tail.dataKeyLink.head.key, 'case1')
    assert.equal(cache.freqLink.tail.dataKeyLink.tail.key, 'case1')

    cache.delete('case1')
    assert.equal(cache.table.containsKey('case1'), false)

    assert.equal(cache.freqLink.head.freq, 1)
    assert.equal(cache.freqLink.tail.freq, 1)
    assert.equal(cache.freqLink.head.dataKeyLink.head.key, 'case2')
    assert.equal(cache.freqLink.head.dataKeyLink.tail.key, 'case2')

    cache.get('case2')
    assert.equal(cache.freqLink.head.freq, 2)
    assert.equal(cache.freqLink.tail.freq, 2)
    assert.equal(cache.freqLink.head.dataKeyLink.head.key, 'case2')
    assert.equal(cache.freqLink.head.dataKeyLink.tail.key, 'case2')

    cache.put('case3', 'case3')
    assert.equal(cache.table.containsKey('case3'), true)

    cache.put('case4', 'case4')
    assert.equal(cache.table.containsKey('case4'), true)

    cache.put('case5', 'case5')
    cache.put('case5', 'case5')
    cache.get('case5')
    assert.equal(cache.table.containsKey('case5'), true)

    assert.equal(cache.freqLink.head.freq, 1)
    assert.equal(cache.freqLink.head.dataKeyLink.head.key, 'case4')
    assert.equal(cache.freqLink.head.dataKeyLink.tail.key, 'case3')
    assert.equal(cache.freqLink.head.next.freq, 2)
    assert.equal(cache.freqLink.head.next.dataKeyLink.head.key, 'case2')
    assert.equal(cache.freqLink.head.next.dataKeyLink.tail.key, 'case2')
    assert.equal(cache.freqLink.tail.freq, 3)
    assert.equal(cache.freqLink.tail.dataKeyLink.head.key, 'case5')
    assert.equal(cache.freqLink.tail.dataKeyLink.tail.key, 'case5')

    cache.put('case6', 'case6')
    assert.equal(cache.table.containsKey('case6'), true)
    assert.equal(cache.freqLink.head.freq, 1)
    assert.equal(cache.freqLink.head.dataKeyLink.head.key, 'case6')
    assert.equal(cache.freqLink.head.dataKeyLink.tail.key, 'case4')

    cache.get('case2')
    assert.equal(cache.table.containsKey('case2'), true)
    assert.equal(cache.freqLink.head.freq, 1)
    assert.equal(cache.freqLink.head.dataKeyLink.head.key, 'case6')
    assert.equal(cache.freqLink.head.dataKeyLink.tail.key, 'case4')
    assert.equal(cache.freqLink.head.next.freq, 3)
    assert.equal(cache.freqLink.tail.freq, 3)
    assert.equal(cache.freqLink.tail.dataKeyLink.head.key, 'case2')
    assert.equal(cache.freqLink.tail.dataKeyLink.tail.key, 'case5')

}())
