学习笔记

## 1 html 转义符
| 显示字符 | 描述 | 实体名称 | 编号
| --- | --- | --- | --- |
|  | 空格 | `&nbsp;` | `&#160;`
| < | 小于号 | `&lt;` | `&#60;`
| > | 大于号 | `&gt;` | `&#62;`
| & | 与 | `&amp;` | `&#38;`
| × | 乘号 | `&times;` | `&#215;`
| ÷ | 除号 | `&divide;` | `&#247;`

## 2 html 标签语义化
* article 独立的自包含内容
* aside 页面主内容之外的某些内容（比如侧栏）
* details 定义用户能够查看或隐藏的额外细节
* figcaption 添加可见的解释
* figure 定义元素组
* footer 文档或节规定页脚
* header 文档或节规定页眉
* main 规定文档的主内容
* mark 定义重要的或强调的文本
* nav 导航链接集合
* section 有主题的内容组
* summary 定义 `<details>` 元素的可见标题
* time 定义日期/时间
* abbr
* code 代码

## 3 dom api
### 3.1 节点导航
* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling

### 3.2 元素节点导航
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibling

### 3.3 节点操作
* appendChild
* insetBefore
* removeChild
* replaceChild

## 4 事件 api
* 捕获
* 冒泡
* [事件分类](https://developer.mozilla.org/zh-CN/docs/Web/Events)

## 5 range api
### 5.1 api
* setStart
* setEnd
* setStartBefore
* setEndBefore
* setStartAfter
* setEndAfter
* selectNode
* selectNodeContents

### 5.2 把元素集合反转
```javascript
function reverseChild(element) {
  let range = new Range()
  range.selectNodeContents(element)
  let fragment = range.extractContents()
  let l = fragment.childNodes.length
  while (l-- > 0) {
    fragment.appendChild(fragment.childNodes[l])
  }
  element.appendChild(fragment)
}
```

## 6 csssom

### 6.1 Document.styleSheets
返回一个由 StyleSheet 对象组成的 StyleSheetList，每个 StyleSheet 对象都是一个文档中链接或嵌入的样式表。styleSheetList.item(index) 或 styleSheetList[index] 根据它的索引（索引基于0）返回一个单独的样式表对象
* document.styleSheets[index].cssRules 获取rule
* document.styleSheets[index].insertRule 插入rule
* document.styleSheets[index].removeRule 删除rule

### 6.2 修改样式表rule
document.styleSheets[index].cssRules[index].style.color='blue'