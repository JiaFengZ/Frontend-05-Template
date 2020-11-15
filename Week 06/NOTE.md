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
