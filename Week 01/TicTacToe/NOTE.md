## 1、建立棋盘的模型表示
显而易见，3行乘3列的棋盘，可以用以下的二维数组表示，其中每个格子是三种状态之一：空、我方棋子、对方棋子，空用`0`表示，我方`1`表示，对方`2`表示,
初始状态都为`0`，使用`chessboard[i][j]`定位第i行j列的格子。
```javascript
let chessboard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
```

为了简化数据结构，棋盘的数据结构表示可以用一维数组实现，使用`chessboard[i * 3 + j]`定位第i行j列的格子。
```javascript
let chessboard = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
]
```

为了方便后面的使用，我们定义一个获取格子状态和设置状态的函数`getCellStatus`、`setCellStatus`，好处是可以在程序逻辑层面屏蔽棋盘的数据结构表示的差异，不关心使用一维数组还是二维数组，甚至自定义的矩阵等数据结构，只需要根据不同的数据结构表示编写特定的`getCellStatus` `setCellStatus`函数，以下以一维数组表示的棋盘来定义：
```javascript
/*
* @param {number} i 行坐标
* @param {number} j 列坐标
*/
function getCellStatus(chessboard, i, j) {
  return chessboard[i * 3 + j]
}

/*
* @param {number} i 行坐标
* @param {number} j 列坐标
*/
function setCellStatus(chessboard, i, j, status) {
  return chessboard[i * 3 + j] = status
}
```


## 2、绘制棋局
我们书写一个`render`函数，以上一步建立的棋盘数据模型作为参数，绘制出当前状态下的棋局，同时我们也给空状态的格子添加点击事件，下子的操作使用
`move`函数来实现

```javascript
let status = 1 // 全局变量，标记当前哪一方下子

function move(chessboard, i, j) {
  setCellStatus(chessboard, i, j, status)
  status = 3 - status
  render(chessboard)
}

function render(chessboard) {
  let board = document.getElementById('board')
  board.innerHTML = ''
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('div')
      let cellStatus = getCellStatus(chessboard, i, j)
      cell.classList.add('cell')
      cell.innerText = cellStatus === 2 ? '×' :
        cellStatus === 1 ? '√' : ''
      if (cellStatus === 0) {
        cell.addEventListener('click', () => move(i, j))
      }
      board.appendChild(cell)
    }
    board.appendChild(document.createElement('br'))
  }
}
```
这样子我们就已经绘制出棋盘，并且双方可以交替下子了，下一步就是判断胜负。

## 3、判断胜负
我们添加一个`check`函数，判断某一方下子后是否决出胜负。有如下几种获胜的情形：

* 横向3连子
* 竖向3连子
* 对角线3连子

```javascript
function check(chessboard, status) {
  for (let i = 0; i < 3; i ++) { // 横向3连子
    let win = true
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, i, j) !== status) {
        win = false
      }
    }
    if (win) {
      return true
    }
  }

  for (let i = 0; i < 3; i ++) { // 竖向3连子
    let win = true
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, j, i) !== status) {
        win = false
      }
    }
    if (win) {
      return true
    }
  }

  { // 左上角到右下角交叉线3连子
    let win = true
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, j, j) !== status) {
        win = false
      }
    }
    if (win) {
      return true
    }
  }

  { // 右上角到左下角交叉线3连子
    let win = true
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, j, 3 - j - 1) !== status) {
        win = false
      }
    }
    if (win) {
      return true
    }
  }
}
```

有了`check`方法后，我们就可以给`move`方法加上胜负判定了

```javascript
function move(chessboard, i, j) {
  setCellStatus(chessboard, i, j, status)
  if (check(chessboard, status)) {
    alert(status === 2 ? '× win' : '√ win')
  }
  status = 3 - status
  render(chessboard)
}
```

好了，现在我们已经完成了一个可用的对战游戏了。下一步我们考虑给它加上简单的AI功能

## 4、某一方将要获胜时输出提示
为此，我们实现一个`willWin`函数，判断某方是否将要获胜，其核心思路就是遍历余下的下子情形，找到可获胜的下子则说明要赢了。

```javascript
function clone(chessboard) {
  return Object.create(chessboard)
}

function willWin(chessboard, status) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, i, j, status)) {
        continue
      }
      let temp = clone(chessboard) // 复制棋盘
      setCellStatus(chessboard, i, j, status) // 模拟下子
      if (check(temp, status)) {
        return true
      }
    }
  }
  return false
}
```

