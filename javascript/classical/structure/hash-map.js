/**
 * copyright by liudu
 * 
 * @time 2019-09-17
 * @author liudu
 * 
 * 散列表 (HashMap)
 * 
 * 结构：
 * |  -------  | next  -------  next  -------  next  -------
 * | | node1 | |  ->  | node7 |  ->  | node8 |  ->  | node9 |
 * |  -------  |       -------        -------        -------
 * |  -------  |
 * | |       | |
 * |  -------  |
 * |  -------  |
 * | | node3 | |
 * |  -------  |
 * |  -------  | next  --------
 * | | node4 | |  ->  | node10 |
 * |  -------  |       --------
 * |  -------  |
 * | |       | |
 * |  -------  |
 * |  -------  |
 * | | node6 | |
 * |  -------  |
 * 
 * jdk8 在链表的基础上做了进一步优化：在链表节点数大于 TREEIFY_THRESHOLD 时，会把链表转化为红黑树，进一步加快查询速度
 * 
 * 说明：
 * 1、在没有哈希冲突的情况下: 查找: O(1)  插入: O(1)  删除: O(1)
 * 2、hashCode 函数和负载因子是影响 HashMap 性能的关键，同时扩容操作也是非常耗费性能的
 */

"use strict"

// 无符号 INT 最大值
const UNSIGNED_INT_MAX = 0xFFFFFFFF

// 生成 hash 的范围在 INT 范围以内
const hash = new class {
    /**
     * @deprecated
     */
    prepareV8Hash (val) {
        let hash = 0
        const str = val.toString()
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
            hash += (hash << 10);
            hash ^= (hash >> 6);
        }
        return hash
    }

    hashString (val) {
        let hash = 0
        const str = val.toString()
        for (let i = 0; i < str.length; i++) {
            hash = (((hash << 5) - hash) + str.charCodeAt(i)) & UNSIGNED_INT_MAX
        }
        return hash
    }

    hashObject (obj) {
        let hash = 0
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                hash += this.hashString(key + this.getCode(obj[key]))
        }
        return hash
    }

    getCode (val) {
        const typedef = typeof val
        switch (typedef) {
            case 'object':
                return this.hashString(typedef) + this.hashObject(val)
            case 'symbol':
            case 'string':
            case 'number':
            case 'boolean':
                return this.hashString(typedef) + this.hashString(val)
            default:
                return 0
        }
    }
}

class Node {
    constructor (hash, key, val, next) {
        this.hash = hash
        this.key = key
        this.value = val
        this.next = next
    }
}
// jdk8 暂时没实现 链表 -> 树 的过程
class HashMap {
    constructor ({ capacity, loadFactor } = {}) {
        if (capacity && capacity > HashMap.MAXIMUM_CAPACITY)
            capacity = HashMap.MAXIMUM_CAPACITY

        // 用于扩容的负载因子
        this.loadFactor = loadFactor || HashMap.DEFAULT_LOAD_FACTOR

        // 初始的阈值即容量
        this.threshold = capacity ? this.tableSizeFor(capacity) : 0

        // 存储的表
        this.table = null
        // 大小
        this.size = 0
    }

    static hashCode (key) {
        let code = hash.getCode(key)
        return code ^ code >>> 16
    }

    // 根据容量返回最接近的2次方数值
    tableSizeFor (cap) {
        // 避免 4 -> 8
        let n = cap - 1
        n |= n >>> 1
        n |= n >>> 2
        n |= n >>> 4
        n |= n >>> 8
        n |= n >>> 16
        return (n < 0) ? 1 : (n > HashMap.MAXIMUM_CAPACITY) ? HashMap.MAXIMUM_CAPACITY : n + 1
    }

