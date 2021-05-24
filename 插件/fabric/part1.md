# Fabric
## 概述
Fabric.js就是一个操作canvas的js库, 可以以对象的方式添加背景, 图形, 文字, 以及操作图层

原生canvas方法只允许我们触发简单的图形命令，盲目的修改canvas的位图。想画一个矩形？使用fillRect(left, top, width, height)，想画一条线？
使用moveTo(left,top) 和 lineTo(x,y)的组合命令，就好像我们用刷子画画，上层涂上越来越多的颜料，几乎没有控制。

Fabric不是在这么低的层次上运行，而是在原生方法之上提供简单而强大的对象模型，它负责画布状态和渲染，并让我们直接使用绘制后的"对象"

## 差异
假设我们想在画布上画一个红色的矩形，以下是我们如何使用原生的canvas API

```js
// 有一个id是c的canvas元素
var canvasEl = document.getElementById('c');

// 获取2d位图模型
var ctx = canvasEl.getContext('2d');

// 设置填充颜色
ctx.fillStyle = 'red';

// 创建一个坐标100，190，尺寸是20，20的矩形
ctx.fillRect(100, 100, 20, 20);
```

现在使用Fabric做同样的事情：

```js
// 用原生canvas元素创建一个fabric实例
var canvas = new fabric.Canvas('c');

// 创建一个矩形对象
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

// 将矩形添加到canvas画布上
canvas.add(rect);
```

![ ](http://fabricjs.com/article_assets/1.png)

对比之下，Fabric的使用更加方便，是以对象的形式进行使用和声明。

## Fabric中的对象
Fabric涵盖了所有的基本形状：圆、三角形、矩形、椭圆等，所有的这些就是Fabric命令空间下的：fabric.Circle，fabric.Triangle，fabric.Rect，fabric.Ellipse等

Fabric提供了7中基础形状
- [fabric.Circle](http://fabricjs.com/docs/fabric.Circle.html)
- [fabric.Ellipse](http://fabricjs.com/docs/fabric.Ellipse.html)
- [fabric.Line](http://fabricjs.com/docs/fabric.Line.html)
- [fabric.Polygon](http://fabricjs.com/docs/fabric.Polygon.html)
- [fabric.Polyline](http://fabricjs.com/docs/fabric.Polyline.html)
- [fabric.Rect](http://fabricjs.com/docs/fabric.Rect.html)
- [fabric.Triangle](http://fabricjs.com/docs/fabric.Triangle.html)
