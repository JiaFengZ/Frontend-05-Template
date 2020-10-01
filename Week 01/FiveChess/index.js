const dimension = 15
const count = 5
const depth = 2 // ai搜索深度

/**
 * 生成 n*n的棋盘
 * @param {number} n 
 */
function initChessBoard(n) {
  let chessboard = []
  for (let i = 0; i < n * n; i++) {
    chessboard.push(0)
  }
  return chessboard
}

/*
* @param {number} i 行坐标
* @param {number} j 列坐标
*/
function getCellStatus(chessboard, i, j) {
  return chessboard[i * dimension + j]
}

/*
* @param {number} i 行坐标
* @param {number} j 列坐标
*/
function setCellStatus(chessboard, i, j, status) {
  return chessboard[i * dimension + j] = status
}

let stack = [] // 保存棋步的堆栈

function pushStep(i, j, status) {
  stack.push({
    i: i,
    j: j,
    status: status
  })
}
function move(chessboard, i, j, status) {
  if (getCellStatus(chessboard, i, j) === 0) {
    setCellStatus(chessboard, i, j, status)
    stack.push({
      i: i,
      j: j,
      status: status
    })
    for (var k = 0; k < winCount; k++) {
      if (wins[i][j][k]) {
        if (status === computerStatus) {
          maxWin[k]++
        } else {
          minWin[k]++
        }
      }
    }
  }
}

function rollback(n) {
  for (let i = 0; i < n; i++) {
    let step = stack.pop()
    setCellStatus(chessboard, step.i, step.j, 0)
    for (var k = 0; k < winCount; k++) {
      if (wins[step.i][step.j][k]) {
        if (step.status === computerStatus) {
          maxWin[k]--
        } else {
          minWin[k]--
        }
      }
    }
  }
}

// 初始化赢法数组，记录每个位置可归属的赢法
// 根据某种赢法已下的棋子个数，得出该赢法达成度，累加所有赢法的达成度即可得出当前棋局的优势评分
function initWins() {
  let wins = []
  let winCount = 0

  for (var i = 0; i < dimension; i++) {
    wins[i] = []
    for (var j = 0; j < dimension; j++) {
      wins[i][j] = []
    }
  }
  
  for (let i = 0; i < dimension; i ++) { // 横向赢法
    for (let j = 0; j < dimension - count; j++) {
      for (let k = 0; k < count; k++) {
        wins[i][j + k][winCount] = true // 标记这个位置属于第winCount种赢法（一个位置可归属多个赢法），以下类似
      }
      winCount++
    }
  }

  for (let i = 0; i < dimension; i ++) { // 竖向赢法
    for (let j = 0; j < dimension - count; j++) {
      for (let k = 0; k < count; k++) {
        wins[j + k][i][winCount] = true
      }
      winCount++
    }
  }

  // 左上角到右下角交叉线赢法
  for (var i = 0; i <= dimension - count; i++) {
    for (var j = 0; j <= dimension - count; j++) {
      for (var k = 0; k < count; k++) {
        wins[i + k][j + k][winCount] = true
      }
      winCount++
    }
  }

  // 右上角到左下角交叉线赢法
  for (var i = 0; i <= dimension - count; i++) {
    for (var j = dimension - 1; j > count; j--) {
      for (var k = 0; k < count; k++) {
        wins[i + k][j - k][winCount] = true
      }
      winCount++
    }
  }

  //记录己方每一种赢法的已经达成棋子数
  let maxWin = []
  //记录对方每一种赢法的已经达成棋子数
  let minWin = []
  //初始化max和min每一种赢法的下子情况
  for (var i = 0; i < winCount; i++) {
    maxWin[i] = 0
    minWin[i] = 0
  }

  return [wins, winCount, maxWin, minWin]
}

