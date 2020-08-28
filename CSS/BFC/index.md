# BFC 
## 概述
BFC(Block Formatting Context)块级格式化上下文，是用于布局块级盒子的一块渲染区域，并且有一套
渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

## BFC布局规则
1、同一个BFC内部的Box在垂直方向，一个接一个的排列<br>
2、Box垂直方向的间距由margin值决定，属于同一个BFC内的两个相邻Box的margin值会发生重叠，重叠的结果：间距为较宽的margin值<br>
3、BFC内部每个Box的左边margin与其包含块的左边border相接触(对于从左往右的格式化，否则相反)，即使浮动也是如此<br>
4、包含块内部子元素的每个BFC不会重叠，如果设置float属性，会在水平依次排开<br>
5、BFC是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素<br>
6、计算BFC的高度时，其内的浮动元素也参与

## BFC的触发条件
1、float属性值不为none<br>
2、position属性值为absolute或者fixed
3、display属性值为inline-block、table-cell、table-caption、flex、inline-flex
4、根元素
5、overflow属性值不为visible

## BFC的作用与原理
1、自适应两栏布局
2、可以阻止元素被浮动元素覆盖
3、可以包含浮动元素---清除内部浮动
4、分属于不同的BFC时可以阻止margin重叠

## 参考文档
* [[布局概念] 关于CSS-BFC深入理解](https://juejin.im/post/6844903476774830094)
* [CSS中BFC原理及其用处](https://www.jianshu.com/p/3e1345db02cb)
