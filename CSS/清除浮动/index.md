# 清除浮动
## 为什么需要清除浮动
当使用元素浮动之后，如果没有清除浮动的话，会出现如下问题

1、文字围绕浮动元素排版，但我们可能希望文字排列在浮动元素下方，或者我们并不希望文字两边有浮动元素存在

2、浮动元素排版超出了其父级元素，父级元素的高度出现了塌陷，若没有文字高度的支撑，不考虑边框，父级元素高度会塌陷缩成0

3、浮动元素甚至影响到了父级元素的兄弟元素排版，因为浮动元素脱离了文档流


## 清除浮动的方法
### 利用clear样式
```$xslt
.textDiv {
    color: blue;
    border: 2px solid blue;
    clear: left;
}
```
### 父元素结束标签之前插入清除浮动的块级元素
```$xslt
<div class="topDiv">
  <div class="textDiv">...</div>
  <div class="floatDiv">float left</div>    
  <div class="blankDiv"></div>
</div>
<div class="bottomDiv">...</div>
```
```$xslt
.blankDiv {
  clear: both; // or left
}
```

* 注意在父级元素末尾添加的元素必须是一个块级元素，否则无法撑起父级元素高度

### 利用伪元素（clearfix）
```$xslt
<div class="topDiv clearfix">
    <div class="textDiv">...</div>
    <div class="floatDiv">float left</div>
</div>
<div class="bottomDiv">...</div>
```
```$xslt
.clearfix:after {
    content: '.';
    height: 0;
    display: block;
    clear: both;
}
```
* 在父元素最后添加了一个:after伪元素，通过清除伪元素的浮动，达到撑起父元素高度的目的，注意到该伪元素的display值为block

### 利用overflow清除浮动 ---  形成块级格式化上下文

## 参考文档

* [清除浮动的四种方式及其原理理解](https://juejin.im/post/6844903504545316877)
