# code split --- 代码分割
文件打包分割成多个文件--- 这样文件可以并行加载、文件可以实现按需加载

## 根据入口文件进行代码分割
多入口形式 --- 有一个入口，最终输出就有一个bundle  --- 多页面应用的形式

问题：很难指定多个入口，不太灵活

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        main: './src/index.md',
        test: './src/test.js'
    },
    output: {
        // [name]会取文件名
        filename: 'js/[name]].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 删除空格
                collapseWhitespace: true,
                // 删除注释
                removeComments: true
            }
        })
    ],
    mode: 'production',
    devtool: 'source-map'
}
```

## optimization

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.md',
    output: {
        filename: 'js/build.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production',
    devtool: 'source-map',
    // 1、单入口-多入口都可以将node_modules中代码单独打包成一个chunk最终输出
    // 2、自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk文件，不会重复打包的
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```
optimizations对于单入口文件会将node_modules中的代码单独打包成一个chunk文件输出

## 通过js代码，让某个文件被单独打包成一个chunk
通过在对应js文件中加入动态导入语法，能将某个文件单独打包，配置语法中可以添加注释，这样打包的文件名为test文件
```js
// 一定会为test文件进行单独打包
import(/* webpackChunkName: 'test'*/'./test').then((result) => {
    console.log('文件加载成功')
    console.log(result)
}).catch(() => {
    console.log('文件加载失败')
})
```
