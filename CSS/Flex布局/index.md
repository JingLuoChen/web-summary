# flex布局
## 概述
>Flex是Flexible Box的缩写，意为弹性布局，用来为盒状模型提供最大的灵活性<br>

* 任何一个容器都可以指定为Flex布局
```$xslt
.box {
  display: flex;
}
```

* 行内元素也可以使用Flex布局
```$xslt
.box {
  display: inline-flex;
}
```
注意：设为flex布局以后，子元素的float、clear和vertical-align属性将失效

## 基本概念
采用Flex布局的元素，称为Flex容器，简称容器。它的所有子元素自动成为容器成员，称为Flex项目，简称项目<br>

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）

## 容器的属性
### flex-direction属性
flex-direction属性决定主轴的方向 --- 即项目的排列方向 --- 水平方向

* 它可能有4个值
```$xslt
row(默认值): 主轴为水平方向，起点在左端
row-reverse: 主轴为水平方向，起点在右端
column: 主轴为垂直方向，起点在上沿
column-reverse: 主轴为垂直方向，起点在下沿
```

### flex-wrap属性
默认情况下，项目都排在一条线上(又称"轴线")，flex-wrap属性定义，如果一条轴线排不下，如何换行

* 它可能有三个值
```$xslt
nowrap(默认): 不换行
wrap: 换行，第一行在上方
wrap-reverse: 换行，第一行在下方
```

### flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap<br>

flex-flow: <flex-direction> || <flex-wrap>;

### justify-content属性
justify-content属性定义了项目在主轴上的对齐方式 --- 水平方向

* 它可能取5个值
```$xslt
flex-start(默认值): 左对齐
flex-end: 右对齐
center: 居中
space-between: 两端对齐，项目之间的间隔都相等
space-around: 每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍
```

### align-items属性
align-items属性定义项目在交叉轴上如何对齐

* 它可能取5个值
```$xslt
flex-start: 交叉轴的起点对齐 --- 上对齐
flex-end: 交叉轴的终点对齐 --- 下对齐
cneter: 交叉轴的中点对齐 --- 中对齐
baseline: 项目的第一行文字的基线对齐 --- 基于文字上平对齐
stretch(默认值): 如果项目未设置高度或设未auto，将占满整个容器的高度
```

### align-content属性
align-content属性定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用

* 它可能有6个值
```$xslt
flex-start: 与交叉轴的起点对点
flex-end: 与交叉轴的终点对齐
center: 与交叉轴的中点对齐
space-between: 与交叉轴两端对齐，轴线之间的间隔平均分布
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
stretch（默认值）：轴线占满整个交叉轴
```

## 参考文档
* [Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
