# echarts
## 概览
Echarts从初始一直使用Canvas绘制图表，而Echarts v3.8发布了SVG渲染器，从而提供了一种新的选择，只需在初始化一个图表实例时，设置renderer参数为canvas 或 svg 即可指定渲染器，比较方便

SVG和canvas这两种使用方式差异很大的技术，能够做到同时被透明支持，主要归功于Echarts底层库ZRender的抽象和实现，形成可互换的SVG渲染器和Canvas渲染器

## 选择哪种渲染器


## 参考文档
* [ECharts官方教程(十四)【使用 Canvas 或者 SVG 渲染】](https://blog.csdn.net/WuLex/article/details/78828321)
