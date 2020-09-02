# 水平垂直居中
## 使用flex进行水平垂直居中设置
```$xlst
#container{
  display: flex;
  justify-content: center;
  align-items: center;
}
```
使用flex可以快速对容器内部的元素进行水平居中对齐

## 水平居中
### 行内元素的水平居中
要实现行内元素的水平居中，只需要把行内元素包裹在块级父层元素中，并且在父层元素设置text-align
```$xlst
#container{
  text-align: center;
}
```

### 块状元素的水平居中
要实现块状元素的水平居中，只需要将它的左右外边距设置为auto，即可实现块状元素的居中
```$xlst
#container{
  margin: 0 auto;
}
```
### 多个块状元素的水平居中
要实现多个水平排列的块状元素的水平居中，传统的方法是将要水平排列的块状元素设置为display: inline-block,然后在父级元素上设置text-align，达到水平居中效果
```$xlst
#container{
  text-align: center;
}
#center{
  display: inline-block;
}
```

## 参考文档

* [【前端攻略】最全面的水平垂直居中方案与flexbox布局](https://www.cnblogs.com/coco1s/p/4444383.html)
