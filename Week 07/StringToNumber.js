/**
 * 
 * @param {string} str 要转换的字符串
 * @param {number} r 进制
 */
function StringToNumber(str, r) {
  switch (r) {
    case 10:
      break
    case 2:
      break
    case 8:
      str = str.replace(/^0(O|o)(?=[0-7]+$)/, '')
      break
    case 16:
      str = str.replace(/^0(x|X)(?=[0-9a-fA-F])+$/, '')
      break
    default:
      return
  }

  let arr = str.split('')
  let i = arr.length - 1
  let num = 0
  while (i > -1) {
    if (r === 16) {
      if ((arr[i].codePointAt(0) - '0'.codePointAt(0) >= 0) && (arr[i].codePointAt(0) - '0'.codePointAt(0) < 10)) {
        num += (arr[i].codePointAt(0) - '0'.codePointAt(0)) * Math.pow(r, arr.length - i - 1)
      } else if ((arr[i].codePointAt(0) - 'a'.codePointAt(0) >= 0) && (arr[i].codePointAt(0) - 'a'.codePointAt(0) < 6)) {
        num += (arr[i].codePointAt(0) - 'a'.codePointAt(0) + 10) * Math.pow(r, arr.length - i - 1)
      } else if ((arr[i].codePointAt(0) - 'A'.codePointAt(0) >= 0) && (arr[i].codePointAt(0) - 'A'.codePointAt(0) < 6)) {
        num += (arr[i].codePointAt(0) - 'A'.codePointAt(0) + 10) * Math.pow(r, arr.length - i - 1)
      }
    } else {
      num += (arr[i].codePointAt(0) - '0'.codePointAt(0)) * Math.pow(r, arr.length - i - 1)
    }
    i--
  }
  return num
}

console.log(StringToNumber('0011111', 2))
console.log(StringToNumber('0x100fff', 16))
console.log(StringToNumber('110', 10))
console.log(StringToNumber('0o10', 8))