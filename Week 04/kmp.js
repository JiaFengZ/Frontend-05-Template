/**
 * kmp
 * 字符串模式匹配
 * 1、根据pattern建立重复跳转表
 * 2、比对源串和模式串
 * @param {string} source 
 * @param {string} pattern 
 */

function kmp(source, pattern) {
  let table = new Array(pattern.length).fill(0)

  {
    let i = 1
    let j = 0
    while(i < pattern.length) {
      if (pattern[i] === pattern[j]) {
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

  console.log(table)

  {
    let i = 0
    let j = 0
    while(i < source.length) {
      if (j === pattern.length - 1) {
        return true
      }
      if (pattern[j] === source[i]) {
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
    return false
  }
}

console.log(kmp('abcdabcdabce', 'abcdabc'))