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
我们的目标是：当修改一个对象的属性时，执行相应的自定义行为，自定义行为可按需注册。
首先需要在对象的对应属性注册事件回调：
```javascript
function effect(callback) {
  // 注册副作用回调函数
  usedReactivties = []
  callback()
  console.log(usedReactivties)

  // callbacks为两层结构，存放对象的属性的操作回调函数
  for (let reactivity of usedReactivties) {
    if (!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map())
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], [])
    }
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
  }
}
```
然后在`reactive`中的`set`代理拦截，调用已注册的事件回调：
```javascript
set(obj, prop, val) {
  if (callbacks.get(obj)) {
    if (callbacks.get(obj).get(prop)) {
      for (let callback of callbacks.get(obj).get(prop)) {
        callback() // 执行设置对应对象对应属性的副作用回调函数
      }
    }
  }
  ...
  return obj[prop]
}
```
为了实现对嵌套对象的属性代理拦截，需要在`reactive`函数中递归调用
```javascript
function reactive(object) {
  if (reactivties.has(object)) {
    return reactivties.get(object)
  }
  let proxy = new Proxy(object, {
    set(obj, prop, val) {
      if (callbacks.get(obj)) {
        if (callbacks.get(obj).get(prop)) {
          for (let callback of callbacks.get(obj).get(prop)) {
            callback() // 执行设置对应对象对应属性的副作用回调函数
          }
        }
      }
      obj[prop] = val
      return obj[prop]
    },

    get(obj, prop) {
      usedReactivties.push([obj, prop])
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop])
      }
      return obj[prop]
    }
  })

  reactivties.set(object, proxy)
  return proxy
}
```


## 使用 reactive 实现一个响应式rgb调色器
r、g、b三个颜色变量分别与界面上三个输入控件值双向绑定
```html
<input id='r' type='range' max=255>
<input id='g' type='range' max=255>
<input id='b' type='range' max=255>

<div id='color' style='width:100px;height:100px'></div>

<script>
  ...
  let object = {
    r: 1,
    g: 1,
    b: 1
  }

  let po = reactive(object)
  effect(() => {
    document.getElementById('r').value = po.r
  })
  effect(() => {
    document.getElementById('g').value = po.g
  })
  effect(() => {
    document.getElementById('b').value = po.b
  })

  document.getElementById('r').addEventListener('input', event => po.r = event.target.value)
  document.getElementById('g').addEventListener('input', event => po.g = event.target.value)
  document.getElementById('b').addEventListener('input', event => po.b = event.target.value)

  effect(() => {
    document.getElementById('color').style.backgroundColor = `rgb(${po.r}, ${po.g}, ${po.b})`
  })
  ...
</script>
```

## Range API
* `Range.setStart()` 设置 Range 的起点。
* `Range.setEnd()` 设置 Range 的终点
* `Range.setStartBefore()` 以其它节点为基准，设置 Range 的起点
* `Range.setStartAfter()` 以其它节点为基准，设置 Range 的起点
* `Range.setEndBefore()` 以其它节点为基准，设置 Range 的终点
* `Range.setEndAfter()` 以其它节点为基准，设置 Range 的终点
* `Range.selectNode()` 使 Range 包含某个节点及其内容
* `Range.selectNodeContents()` 使 Range 包含某个节点的内容
* `Range.cloneContents()` 返回一个包含 Range 中所有节点的文档片段
* `Range.deleteContents()` 从文档中移除 Range 包含的内容。
* `Range.extractContents()` 把 Range 的内容从文档树移动到一个文档片段中
* `Range.insertNode()` 在 Range 的起点处插入一个节点
* `Range.surroundContents()` 将 Range 的内容移动到一个新的节点中

## demo
* [Proxy reactive最终版](./reactive_v4.js)
* [rgb 调色盘](./reactive.html)
* [Range 拖拽](./range_dragable.html)

## 参考链接
* [MDN Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)
* [MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 