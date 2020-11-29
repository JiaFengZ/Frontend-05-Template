// abababx
function match(string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function start(c) {
  return c === 'a' ? foundA : start
}

function foundA(c) {
  return c === 'b' ? foundB : start(c)
}

function foundB(c) {
  return c === 'a' ? foundA2 : start(c)
}

function foundA2(c) {
  return c === 'b' ? foundB2 : start(c)
}

function foundB2(c) {
  return c === 'a' ? foundA3 : foundB(c)
}

function foundA3(c) {
  return c === 'b' ? foundB3 : foundA2(c)
}

function foundB3(c) {
  return c === 'x' ? end(c) : foundB2(c)
}

function end(c) {
  return end
}

console.log(match('xabababcabababx'))
console.log(match('xababxabababx'))
console.log(match('abababhabababh'))