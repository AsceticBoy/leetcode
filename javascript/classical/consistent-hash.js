/**
 * copyright by liudu
 * 
 * @time 2019-10-01
 * @author liudu
 * 
 * 一致性Hash算法 (ConsistentHash)
 * 
 * 结构:
 * 
 *                            0 / 2^32
 *                        /              \
 *                     /                     \
 *                  /                            \
 *           vn4 -> pn2                     req hash -> vn1
 *            /                                      \
 *         /                                            \
 *  req hash -> vn4                                        \
 *      /                                                    \
 *     |                                              req hash -> vn1
 *     |                                                      |
 *  req hash -> vn4                                           |
 *     |                                                  vn1 -> pn1
 *     |                                                      |
 *  vn3 -> pn2                                                |
 *     |                                                      |
 *     |                                                      |
 *      \                                           req hash -> vn2 
 *        \                                                 /
 *          \                                             /
 *            \                                         /
 *     req hash -> vn3                               /
 *                \                       req hash -> vn2 
 *                  \                            /
 *           req hash -> vn3                  /
 *                      \                  /
 *                         - vn2 -> pn1 -
 * 
 * 说明:
 * 多用于在缓存服务器的动态扩/缩容时，尽可能的减少现有缓存位置的重新计算
 */

 // MurmurHash3 更均匀，且效率更高
 const { murmur32Sync } = require('murmurhash3');
 const SkipList = require('./structure/skip-list')

 class VirtualNode {
     constructor (replicaIndex, physicalNode) {
        this.replicaIndex = replicaIndex
        this.physicalNode = physicalNode
     }

     isVirtualNodeOf (pNode) {
         return this.physicalNode.getKey() === pNode.getKey()
     }

     getKey () {
         return this.physicalNode.getKey() + '&&Virtual' + this.replicaIndex
     }

     getPhysicalNode () {
         return this.physicalNode
     }
 }

 class ConsistentHash {
    constructor (virtualCounts) {
        this.ring = new SkipList()
        this.virtual = virtualCounts || ConsistentHash.DEFAULT_VIRTUAL
    }

    // 增加物理节点
    addPhysicalNode (pNode) {
        for (let i = 0; i < this.virtual; i++) {
            const vNode = new VirtualNode(i, pNode)
            this.ring.put(murmur32Sync(vNode.getKey()), vNode)
        }
    }

    // 移除物理节点
    removePhysicalNode (pNode) {
        const it = this.ring.iterator()
        while (it.hasNext()) {
            let { value: raw } = it.next()
            if (raw.value.isVirtualNodeOf(pNode))
                this.ring.remove(raw.key)
        }
    }

    // 根据 hash算法 计算具体的 request ip 对应哪个 node
    routePhysicalNode (request) {
        let vNode = null
        if (this.ring.isEmpty())
            return vNode
        const hashKey = murmur32Sync(request)
        const nextNode = this.ring.after(hashKey)
        // 判断是否存在当前 hashKey 可以落脚的 virtual node
        if (nextNode !== null)
            vNode = nextNode.value
        else {
            const firstNode = this.ring.firstNode()
            // 一个 virtual node 都不存在
            if (firstNode === null)
                return vNode
            vNode = firstNode.value
        }
        // 返回 virtual node 对应的 physical node
        return vNode.getPhysicalNode()
    }
 }

 // 默认虚拟节点个数，防止倾斜
 ConsistentHash.DEFAULT_VIRTUAL = 4

 module.exports = ConsistentHash