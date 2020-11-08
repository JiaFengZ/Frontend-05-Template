let callbacks = []

let object = {
  a: 1,
  b: 2
}

let po = reactive(object)
effect(() => {
  console.log(po.a)
})

function effect(callback) {
  callbacks.push(callback)
}

function reactive(object) {
  return new Proxy(object, {
    set(obj, prop, val) {
      for (let callback of callbacks) {
        callback()
      }
      obj[prop] = val
      return obj[prop]
    },

    get(obj, prop) {
      console.log(obj[prop])
      return obj[prop]
    }
  }) 
}

po.a = 1