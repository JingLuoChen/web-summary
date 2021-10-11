# 巧用margin/padding的百分比值实现高度自适应
当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的

## 设置容器的padding-bottom/top
使用margin/padding的百分比值来解决自适应高度的关键在于：容器margin/padding的百分比参照物是父元素的宽度，
而容器的width的百分比参照物也是父元素的宽度，俩属性参照物一致，那么想要把这俩属性的值统一起来就很简单了。
```
#container {
  width: 50%;  //父元素宽度的一半
  background-color: red;  //仅为了方便演示
}
.placeholder {
  padding-top: 50%; // 与width: 50%;的值保持一致，也就是相当于父元素宽度的一半。
}
```

## 用处
多用于占位，闪烁问题

## 参考文档
* [巧用margin/padding的百分比值实现高度自适应（多用于占位，避免闪烁）](https://segmentfault.com/a/1190000004231995)
