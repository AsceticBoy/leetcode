/**
 * copyright by liudu
 * 
 * @time 2019-09-21
 * @author liudu
 * 
 * 跳跃表 (SkipList)
 * 
 * 结构:
 * 
 * 
 *  ------                                          ------                              ------
 * |      | - - - - - - - - - - - - - - - - - - -> |      | - - - - - - - - - - - - -> |      |
 * |      |                 ------                 |      |     ------                 |      |
 * | NULL | - - - - - - -> |      | - - - - - - -> | node | -> |      | - - - - - - -> | NULL |
 * |      |     ------     | node |     ------     |      |    | node |     ------     |      |
 * |      | -> | node | -> |      | -> | node | -> |      | -> |      | -> | node | -> |      |
 *  ------      ------      ------      ------      ------      ------      ------      ------
 * 
 * 说明:
 * 1、查找: O(logN)  插入: O(logN)  删除: O(logN)
 * 2、由于跳表在插入/删除节点时，不需要要考虑平衡问题(多次旋转平衡)，而只是通过概率性 RandomLevel 函数来计算 level, 所以比 AVL 等平衡树操作更加简单
 */

"use strict"

const { LinkNode, DoubleLinkedList } = require('../structure/doubly-linked-list')

class SkipListNode extends LinkNode {
    constructor (entity) {
        super()
        this.entity = entity
    }
}

class SkipNode {
    constructor (key, val, level) {
        this.key = key
        this.value = val
        // link_prev _ |      | _ link_next
        // link_prev _ | node | _ link_next
        // link_prev _ |      | _ link_next
        this.skipLink = new Array(level).fill().map(() => new SkipListNode(null))
    }
}

class SkipList {
    constructor ({ probability, maxLevel, comparator } = {}) {
        // 当前最大 level
        this.level = 0
        // 当前 skip node 数
        this.count = 0
        // 最大层高
        this.maxLevel = maxLevel || SkipList.MAX_LEVEL
        // 升 level 概率
        this.probability = probability || SkipList.RISE_PROBABILITY
        // 用一个数组来存储每个 level 的双向链表
        this.list = new Array(this.maxLevel).fill().map(() => new DoubleLinkedList())
        // 比较器
        this.comparator = comparator instanceof Function ? comparator : (m, n) => m - n
    }

    // 每升一级 level 的概率逐次降低
    randomLevel () {
        let level = 1 // 最低为 1
        while (Math.random() < this.probability)
            level++
        // 最大不超过 MAX_LEVEL
        return Math.min(level, this.maxLevel)
    }

    containsKey (key) {
        return this.get(key) !== null
    }

    put (key, val) {
        // 已经存在相应的 key
        if (this.containsKey(key)) {
            throw new Error('Current key is existed')
        }
        const level = this.randomLevel()
        if (level > this.level)
            this.level = level
        // 新建节点
        const node = new SkipNode(key, val, level)
        // 需要做的是遍历每层 level 链表，并找到当前节点该插入的位置，关联 prev 和 next
        let i = level - 1
        // 变更的插入节点
        let cp, mod = null
        // 最大 level 的头和尾巴开始找
        let start = this.list[i].head
        let end = this.list[i].tail
        // 遍历每层
        for (; i >= 0; i--) {
            let pos = null
            for (; start !== null; start = start.next) {
                // 找最近的比 key 大/相等的节点
                cp = this.comparator(start.entity.key, key)
                if (cp >= 0) {
                    pos = start
                    break
                }
            }
            start = pos ? pos.prev : end
            mod = new SkipListNode(node)
            // 把需要插入的节点放到 level link 的合适位置
            this.list[i].add(mod, start)
            // skipNode skipList 也插入正确位置
            node.skipLink[i] = mod
            // start / end 不再需要从头尾重新开始了
            if (i > 0) {
                start = start ? start.entity.skipLink[i - 1] : this.list[i - 1].head
                end = pos ? pos.entity.skipLink[i - 1] : this.list[i - 1].tail
            }
        }
        this.count++
        return node.value
    }

