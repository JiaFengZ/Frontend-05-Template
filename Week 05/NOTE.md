学习笔记

## Proxy

`Proxy` 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

语法：`const p = new Proxy(target, handler)`
其中`target`为要代理的对象，`handler`为定义执行各种操作时的代理行为，可代理的行为有：
* set
* get
* has
* defineProperty
* deleteProperty
* getPrototypeOf
* setPrototypeOf
* construct
* apply
* ownKeys
* getOwnPropertyDescriptor
* preventExtensions
* isExtensible

比如要对对象的`set` 和 `get`方法代理行为：
```javascript
let object = {
  a: 1,
  b: 2
}

let po = new Proxy(object, {
  set(obj, prop, val) {
    console.log(obj, prop, val)
  }
})

po.c = 3
```

## 使用 proxy 实现一个简易版本的 reactive
我们的目标是：当修改一个对象的属性时，执行相应的自定义行为，自定义行为可按需注册。为此需要在`get`中


## 使用 reactive 实现一个响应式rgb调色器
