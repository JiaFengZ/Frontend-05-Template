学习笔记

## 1、Realm
什么是`Realm`？es规范里这么说的:`Before it is evaluated, all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources`，翻译过来就是：在解析运行时，所有ECMAScript代码都必须与一个领域相关联。 从概念上讲，领域由一组内部对象，一个ECMAScript全局环境，在该全局环境范围内加载的所有ECMAScript代码以及其他相关状态和资源组成。

### 1.2、 [Realm中的实例原型对象](https://tc39.es/ecma262/#sec-fundamental-objects)
* Fundamental Objects
  * Object
  * Function
  * Boolean
  * Symbol
  * Error
* Number
* BigInt
* Math
* Dates
* Text Processing
  * String
  * RegExp
* Indexed Collections
  * Array
  * TypedArray
    * Int8Array
    * Uint8Array
    * Uint8ClampedArray
    * Int16Array
    * Uint16Array
    * Int32Array
    * Uint32Array
    * BigInt64Array
    * BigUint64Array
    * Float32Array
    * Float64Array
* Keyed Collections
  * Map
  * Set
  * WeakMap
  * WeakSet
* Structured Data
  * ArrayBuffer
  * SharedArrayBuffer
  * DataView
  * Atomics
  * JSON
* Managing Memory
  * WeakRef
  * FinalizationRegistry
* Control Abstraction Objects
  * Iteration
  * GeneratorFunction
  * AsyncGeneratorFunction
  * Generator
  * AsyncGenerator
  * Promise
  * AsyncFunction
* Reflection
  * Reflect
  * Proxy
  * Module Namespace

### 1.3、使用G6可视化绘制原型对象图
![](./realm_objects.jpg)