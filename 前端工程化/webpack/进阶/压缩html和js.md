# 压缩html和js
## js压缩

设置mode为production，生产环境下会自动压缩js代码，webpack自身的插件UglifyJsPlugin会进行js代码的压缩

为什么自身只压缩js代码 ---  因为webpack只能处理js文件和json文件，其余文件不识别

## 压缩html
直接通过html-webpack-plugin插件进行压缩html代码

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ]
}
```