    remove (key) {
        let cp, mod = null
        let i = Math.max(this.level - 1, 0)
        let start = this.list[i].head
        let end = this.list[i].tail
        // 遍历每层
        for (; i >= 0; i--) {
            let pos = null
            for (; start !== null; start = start.next) {
                cp = this.comparator(start.entity.key, key)
                if (cp > 0) {
                    pos = start
                    break
                } else if (cp === 0) {
                    // 找到了需要删除的节点
                    for (let j = 0; j <= i; j++) {
                        mod = start.entity.skipLink[j]
                        // 解除相关引用
                        this.list[j].remove(mod)
                        // 如果为空，需要减 level
                        if (this.list[j].isEmpty())
                            this.level--
                    }
                    this.count--
                    return start.entity.value
                }
            }
            start = pos ? pos.prev : end
            if (i > 0) {
                start = start ? start.entity.skipLink[i - 1] : this.list[i - 1].head
                end = pos ? pos.entity.skipLink[i - 1] : this.list[i - 1].tail
            }
        }
        return null
    }

    get (key) {
        let cp
        let i = Math.max(this.level - 1, 0)
        let start = this.list[i].head
        let end = this.list[i].tail
        // 遍历每层
        for (; i >= 0; i--) {
            let pos = null
            for (; start !== null; start = start.next) {
                cp = this.comparator(start.entity.key, key)
                if (cp > 0) {
                    pos = start
                    break
                } else if (cp === 0) {
                    return start.entity
                }
            }
            start = pos ? pos.prev : end
            if (i > 0) {
                start = start ? start.entity.skipLink[i - 1] : this.list[i - 1].head
                end = pos ? pos.entity.skipLink[i - 1] : this.list[i - 1].tail
            }
        }
        return null
    }

    firstNode () {
        return this.list[0].head !== null ? this.list[0].head.entity : null
    }

    lastNode () {
        return this.list[0].tail !== null ? this.list[0].tail.entity : null
    }

    // 对应 key node 的前一个
    before (key) {
        let cp
        let i = Math.max(this.level - 1, 0)
        let start = this.list[i].head
        let end = this.list[i].tail
        // 遍历每层
        for (; i >= 0; i--) {
            let pos = null
            for (; start !== null; start = start.next) {
                cp = this.comparator(start.entity.key, key)
                if (cp > 0) {
                    pos = start
                    break
                } else if (cp === 0) {
                    // 如果是直接和 key 匹配的话，直接返回
                    return start.entity
                }
            }
            start = pos ? pos.prev : end
            if (i > 0) {
                start = start ? start.entity.skipLink[i - 1] : this.list[i - 1].head
                end = pos ? pos.entity.skipLink[i - 1] : this.list[i - 1].tail
            } else
                return start ? start.entity : null
        }
        return null
    }

    // 对应 key node 的后一个
    after (key) {
        let cp
        let i = Math.max(this.level - 1, 0)
        let start = this.list[i].head
        let end = this.list[i].tail
        // 遍历每层
        for (; i >= 0; i--) {
            let pos = null
            for (; start !== null; start = start.next) {
                cp = this.comparator(start.entity.key, key)
                if (cp > 0) {
                    pos = start
                    break
                } else if (cp === 0) {
                    // 如果是直接和 key 匹配的话，直接返回
                    return start.entity
                }
            }
            start = pos ? pos.prev : end
            if (i > 0) {
                start = start ? start.entity.skipLink[i - 1] : this.list[i - 1].head
                end = pos ? pos.entity.skipLink[i - 1] : this.list[i - 1].tail
            } else
                return pos ? pos.entity : null
        }
        return null
    }

    clear () {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i] = new DoubleLinkedList()
        }
        this.level = 0
        this.count = 0
    }

    isEmpty () {
        return this.count <= 0
    }

    iterator () { return this[Symbol.iterator]() }

    [Symbol.iterator] () {
        let current = this.list[0].head
        return {
            hasNext () {
                return current !== null
            },
            next () {
                const result = this.hasNext()
                    ? { value: { key: current.entity.key, value: current.entity.value }, done: false }
                    : { value: null, done: true }
                current = this.hasNext() ? current.next : null
                return result
            }
        }
    }
}

// 跳表节点最高层数
SkipList.MAX_LEVEL = 1 << 5
// 计算跳表节点上升 Level
SkipList.RISE_PROBABILITY = 0.25

module.exports = SkipList