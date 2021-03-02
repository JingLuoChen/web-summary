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
        main: './src/index.js',
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
                collapseWhitespace: true,
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
    entry: './src/index.js',
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
    // 可以将node_modules中代码单独打包成一个chunk最终输出
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```
