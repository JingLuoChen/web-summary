# 提取css成单独文件
使用插件 mini-css-extract-plugin 进行提取css文件，css文件将通过link的方式引入到html文件中
```js
const {resolve} = require('path')
module.exports =  {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: '/\.css$/',
                // MiniCssExtractPlugin.loader取代style-loader 成单独文件
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名操作
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}
```

## css兼容性处理
css兼容性处理: postcss --- postcss-loader postcss-preset-env

## css代码压缩处理
optimize-css-assets-webpack-plugin
