# canvas
## canvas简介
### canvas是什么？
是HTML5中重要的元素，和audio、video元素类似完全不需要任何外部插件就能够运行，
canvas中文翻译就是画布的意思，它提供了强大的图形的处理功能（绘制、变化、像素处理）

但是需要注意的是，canvas元素本身并不绘制图形，它只是相当于一张空白画布，如果开发者需要向canvas上绘制图形，则必须使用javascript脚本进行绘制

### canvas能够做什么？
```
1、基础图形的绘制
2、文字的绘制
3、图形的变形和图片的合成
4、图片和视频的处理
5、动画的实现
7、小游戏的制作
```

### 支持的浏览器
大多数现代浏览器都是支持canvas的，比如firefox、Safari、chrome、opera的最近版本以及IE9都支持

## canvas API
### height
用来控制canvas画布绘制区域的高度，单位是像素，默认高度值是150

语法：
获取高度：var pixel = canvas.height
设置高度：canvas.height = pixel

```
注意：
1、如果设置小数，浏览器不会认为是不合法的
2、如果高度是包含单位的，则会自动忽略单位，无论这个单位是px、em，还是其他的什么的
3、如果高度后面是个完全不合法的字符，则按照前面的数值进行高度解析
4、如果高度是值是负数，则chrome/firefox等浏览器下会以150像素高度呈现，而IE浏览器下则高度表现为0，这个是唯一存在兼容性差异表现的属性值
5、如果高度值缺省，则会以150像素高度呈现，这个所有浏览器下都是如此
6、CSS的height属性权重大于canvas元素的height属性权重

canvas元素本质上就是一个图片，其很多样式表现和img元素是一致的，css控制图片尺寸时候，如果高度或宽度缺省，canvas元素依然保持原始的高宽比例。
具体描述：canvas元素这里原始尺寸是300*150，css设置高度为88px，最终的宽度表现不是300而是等比例缩放的176px
```

### width
用来控制canvas画布绘制区域的宽度，单位是像素，默认宽度是150

语法：
获取宽度：var pixel = canvas.width;
设置宽度：canvas.width = pixel;

```
注意：
1、如果设置小数，浏览器不会认为是不合法的
2、如果宽度是包含单位的，则会自动忽略单位，无论这个单位是px、em，还是其他什么
3、如果宽度值后面是个完全不合法的字符，则按照前面的数值进行宽度解析
4、如果宽度值是负值，则chrome/firefox等浏览器下会以150像素高度呈现，而IE浏览器下则高度表现为0，这个是唯一存在兼容性差异表现的属性值
5、如果宽度值缺省，则会以300像素宽度呈现，这个所有浏览器下都是如此
6、CSS的width属性权重要大于canvas元素的width属性权重

canvas元素本质上就是一个图片，其很多样式表现和img元素是一致的，css控制图片尺寸时候，如果高度或宽度缺省，canvas元素依然保持原始的高度比例。
具体描述：canvas元素这里原始尺寸是300*150，css设置宽度为188px，最终的高度表现不是150而是等比例缩放的94px
```

### getContext
getContext方法可以返回canvas的绘制上下文，"上下文"是计算机领域的一个术语，类似于小说中的藏经阁，现实世界的工具箱，表示一种特殊的环境。
在这个环境中，我们就能做一些特殊的事情，对于canvas而言，我们可以借助其上下文绘制各种图形和效果。

语法：
var context = canvas.getContext(contextType)
var context = canvas.getContext(contextType, contextAttributes)

这里的context就是canvas的绘制上下文

```
参数说明：
contextType
    支持参数包括下面这些：
    1、'2d'：会创建并返回一个CanvasRenderingContext2D对象，主要用来进行2d绘制，也就是二维绘制，平面绘制
    2、'webgl'或'experimental-webgl'：返回一个WebGLRenderingContext(WebGL渲染上下文)对象，WebGL是一种3D绘图协议，可以为HTML5 Canvas提供硬件3D加速渲染
    3、'webgl2'：返回一个WebGLRenderingContext对象，可以用来绘制三维3D效果
    4、'bitmaprenderer'：创建一个ImageBitmapRenderingContext(位图渲染上下文)，可以借助给定的ImageBitmap替换Canvas的内容
    
contextAttributes
    contextAttributes为一个纯对象参数，该参数对象支持的属性值具体如下：
    
```
```
返回值
无论getContext()方法中的参数是什么，其返回值都可以称之为RenderingContext，在细分可以包括下面这些
'2d'：参数值对应的CanvasRenderingContext2D
'webgl'或'experimental-webgl'：参数值对应的WebGLRenderingContext
'webgl2'：参数值对应的WebGL2RenderingContext
'bitmaprenderer'：参数值对应的ImageBitmapRenderingContext
```







