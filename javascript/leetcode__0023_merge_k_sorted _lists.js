/**
 * 给你一个链表数组，每个链表都已经按升序排列
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 * 
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 
 * 输入：lists = []
 * 输出：[]
 */

'use strict'
 
function mergeKSortedLists(lists) {
    // 最小的数组在 list 的索引位置
    let minArray = 0;
    // 比较位在最小数组的索引位置
    let compareIndex = 0;
    // 下一次比较中最小的在 list 的索引位置
    let nextArray = null;
    const realLists = lists.filter(list => list.length);
    if (!realLists.length) return [];
    // 先找到最小
    for (let i = 0; i < realLists.length; i++) {
        if (realLists[minArray][0] > realLists[i][0]) {
            minArray = i;
            compareIndex = 0;
        }
    }
    // 当且仅当只有一条链表数据时，退出循环
    while (realLists.filter(list => list.length).length !== 1) {
        // 找到 nextArray 为最小的
        for (let i = 0; i < realLists.length; i++) {
            if (minArray !== i) {
                if (typeof nextArray === 'number') {
                    if (typeof realLists[i][0] === 'number'
                        && typeof realLists[nextArray][0] === 'number'
                        && realLists[nextArray][0] > realLists[i][0]) {
                        nextArray = i
                    }
                } else {
                    nextArray = i
                }
            }
        }
        if (realLists[nextArray][0] > realLists[minArray][compareIndex]) {
            // 移动数组
        } else {

        }
    }
    return realLists[0];
}