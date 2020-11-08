let callbacks = new Map()
let reactivties = new Map()
let usedReactivties = []

let object = {
  a: {b: 3},
  b: 2
}

let po = reactive(object)
effect(() => {
  console.log(po.a.b)
})

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

// 嵌套对象的属性监听
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

po.a.b = 1