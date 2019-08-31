/**
 * copyright by liudu
 * 
 * @from ByteDance
 * @time 2019-08-31
 * @author liudu
 * 
 * 三壶倒水问题：
 * 
 * 描述：给定一个装满水的 8 升满壶和两个分别是 5 升、3 升的空壶，请想个优雅的办法，使得其中一个水壶恰好装 4 升水，每一步的操作只能是倒空或倒满，请列举步骤
 * 
 * 图解：
 *    8L                                                     8L
 *  ------                                                 ------
 * |  --  |                                               |      |
 * |  --  |                                               |      |
 * |  --  |       5L                                      |      |       5L
 * |  --  |     ------                 ======>>>=====     |      |     ------
 * |  --  |    |      |       3L       ======>>>=====     |      |    |      |       3L
 * |  --  |    |      |     ------                        |      |    |  --  |     ------
 * |  --  |    |      |    |      |                       |      |    |  --  |    |  --  |
 * |  --  |    |      |    |      |                       |  --  |    |  --  |    |  --  |
 * |  8L  |    |  0L  |    |  0L  |                       |  1L  |    |  4L  |    |  3L  |
 *  ------      ------      ------                         ------      ------      ------
 * 
 * 注解：
 * 1. 列举过程后，广度遍历直到 4L 壶出现后停止
 * 2. https://www.zhihu.com/question/28830426/answer/42283982（重心坐标系）
 */

 "use strict"

const assert = require('assert').strict;

class JugsSnapshot {
    constructor (parent, self) {
        this.parent = parent
        this.self = self
    }

    havingExpect (expect) {
        return this.retain
            .some(retain => retain === expect)
    }

    get retain () {
        return this.self.map(jug => jug.retain)
    }

    get snapshot () {
        return this.retain.join(',')
    }

    findPath () {
        let self = this
        let path = []
        do {
            path.push(self.retain)
        } while ((self = self.parent))
        return path
    }
}

function calcRetainAndLess (jug) {
    return { retain: jug.volume - jug.less, less: jug.less }
}

function calcAfterSwitch (jugOut, jugIn) {
    if (jugOut.retain > jugIn.less) {
        return [
            { retain: jugOut.retain - jugIn.less, less: jugOut.less + jugIn.less },
            { retain: jugIn.retain + jugIn.less, less: 0 }
        ]
    } else {
        return [
            { retain: 0, less: jugOut.less + jugOut.retain },
            { retain: jugIn.retain + jugOut.retain, less: jugIn.less - jugOut.retain }
        ]
    }
}

function solution (
    [ jugOne, jugTwo, jugThree ],
    expect
) {
    // BFS Queue
    const queue = []
    const searched = new Set()

    queue.push(
        new JugsSnapshot(null, [
            calcRetainAndLess(jugOne),
            calcRetainAndLess(jugTwo),
            calcRetainAndLess(jugThree)
        ])
    )

    while (queue.length) {
        const snapshot = queue.shift()
        const jugs = snapshot.self
        if (snapshot.havingExpect(expect)) {
            return snapshot.findPath().reverse();
        }
        for (let head = 0; head < jugs.length; head++) {
            for (let tail = 0; tail < jugs.length; tail++) {
                if (head === tail) {
                    continue;
                }
                if (jugs[head].retain && jugs[tail].less) {
                    const [
                        nextHead,
                        nextTail
                    ] = calcAfterSwitch(jugs[head], jugs[tail])
                    
                    const next = new JugsSnapshot(
                        snapshot,
                        jugs.map((jug, index) => {
                            const isHead = index === head
                            const isTail = index === tail
                            if (isHead || isTail) {
                                return isHead ? nextHead : nextTail
                            } else {
                                return jug
                            }
                        })
                    )
                    // 如果交换后 searched 不重复，推入到队列中，并且记录在 searched 中
                    if (!searched.has(next.snapshot)) {
                        queue.push(next)
                        searched.add(next.snapshot)
                    }
                }
            }
        }
    }

    return false
}

(function threeJugs () {
    assert.deepStrictEqual(
        solution(
            [
                { volume: 8, less: 0 },
                { volume: 5, less: 5 },
                { volume: 3, less: 3 },
            ],
            4
        ),
        [
            [ 8, 0, 0 ],
            [ 3, 5, 0 ],
            [ 3, 2, 3 ],
            [ 6, 2, 0 ],
            [ 6, 0, 2 ],
            [ 1, 5, 2 ],
            [ 1, 4, 3 ],
        ]
    )

    assert.deepStrictEqual(
        solution(
            [
                { volume: 10, less: 0 },
                { volume: 7, less: 7 },
                { volume: 3, less: 3 },
            ],
            5
        ),
        [
            [ 10, 0, 0 ],
            [ 3, 7, 0 ],
            [ 3, 4, 3 ],
            [ 6, 4, 0 ],
            [ 6, 1, 3 ],
            [ 9, 1, 0 ],
            [ 9, 0, 1 ],
            [ 2, 7, 1 ],
            [ 2, 5, 3 ],
        ]
    )
})()