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