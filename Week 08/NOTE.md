学习笔记

## 有限状态机

* 每一个状态都是机器
  * 每一个机器都可以计算，存储，输出
  * 所有的这些机器接受的输入是一致的
  * 状态机的每个机器本身没有状态，用函数表示就是纯函数，（无副作用）
* 每一个机器知道下一个状态
  * 每一个机器有确定的下一个状态
  * 每个机器根据输入决定下一个状态