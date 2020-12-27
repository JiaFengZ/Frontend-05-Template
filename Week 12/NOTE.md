学习笔记
## 盒模型
### 背景
HTML代码中可以书写开始__标签__，结束_标签___ ，和自封闭_标签___ 。
一对起止_标签___ ，表示一个_元素___ 。
DOM树中存储的是_元素___和其它类型的节点（Node）。
CSS选择器选中的是_元素和伪元素___ 。
CSS选择器选中的__元素__ ，在排版时可能产生多个_盒___ 。
排版和渲染的基本单位是__盒__ 。

### 盒模型定义
* margin border padding content
* content-box: width = content width
* border-box: width = content width + padding + border width

## 正常流
### 排版步骤
* 收集盒进入行
* 计算盒子在行中的排布
* 计算行的排布

### IFC
text element inline-box

### BFC
line-box block-level-box

### 正常流的行级排布
对齐方式：
* line-top
* text-top
* base-line
* text-bottom
* line-bottom

### margin 折叠现象
正常流中BFC才可发生margin折叠
### Block
* Block container: 里面包含BFC的
* Block-level-box: 外面有BFC的
* Block Box = Block container + Block-level-box 里外都有BFC的

## 颜色
* 印刷行业三原色： 黄 + 蓝 + 红
* RGB三原色： 红 + 绿 + 蓝
* HSL： hue 色相 + saturation 纯度 + Lightness 亮度
* HSV： hue 色相 + saturation 纯度 + Value 色值（明度）

## 绘制
属性分类
* 几何图形： border box-shadow border-radius
* 文字： font text-decoration
* 位图： background-image


