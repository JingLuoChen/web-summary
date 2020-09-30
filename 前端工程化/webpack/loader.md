# loader
## 概述
webpack本身只能处理javascript模块，如果要处理其他类型的文件，就需要loader进行转换。<br>
loader可以理解为模块和资源的转换器，即预处理器，让webpack处理非js文件（scss转css等等）

## 目标
* 识别出应该被loader转化的文件，使用test属性
* 转换文件，使他们加到依赖图中，最终添加到bundle中，使用use属性

## 配置
```$xlst
{
    test: String,
    use: String | Array 
}

test --- 通过扩展名称和正则表达式来匹配资源文件
use --- 匹配到的资源会应用loader，执行顺序是从后到前
```
所有的loader都可以配置以下项目
test: 用来对文件名进行匹配测试，推荐使用正则表达式<br>
exclude： 被排除的文件名<br>
include: 包含的文件名<br>
loader: 逗号分割的loaders<br>
loaders: loader数组<br>

* 最佳实践
```$xlst
只有在test和文件名匹配中使用正则表达式，在include和exclude中使用绝对路径数组，避免exclude，更倾向于使用include
```

## 样式相关的loader配置
style-loader => 将css样式以style的方式加载到脚本文件中，样式起作用<br>
css-loader => css文件可以直接作为模块加载到其他脚本文件中<br>
postcss-loader => 兼容性，加厂商前缀，需要一个配置文件postcss.config.js<br>
less-loader / sass-loader / babel-loader ...

* 执行顺序：less-loader ->  postcss-loader -> css-loader -> style-loader
## 图片相关的loader配置
file-loader => 文件加载器，url或其他文件，图片较大时的图片文件<br>
url-loader => 将指定格式的文件，转为base64格式图片，一般用于重复性小图标，可以指定在文件大小小于限制时，返回DataURL

* url-loader可以设置将资源大小小于10K的资源转换为base64，即limit设置很重要，超过限制会将图片拷贝到dist文件中，将资源转换为base64，可以减少网络请求，
但base64数据大，会导致加载变慢

## loader执行顺序
loader是从右向左的取值/执行

```$xslt
// 例处理css文件

{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }, {
      loader: 'sass-loader'
    }
  }]
}

loader处理顺序：sass-loader postcss-loader css-loader style-loader
```
### 什么是options
query和options都是当前loader需要的特殊配置（可选），webpack2.5之前是query，之后是options

* 不同的loader有不同的配置