值得注意的是，为了模拟下子，需要复制一份棋盘，其实可以稍微优化一下，不需要复制棋盘，检查完毕后还原棋盘即可：
```javascript
let stack = []
function pushStep(i, j, status) {
  stack.push({
    i: i,
    j: j,
    status: status
  })
}
function rollback(n) {
  for (let i = 0; i < n; i++) {
    let step = stack.pop()
    setCellStatus(chessboard, step.i, step.j, 0)
  }
}

function willWin(chessboard, status) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, i, j, status)) {
        continue
      }
      setCellStatus(chessboard, i, j, status) // 模拟下子
      pushStep(i, j, status)
      let result = check(chessboard, status)
      rollback(1) // 还原
      if (result) {
        return true
      }
    }
  }
  return false
}
```

然后给`move`方法加上胜负预测：

```javascript
function move(chessboard, i, j) {
  setCellStatus(chessboard, i, j, status)
  if (check(chessboard, status)) {
    alert(status === 2 ? '× win' : '√ win')
  }
  status = 3 - status
  render(chessboard)
  if (willWin(chessboard, status)) {
    console.log(status === 2 ? '× will win' : '√ will win')
  }
}
```
好了，到此我们完成了一个人人对战的小游戏了，并且在某方将要赢时输出智能提示。

## 6、最后的目标：实现人机对战
AI 在玩家落子后，遍历所有可走的位置，模拟玩家落子，并对每一种走法进行评估，选择对自己最有利的一步棋，下面我们就实现找出最有利一步棋的方法。
首先改造一下`willWin`方法，若有获胜的一步棋，则返回这个点，否则返回空

```javascript
function willWin(chessboard, status) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, i, j, status)) {
        continue
      }
      setCellStatus(chessboard, i, j, status) // 模拟下子
      pushStep(i, j, status)
      let result = check(chessboard, status)
      rollback(1) // 还原
      if (result) {
        return [i, j]
      }
    }
  }
  return null
}
```

找出最有利一步棋的方法：

```javascript
function bestChoice(chessboard, status) {
  let p
  if (p = willWin(chessboard, status)) { // 若有获胜一步棋，则返回该步，结束
    return {
      point: p,
      result: 1
    }
  }

  let result = -2
  let point = null
  outer:
  for (let i = 0; i < 3; i++) {
    inner:
    for (let j = 0; j < 3; j++) {
      if (getCellStatus(chessboard, i, j, status)) {
        continue
      }
      setCellStatus(chessboard, i, j, status) // 我方模拟下子
      pushStep(i, j, status)
      let r = bestChoice(chessboard, 3 - status).result // 找出下一步对方最优下子的胜负结果，1，0，-1之一
      rollback(1)
      if (- r > result) { // 当-r结果为正时，说明我方可获胜，替换使用该步下法
        result = -r
        point = [i, j]
      }
      if (result > 0) { // 胜负剪枝
        break
      }
    }
  }

  return {
    point: point,
    result: point ? result : 0 // 如果point为null说明找不到可获胜的下子或者棋已走完
  }
}
```

接下来，定义人下子和ai下子的方法：
```javascript
function userMove(i, j) {
  if (status === 2) {
    return
  }
  setCellStatus(chessboard, i, j, status)
  if (check(chessboard, status)) {
    let currentStatus = status
    setTimeout(() => {
      alert(currentStatus === 2 ? '× win' : '√ win')
    }, 500)
  }
  status = 3 - status
  render()
  setTimeout(computerMove, 500)
}

function computerMove() {
  let choice = bestChoice(chessboard, status)
  if (choice.point) {
    setCellStatus(chessboard, choice.point[0], choice.point[1], status)
  }
  if (check(chessboard, status)) {
    let currentStatus = status
    setTimeout(() => {
      alert(currentStatus === 2 ? '× win' : '√ win')
    }, 500)
  }
  status = 3 - status
  render()
}
```

修改棋盘事件，使其响应用户下子的操作，用户下子后，ai自动下子：
```javascript
// ...
cell.addEventListener('click', () => userMove(i, j))
// ...

```

至此就完成我们的目标了，详细完整源码见[demo](./index.html)