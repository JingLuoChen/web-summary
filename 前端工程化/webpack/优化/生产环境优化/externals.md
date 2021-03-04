# externals
防止将某一些包打包到最终输出的bundle中，处理有些包是通过cdn引入的，那么这样配置就不会把其打包到bundle文件中，这样速度会快点

`````js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.expert = {
    entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }) 
    ],
    mode: 'production',
    externals: {
       // 忽略库名： npm包名
       // 拒绝将vue 和 echarts进行打包，从而使用cdn的引入方式读取，即在index.html中要对应引入cdn资源文件
       vue: 'Vue',
       echarts: 'echarts',
    },
}
`````
