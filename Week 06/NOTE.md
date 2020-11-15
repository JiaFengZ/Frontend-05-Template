学习笔记

## 不带括号的四则运算
```
MultiplicativeExpression::=<Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>|
AddtiveExpression::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>|
```

## 带括号的四则运算产生式
```
AtomicExpression::=<Number>|
  "("<AddtiveExpression>")"
MultiplicativeExpression::=<AtomicExpression>|
    <MultiplicativeExpression>"*"<AtomicExpression>|
    <MultiplicativeExpression>"/"<AtomicExpression>
AddtiveExpression::=<AddtiveExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>|
```

## 语言分类
* 按用途分
  * 数据描述语言：JSON 、HTML、XAML、SQL、CSS、XML、SGML、
  * 编程语言：C++、C、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskel、JavaScript 、TypeScript、php、Dart、kotlin、Swift、matlab
* 按表达方式分
  * 声明式语言：JSON 、HTML、XAML、SQL、CSS 、XML、SGML、Lisp、Clojure、Haskel
  * 命令式语言：C++、C、Java、C#、Python、Ruby、Perl、T-SQL、JavaScript 、TypeScript、php、Dart、kotlin、Swift、matlab

## utf8
UTF-8使用1~4字节为每个字符编码。
实际表示ASCII字符的UNICODE字符，将会编码成1个字节，并且UTF-8表示与ASCII字符表示是一样的。所有其他的UNICODE字符转化成UTF-8将需要至少2个字节。每个字节由一个换码序列开始。第一个字节由唯一的换码序列，由n位连续的1加一位0组成, 首字节连续的1的个数表示字符编码所需的字节数
| byte 数 | UTF-8 | max
| --- | --- | --- |
| 1 | 0XXX XXXX | 0x7f
| 2 | 110X XXXX 10xx xxxx | 0x7ff
| 3 | 1110 xxxx 10xx xxxx 10xx xxxx | 0xffff
| 4 | 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx | 0x1fffff
```javascript
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
```

## 面向对象
```javascript
class Human {
  constructor() {
    this.damges = []
  }
  hurt(damge) {
    this.damges.push(damge)
    console.log(damge)
  }
}

class Dog {
  constructor() {
    this.damgeValue = 1000
  }
  bite() {
    let damgeValue = 100
    this.damgeValue -= 100
    return {
      damgeValue,
      damgeSource: 'dog bite'
    }
  }
}

let dog = new Dog()
let human = new Human()
let damge = dog.bite()
human.hurt(damge)
```

## javascript中的特殊对象
* Function
* Array：Array 的 length 属性根据最大的下标自动发生变化
* namespace
* Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了
* String： String 的正整数属性访问会去字符串里查找
* Arguments：arguments 的非负整数型下标属性跟对应的变量联动
* [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
* [Uint8Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
* [Int8Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