// 评估当前棋局优势评分的方法
// 规定评分越大对己方越有利，反之对对方越有利
// Infinity 说明己方获胜，-Infinity说明对方获胜
function evaluate() {
  let maxGroup = {
    "4": 0,
    "3": 0,
    "2": 0,
    "1": 0
  }
  let minGroup = {
    "4": 0,
    "3": 0,
    "2": 0,
    "1": 0
  }
  for (let i = 0; i < winCount; i++) {
    if (maxWin[i] === 5) {
      return Infinity
    }
    if (minWin[i] === 5) {
      return -Infinity
    }
    for (let winReach of [4, 3, 2, 1]) {
      // 己方第i种赢法达成winReach个，且对方没有占用该赢法位置（即没被围堵）
      if (maxWin[i] === winReach && !minWin[i]) {
        maxGroup[winReach]++
      }
      // 对方
      if (minWin[i] === winReach && !maxWin[i]) {
        minGroup[winReach]++
      }
    }
  }
  let maxScore = maxGroup[4] * 5000 + maxGroup[3] * 1000 + maxGroup[2] * 200 + maxGroup[1] * 10
  let minScore = minGroup[4] * 5000 + minGroup[3] * 1000 + minGroup[2] * 200 + minGroup[1] * 10
  return maxScore - minScore
}

let chessboard = initChessBoard(dimension)
let status = 1 // 全局变量，标记当前哪一方下子
let isWin = false // 全局变量，标记是否已获胜结束
const userStatus = 1 // 人执子的颜色
const computerStatus = 2 // ai执子的颜色
let [ wins, winCount, maxWin, minWin ] = initWins()

// 评估最优下法
function bestChoice(chessboard, status, depth, beta) {

  if(depth === 0) { // 到达搜索深度，返回棋局评分
    return {
      result: evaluate()
    }
  }

  let result = status === computerStatus ? -Infinity : Infinity
  let point = null
  outer:
  for (let i = 0; i < dimension; i++) {
    inner:
    for (let j = 0; j < dimension; j++) {
      if (getCellStatus(chessboard, i, j, status)) {
        continue
      }
      move(chessboard, i, j, status) // 我方模拟下子
      let r = bestChoice(chessboard, 3 - status, depth -  1, result).result // 找出下一步对方最优下子后的局势评分
      rollback(1)
      if (status === computerStatus && r > result) { // 选择最大优势的走法
        result = r
        point = [i, j]
      } else if (status === userStatus && r < result) {
        result = r
        point = [i, j]
      }
      if ((status === computerStatus && result >= beta) || (status === userStatus && result <= beta )) { // 胜负剪枝
        break outer
      }
    }
  }

  return {
    point: point,
    result: point ? result : evaluate() // 如果point为null说明找不到可获胜的下子或者棋已走完
  }
}

function check(status) {
  var w = evaluate()
  return status === computerStatus
    ? (w === Infinity ? true : false)
    : (w === -Infinity ? true : false)
}

function userMove(i, j) {
  if (isWin || status === computerStatus) {
    return
  }
  move(chessboard, i, j, status)
  if (check(status)) {
    isWin = true
    let currentStatus = status
    setTimeout(() => {
      alert(currentStatus === 2 ? '× win' : '√ win')
    }, 500)
  }
  status = 3 - status
  render(chessboard)
  setTimeout(computerMove, 500)
}

function computerMove() {
  let choice = bestChoice(chessboard, status, depth, Infinity)
  if (choice.point) {
    move(chessboard, choice.point[0], choice.point[1], status)
  }
  if (check(status)) {
    isWin = true
    let currentStatus = status
    setTimeout(() => {
      alert(currentStatus === 2 ? '× win' : '√ win')
    }, 500)
  }
  status = 3 - status
  render(chessboard)
}

function render(chessboard) {
  let board = document.getElementById('board')
  board.innerHTML = ''
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement('div')
      let cellStatus = getCellStatus(chessboard, i, j)
      cell.classList.add('cell')
      cell.innerText = cellStatus === 2 ? '×' :
        cellStatus === 1 ? '√' : ''
      if (cellStatus === 0) {
        cell.addEventListener('click', () => userMove(i, j))
      }
      board.appendChild(cell)
    }
    board.appendChild(document.createElement('br'))
  }
}

render(chessboard)