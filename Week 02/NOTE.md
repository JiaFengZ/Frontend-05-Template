学习笔记

## [二叉树的深度深度优先遍历和广度优先遍历的算法回顾](./TreeTraversal/index.js)

* 广度优先遍历
使用一个队列辅助，按顺序把同一层级的树节点入队列，然后按顺序出队列，并且把出队列的节点的左右子节点入队列

* 深度优先遍历
 * 先序遍历：根节点 → 左节点 → 右节点
 * 后序遍历：左节点 → 右节点 → 根节点
 * 中序遍历：左节点 → 根节点 → 右节点

## [地图寻路可视化](./FindPath/async_show.html)
使用`async await`阻塞寻路函数执行，休眠几十毫秒，把寻路过程可视化绘制出来

## [使用广度优先搜索路径](./FindPath/get_path.html)
还原寻路路径的核心就是在寻路过程中，记录每一个到达点的前一个节点，最终从终点回溯还原寻路路径。

## [启发式搜索](./FindPath/smart_search.html)
实现一个`Sorted`优先级队列，替换纯粹先进先出的`queue`队列，可按照距离终点最近的点为高优先级取点，加快寻找到正确路径的速度

## [使用二叉堆辅助实现按优先级取点的启发式搜索](./FindPath/binary_heap.html)
使用一个二叉堆，优化优先级队列的取点速度。
使用数组来实现一个二叉堆，此处实现一个最小堆（每个节点都小于等于其子节点。
假设根节点索引为1，某个节点的索引为i，则其父节点为 i/2，左节点为 2i，右节点为 2i+1
```javascript
class BinaryHeap {
  constructor(data, compare) {
    this.compare = compare || ((a, b) => (a - b))
    this.data = [null]
    for (let i = 0; i < data.length; i++) {
      this.give(data[i])
    }
  }

  // 删除并返回当前队列中最高优先级的元素
  take () {
    // 把最大的和最小的交换位置，取出并删除最小的，然后把交换后的节点下沉到正确位置
    if (this.data.length <= 1) {
      return
    }
    this.swap(1, this.data.length - 1)
    const max = this.data.pop()
    this.down(1)
    return max
  }

  // 插入元素
  give (v) {
    this.data.push(v)
    this.up(this.data.length - 1)
  }

  // 把节点 i 的元素按大小下沉到合适的位置
  down (i) {
    while (2*i <= this.data.length - 1) {
      let index = 2*i
      if (2*i + 1 <= this.data.length - 1 && this.compare(this.data[2*i], this.data[2*i + 1]) > 0) {
        index = 2*i + 1
      }
      if (this.compare(this.data[index], this.data[i]) < 0) {
        this.swap(index, i)
        i =index
      } else {
        break
      }
    }
  }

  up (i) {
    while (i > 1 && this.compare(this.data[i], this.data[Math.floor(i/2)]) < 0) {
      this.swap(Math.floor(i/2), i)
      i = Math.floor(i/2)
    }
  }

  swap (i, j) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  get length () {
    return this.data.length - 1 // 第一个位置不放置元素
  }
}

```