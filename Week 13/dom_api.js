let names = Object.getOwnPropertyNames(window)

function filterOut(names, props) {
  let set = new Set()
  props.forEach(o => {
    set.add(o)
  })
  return names.filter(e => !set.has(e))
}

// ecma 262
// http://www.ecma-international.org/publications/standards/Ecma-262.htm
// https://tc39.es/ecma262/#sec-global-object
{
  let objects = ['globalThis', 'console', 'Infinity', 'NaN', 'undefined', 'eval', 'PerformEval', 'HostEnsureCanCompileStrings', 'EvalDeclarationInstantiation',
    'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'Encode', 'Decode', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent',
    'Array', 'ArrayBuffer', 'BigInt', 'BigInt64Array', 'BigUint64Array', 'Boolean', 'DataView', 'Date', 'Error', 'EvalError', 'FinalizationRegistry',
    'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Number', 'Object', 'Promise', 'Proxy',
    'RangeError', 'ReferenceError', 'RegExp', 'Set', 'SharedArrayBuffer', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'URIError', 'WeakMap', 'WeakRef', 'WeakSet', 'Atomics', 'JSON', 'Math', 'Reflect'
  ]

  names = filterOut(names, objects)
}

// Subclass of Node
names = names.filter(e => {
  try {
    return !(window[e].prototype instanceof Node)
  } catch (e) {
    return true
  }
}).filter(e => {
  return e !== 'Node'
})

// events
names = names.filter(e => !e.match(/^on/))

// webkti private
names = names.filter(e => !e.match(/^webkti/))

// https://html.spec.whatwg.org/#window

console.log(names)