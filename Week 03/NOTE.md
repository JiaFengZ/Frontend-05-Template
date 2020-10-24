学习笔记

[四则运算表达式的语法解析](./additive_experssion.html)

## 词法分析

不考虑括号改变优先级的四则运算表达式，可能出现的符号类型有：  
* `Number`
* `Whitespace`
* `LineTerminator`
* `*`
* `/`
* `+`
* `-`

使用正则 `/([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g` 反复执行 exec() 方法可依次检索出表达式中有效的 token

## 语法分析

```
Expression = 
  AdditiveExpression EOF
  
AdditiveExpression = 
  Number
  |MultiplicativeExpression * Number
  |MultiplicativeExpression / Number
  |AdditiveExpression + MultiplicativeExpression
  |AdditiveExpression - MultiplicativeExpression
```

从左到右解析token，加法表达式递归表示为乘法表达式的组合，乘法表达式递归表示为数字
根据该语法解析规则，乘法表达式处理优先级高于加法，符合四则运算规则

这里的递归降级解析是表达式语法解析的关键。首先一个四则运算表达式，最上层整体可视为一个加法表达式：
```javascript
function Expression(source) {
  ...
  // 四则表达式降级为加法表达式的组合
  AdditiveExpression(source)
  ...
}
```

加法表达式则可降级解析为乘法表达式的组合：
```javascript
function AdditiveExpression (source) {
  ...
  MultiplicativeExpression(source)
  ...
}
```

最终是乘法表达式的解析：
```javascript
function MultiplicativeExpression (source) {}
```