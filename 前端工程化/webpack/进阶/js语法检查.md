# js语法检查
语法检查：eslint-loader eslint 

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
            {
                // 只检查自己写的源代码，不要检查第三方库的代码
                // 设置语法检查的规则 可以在package.json中设置
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
```

## js兼容性处理
js兼容性处理使用babel-loader @babel-core 

1、基本js语法兼容性处理 --- @babel/preset-env

只能转换处理基本语法，例如promise语法不能转换

2、全部js语法兼容性处理 --- @babel/polyfill --- 只要引入即可

问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大

3、需要做兼容性处理的就做：按需加载 --- core.js



```js
const {resolve} = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    // 预设：指示babel做怎么样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定corejs的版本
                                corejs: {
                                    version: 3
                                },
                                // 兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    }
    
}
```