    /**
     * Map.get
     * @param key 指定 key
     * @return 指定 key 对应的 value
     */
    get (key) {
        let tab, first, e, n
        const hash = HashMap.hashCode(key)
        if ((tab = this.table) !== null && (n = tab.length) > 0
            // tab[(n - 1) & hash] 保障了下标一定在 n 范围内
            && (first = tab[(n - 1) & hash]) !== null) {
                // 第一个就查到了
                if (first.hash === hash && first.key === key)
                    return first.value
                // 链表查找
                if ((e = first.next) !== null) {
                    do {
                        if (e.hash === hash && e.key === key)
                            return e.value
                    } while ((e = e.next) !== null)
                }
        }
        return null
    }

    /**
     * Map.put
     * @param key 指定key
     * @param value 指定value
     * @param onlyIfAbsent 是否需要替换之前的值
     * @return 之前的值，如果不存在则返回 null
     */
    put (key, value, onlyIfAbsent) {
        let tab, p, i, n
        const hash = HashMap.hashCode(key)
        // 当前table为空
        if ((tab = this.table) === null || (n = tab.length) === 0)
            n = (tab = this.resize()).length
        // 当前索引下还不存在内容
        if ((p = tab[i = (n - 1) & hash]) === null)
            tab[i] = new Node(hash, key, value, null)
        else {
            let e = null
            // 位置上已经存在，且hash相同
            if (p.hash === hash && p.key === key) {
                e = p
            } else {
                do {
                    // 找到链表最后一条并插入
                    if ((e = p.next) === null) {
                        p.next = new Node(hash, key, value, null)
                        break
                    }
                    // 或者已经找到相同的 hash，key
                    if (e.hash === hash && e.key === key)
                        break
                    p = e
                } while (1)
            }
            // 处理是否需要替换相同 hash，key 的情况
            if (e !== null) {
                let oldValue = e.value
                // 需要被替换或者原先就是空值
                if (!onlyIfAbsent || oldValue === null)
                    e.value = value
                return oldValue
            }
        }
        // 增加size，并检查是否超过 threshold
        if (++this.size > this.threshold)
            this.resize()
        return null
    }

    /**
     * Map.remove
     * @param key 指定 key
     * @return 指定 key 之前对应的 value
     */
    remove (key) {
        let tab, n, p, index
        const hash = HashMap.hashCode(key)
        // 存在的情况
        if ((tab = this.table) !== null && (n = tab.length) > 0
            && (p = tab[index = (n - 1) & hash]) !== null) {
                let node = null, e
                if (p.hash === hash && p.key === key)
                    node = p
                else if ((e = p.next) !== null) {
                    do {
                        if (e.hash === hash && e.key === key) {
                            node = e
                            break
                        }
                        p = e // previous
                    } while ((e = p.next) !== null)
                }
                // 找到了相应的值
                if (node !== null) {
                    // 非链表 or 链表
                    if (node === p)
                        tab[index] = node.next;
                    else
                        p.next = node.next;

                    --this.size

                    return node
                }
            }
        return null
    }

    /**
     * Map.clear
     */
    clear () {
        let tab
        if ((tab = this.table) !== null && this.size > 0) {
            for (let i = 0; i < tab.length; i++) {
                tab[i] = null
            }
            this.size = 0
        }
    }

    /**
     * 是否包含指定的 key
     * @param {*} key 指定 key
     */
    containsKey (key) {
        return this.get(key) !== null
    }

    /**
     * 是否有 key 关联了 value
     * @param {*} val 指定 val
     */
    containsValue (val) {
        let tab, e
        if ((tab = this.table) !== null && this.size > 0) {
            for (let i = 0; i < tab.length; i++) {
                e = tab[i];
                while (e !== null) {
                    if (e.value === val)
                        return true;
                    e = e.next
                }
            }
        }
    }

