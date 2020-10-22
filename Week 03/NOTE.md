学习笔记

## [四则运算表达式的语法解析](./additive_experssion.html)

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

## 词法分析

## 语法分析