function find(source, pattern) {
  let startCount = 0

  // 查询星号个数
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      startCount++
    }
  }

  // 无星号则直接比对
  if (startCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?') {
        return false
      }
    }
  }

  let i = 0
  let lastIndex = 0

  // 比对第一个星号的前段
  for (i = 0; pattern[i] !==  '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false
    }
  }

  lastIndex = i
  
  // 比对中间每个星号分段
  for (let p = 0; p < startCount - 1; p++) {
    i++
    let subPattern = ''
    while(pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }

    let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    reg.lastIndex = lastIndex
    console.log(reg.exec(source))

    if (!reg.exec(source)) {
      return false
    }

    lastIndex = reg.lastIndex

  }

  // 比对最后一个星号的后段
  for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - 1] !== '*'; j++) {
    if (pattern[pattern.length - 1] !== source[source.length - 1]
      && pattern[pattern.length - 1] !== '?') {
        return false
    }
  }
  return true
}

function kmp(source, pattern, isEqual) {
  let table = new Array(pattern.length).fill(0)

  {
    let i = 1
    let j = 0
    while(i < pattern.length) {
      if (isEqual(pattern[i], pattern[j])) {
        i++
        j++
        table[i] = j
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          i++
        }
      }
    }
  }

  {
    let i = 0
    let j = 0
    while(i < source.length) {
      if (j === pattern.length - 1) {
        return i
      }
      if (isEqual(pattern[j], source[i])) {
        i++
        j++
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          i++
        }
      }
    }
    return -1
  }
}

console.log(find('abcabcaxaac', 'a*b?*b*c'))