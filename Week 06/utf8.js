
// | byte 数 | UTF-8 | max
// | --- | --- | --- |
// | 1 | 0XXX XXXX | 0x7f
// | 2 | 110X XXXX 10xx xxxx | 0x7ff
// | 3 | 1110 xxxx 10xx xxxx 10xx xxxx | 0xffff
// | 4 | 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx | 0x1fffff

function UTF8_Encoding (s) {
  var index = 0
  var len = s.length
  var bytes = []

  while (index < len) {
    var c = s.charCodeAt(index++)
    var buf = []

    if (c <= 0x7f) {
      buf[0] = c
      buf.length = 1
    } else if (c <= 0x7ff) {
      /**
       * 1100 0000 -> 0xc0
       * 1000 0000 -> 0x80
       * 11 1111 -> 0x3f
       */
      buf[0] = (0xc0 | (c >> 6))
      buf[1] = (0x80 | (c & 0x3f))
      buf.length = 2
    } else if (c <= 0xffff) {
      /**
       * 1110 0000 -> 0xe0
       * 1000 0000 -> 0x80
       * 11 1111 -> 0x3f
       */
      buf[0] = (0xe0 | (c >> 12))
      buf[1] = (0x80 | ((c >> 6) & 0x3f))
      buf[2] = (0x80 | (c & 0x3f))
      buf.length = 3
    }
    [].push.apply(bytes, buf)
  }
  return Buffer.from(bytes)
}

console.log(UTF8_Encoding('中国'))