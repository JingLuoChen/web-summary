# plugin插件
## 概述
plugin是用来扩展webpack功能的，通过在构建流程里注入钩子实现，给webpack带来里很大的灵活性<br>

loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，包括打包优化，资源管理，注入环境变量

* webpack在打包过程中需要使用到plugin，而什么时候使用plugin则根据plugin的具体实现而定

## 常见的plugin
* define-plugin：定义环境变量<br>
* ignore-plugin：忽略部分文件<br>
* html-webpack-plugin：简化HTML文件的创建（依赖于html-loader）<br>
* web-webpack-plugin：可方便地为单页应用输出HTML，比html-webpack-plugin好用<br>
* uglifyjs-webpack-plugin：不支持ES6压缩<br>
* terser-webpack-plugin：支持压缩ES6<br>
* webpack-parallel-uglify-plugin：多进程执行代码，提示构建速度<br>
* mini-css-extract-plugin：分离样式文件，css提取为独立文件，支持按需加载（替代extract-text-webpack-plugin）<br>
* serviceworker-webpack-plugin：为网页应用增加离线缓存功能<br>
* clean-webpack-plugin：目录清理<br>
* ModuleConcatenationPlugin：开启Scope Hoisting<br>
* speed-measure-webpack-plugin：可以看到每个loader和plugin执行消耗时间（整个打包消耗时间、每个plugin和loader消耗时间）<br>
* webpack-bundle-analyzer：可视化webpack输出文件的体积（业务组件、依赖第三方模块）

## 提高效率的插件
* webpack-dashboard：可以更友好的展示相关打包信息<br>
* webpack-merge：提取公共配置，减少重复配置代码<br>
* speed-measure-webpack-plugin：简称SMP，分析出webpack打包过程中loader和plugin的耗时，有助于找到构建过程中的性能瓶颈<br>
* size-plugin：监控资源体积变大，尽早发现问题<br>
* HotModuleReplacementPlugin：模块热替换<br>

## HtmlWebpackPlugin
HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务

* 作用
默认会创建一个空的HTML，自动引入打包输出的所有资源（js/css）

* 安装
```
npm install --save-dev html-webpack-plugin
```

* 基本用法

该插件为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包，只需添加插件到你的webpack配置

````js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
````

这将会产生一个包含以下内容的文件dist/index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```
如果你有多个webpack入口点，他们都会在生成的HTML文件中的script标签内

当然你也可以有自己的模版html文件，webpack会自动插入script脚本到模版文件中

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //...
    plugins: [
        // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            /// 复制src下的index.html文件，并自动引入打包输出的所有资源（js/css）
            template: './public/index.html',
            filename: 'index.html', // 打包后的文件名
            minify: {
                removeAttributeQuotes: false, // 是否删除属性的双引号
                collapseWhitespace: false, // 是否折叠空白
            },
            // hash: true // 是否加上hash，默认是 false
        })
    ]
}
```
以上会在dist目录下新增index.html文件，并其中自动插入了script脚本，引入的是我们打包之后的js文件，index.html文件是以public目录下的index.html为模版导出的




