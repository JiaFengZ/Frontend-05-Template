let object = {
  a: 1,
  b: 2
}

let po = reactive(object)

function reactive(object) {
  return new Proxy(object, {
    set(obj, prop, val) {
      console.log(obj, prop, val)
      obj[prop] = val
      return obj[prop] = val
    },

    get(obj, prop) {
      console.log(obj[prop])
      return obj[prop]
    }
  }) 
}

po.c = 3