    /**
     * 如果 size > threshold 需要给 table 扩容
     */
    resize () {
        const oldTab = this.table // 老的容器
        const oldCap = oldTab === null ? 0 : oldTab.length
        const oldThr = this.threshold
        let newCap, newThr = 0
        // 如果容器内已经存在
        if (oldCap > 0) {
            // 已经超过最大容量
            if (oldCap >= HashMap.MAXIMUM_CAPACITY) {
                this.threshold = Number.MAX_SAFE_INTEGER
                return oldTab
            } else if ((newCap = oldCap << 1) < HashMap.MAXIMUM_CAPACITY
                && oldCap >= HashMap.DEFAULT_INITIAL_CAPACITY) {
                    // 大于初始分配，但是不超过容量
                    newThr = oldThr << 1
            }
        } else if (oldThr > 0) {
            // 第一次用户分配了 initial capacity
            newCap = oldThr
        } else {
            // 第一次用户没有分配了 initial capacity
            newCap = HashMap.DEFAULT_INITIAL_CAPACITY
            // 阈值 = 负载因子 * 容量
            newThr = (HashMap.DEFAULT_LOAD_FACTOR * newCap) >> 0 // newCap 不会超过 int 大小，所以可以这么取整
        }
        if (newThr === 0) {
            let th = newCap * this.loadFactor
            // 新容量和新阈值都必须小于最大容量
            newThr = (newCap < HashMap.MAXIMUM_CAPACITY && th < HashMap.MAXIMUM_CAPACITY)
                ? (th >> 0) : Number.MAX_SAFE_INTEGER
        }
        this.threshold = newThr
        // 创建新容器
        this.table = new Array(newCap).fill(null)
        // 开始重置容器
        if (oldTab !== null) {
            for (let i = 0; i < oldCap; i++) {
                let tmp = null
                if ((tmp = oldTab[i]) !== null) {
                    // 扩展策略 (避免重新计算hash)
                    // hash1: x x x x x 0 1 0 1 0
                    // hash1 & (4 - 1): 2
                    //   x x x x x 0 1 0 1 0
                    //   0 0 0 0 0 0 0 0 1 1
                    // hash1 & (7 - 1): 2
                    //   x x x x x 0 1 0 1 0
                    //   0 0 0 0 0 0 0 1 1 1
                    // 结果：新索引 = 老索引
                    // --------------------------
                    // hash1: x x x x x 0 1 1 1 0
                    // hash1 & (4 - 1): 2
                    //   x x x x x 0 1 1 1 0
                    //   0 0 0 0 0 0 0 0 1 1
                    // hash1 & (7 - 1): 6
                    //   x x x x x 0 1 1 1 0
                    //   0 0 0 0 0 0 0 1 1 1
                    // 结果：新索引 = 老索引 + oldCap
                    oldTab[i] = null // 回收多余的节点
                    // 只有一个节点
                    if (tmp.next === null) {
                        // 注意：
                        // 这种策略下 oldTab -> newTab 要不原位置不动，要不原位置 + oldCap
                        // 所以只要 oldTab 索引不冲突，tmp.hash & (newCap - 1) 就不会冲突
                        this.table[tmp.hash & (newCap - 1)] = tmp
                    } else {
                        // 链表
                        let lowHead = null, lowTail = null
                        let highHead = null, highTail = null

                        do {
                            // 判断新增有效 hash 位是 0 还是 1
                            // 拆分出两条链表
                            if ((tmp.hash & oldCap ) === 0) {
                                if (lowTail === null)
                                    lowHead = tmp
                                else
                                    lowTail.next = tmp

                                lowTail = tmp
                            } else {
                                if (highTail === null)
                                    highHead = tmp
                                else
                                    highTail.next = tmp

                                highTail = tmp
                            }
                        } while ((tmp = tmp.next) !== null)
                        // 索引不变的
                        if (lowTail !== null) {
                            lowTail.next = null
                            this.table[i] = lowHead
                        }
                        //索引 + oldCap
                        if (highTail !== null) {
                            highTail.next = null
                            this.table[i + oldCap] = highHead
                        }
                    }
                }
            }
        }
        return this.table
    }

}
// 最大可承载容量，不超过 Int
HashMap.MAXIMUM_CAPACITY = 1 << 30
// 初始化容量
HashMap.DEFAULT_INITIAL_CAPACITY = 1 << 4
// 负载因子
HashMap.DEFAULT_LOAD_FACTOR = 0.75

module.exports = HashMap

