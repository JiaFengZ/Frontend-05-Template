/**
 * 二叉树的遍历方式
 * 1、广度优先遍历
 * 2、深度优先遍历
 *  2.1 先序遍历：根节点 → 左节点 → 右节点
 *  2.2 后序遍历：左节点 → 右节点 → 根节点
 *  2.3 中序遍历：左节点 → 根节点 → 右节点
 */

function breathOrder(node) {
  let queue = []
  let arr = []
  queue.push(node)
  while (queue.length) {
    let node = queue.shift()
    arr.push(node)
    queue.push(node.left)
    queue.push(node.right)
  }
  return arr
}

function preOrder(node) {
  let arr = []
  if (node !== null) {
    arr.push(node)
    arr = arr.concat(preOrder(node.left))
    arr = arr.concat(preOrder(node.right))
  }
  return arr
}

function postOrder(node) {
  let arr = []
  if (node !== null) {
    arr = arr.concat(preOrder(node.left))
    arr = arr.concat(preOrder(node.right))
    arr.push(node)
  }
  return arr
}

function inOrder(node) {
  let arr = []
  if (node !== null) {
    arr = arr.concat(preOrder(node.left))
    arr.push(node)
    arr = arr.concat(preOrder(node.right))
  }
  return arr
}

const node = {
  value: 0,
  left: {
    value: 1,
    left: {
      value: 2,
      left: {
        value: 3
      },
      right: {
        value: 4
      }
    },
    right: {
      value: 2,
      left: {
        value: 3
      },
      right: {
        value: 4
      }
    }
  },
  right: {
    value: 1,
    left: {
      value: 2,
      left: {
        value: 3
      },
      right: {
        value: 4
      }
    },
    right: {
      value: 2,
      left: {
        value: 3
      },
      right: {
        value: 4
      }
    }
  }
}

function renderTree() {
  const container = document.getElementById('tree')
  
}