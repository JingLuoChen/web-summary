# Echarts
## 概览
Echarts从初始一直使用Canvas绘制图表，而Echarts v3.8发布了SVG渲染器，从而提供了一种新的选择，只需在初始化一个图表实例时，设置renderer参数为canvas 或 svg 即可指定渲染器，比较方便

SVG和canvas这两种使用方式差异很大的技术，能够做到同时被透明支持，主要归功于Echarts底层库ZRender的抽象和实现，形成可互换的SVG渲染器和Canvas渲染器

## 选择哪种渲染器
一般来说，Canvas更适合绘制图形元素数量非常大的的图表，也利于实现某些视觉特效。但是在不少场景中，SVG具有更重要的优势：它的内存占用更低，渲染性能略高，
并且用户使用浏览器内置的缩放功能时不会模糊。

* 选择哪种渲染器，我们可以根据软硬件环境、数据量、功能需求综合考虑
```
在软硬件环境较好，数据量不大的场景下，两种渲染器都可以适用，并不需要太多纠结

在环境较差，出现性能问题需要优化的场景下，可以通过试验来确定使用哪种渲染器，比如有这些经验

必须要创建很多Echarts实例且浏览器容易崩溃的情况下---Canvas数量多导致内存占用超出手机承受能力，可以使用SVG渲染器来进行改善
数据量很大，较多交互时，可以选用Canvas渲染器
```

## 如何使用渲染器
Echarts默认使用Canvas渲染，如果想使用SVG渲染，Echarts代码中须要包括有SVG渲染器模块

```javascript
import 'zrender/lib/svg/svg';

// 使用 Canvas 渲染器（默认）
var chart = echarts.init(containerDom, null, {renderer: 'canvas'});
// 等价于：
var chart = echarts.init(containerDom);

// 使用 SVG 渲染器
var chart = echarts.init(containerDom, null, {renderer: 'svg'});
```


## 参考文档
* [ECharts官方教程(十四)【使用 Canvas 或者 SVG 渲染】](https://blog.csdn.net/WuLex/article/details/78828321)
