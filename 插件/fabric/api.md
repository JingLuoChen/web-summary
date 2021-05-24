# api扫盲
几个主要的api
```
1、声明画布 --- 此处可设置画布的相关属性（包括宽度、高度、背景颜色等等）
var canvas =new fabric.Canvas('main');
2、添加图形至画布
canvas.add(rect);
3、画布中插入图片
fabric.Image.fromURL('./2.png', function(oImg) {
    oImg.scale(0.1);// 图片缩小10倍 --- 对图片属性进行设置
    canvas.add(oImg);
}); 
```
