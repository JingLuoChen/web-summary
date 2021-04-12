# 水平垂直居中
## 使用flex进行水平垂直居中设置
```$xlst
#container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
使用flex可以快速对容器内部的元素进行水平垂直居中对齐

## 水平居中
### 行内元素的水平居中
要实现行内元素的水平居中，只需要把行内元素包裹在块级父层元素中，并且在父层元素设置text-align
```$xlst
#container {
  text-align: center;
}
```

### 块状元素的水平居中
要实现块状元素的水平居中，只需要将它的左右外边距设置为auto，即可实现块状元素的居中
```$xlst
#container {
  margin: 0 auto;
}
```
### 多个块状元素的水平居中
要实现多个水平排列的块状元素的水平居中，传统的方法是将要水平排列的块状元素设置为display: inline-block,然后在父级元素上设置text-align，达到水平居中效果
```$xlst
#container {
  text-align: center;
}
#center {
  display: inline-block;
}
```

## 已知高度宽度元素的水平垂直居中
### 绝对定位与负边距实现
利用绝对定位，将元素的top和left属性都设置为50%，在利用margin边距，将元素回拉它本身高宽的一半，实现垂直居中
```$xlst
#container {
  position: relative;
}
#center {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}
```
### 绝对定位与margin
利用绝对定位与margin，但是无需知道被垂直居中元素的高和宽
```$xlst
#container {
  position: relative;
}
#center {
  position:absolute;
  margin:auto;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
```

## 未知高度和宽度元素的水平
### 当要被居中的元素是inline或者inline-block元素
当要被居中的元素是inline或者inline-block的时候，可以巧妙的将父级容器设置为display: table-cell，配合text-align: center和vertical-align: middle，即可以实现水平垂直居中
```$xlst
#container {
  display: table-cell;
  text-algin: center;
  vertical-align: middle;
}
```

### CSS3显示威力
利用CSS3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。
```$xlst
#container {
 position: relative;
}
# center {
 position: absolution;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
```

### flex布局轻松解决
使用flex布局，无需绝对定位等改变布局的操作，可以轻松实现元素的水平垂直居中。
```$xlst
#container{
  display: flex;
  justify-content:center;
  align-items: center;
}
```

## 参考文档

* [【前端攻略】最全面的水平垂直居中方案与flexbox布局](https://www.cnblogs.com/coco1s/p/4444383.html)

