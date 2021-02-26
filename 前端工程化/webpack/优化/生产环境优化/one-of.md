# one-of
其中的loader只会匹配一个，不能有两个配置处理同一种类型文件即当es-loader 和 babel-loader 都处理js文件，只会一个生效

作用：只要是提示构建速度

```js
const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizCssAssetsWebpackPlugin = require('optimiz-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                // 正常来讲，一个文件只能被一个loader处理
                // 当一个文件要被多个loader处理，那么一定要指定loader的执行的先后顺序 先执行eslint-loader 在执行babel-loader 语法没问题在进行转换
                 
                // js语法检查
                // 在package.json中的eslintConfig --- airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            },
            {
                oneOf: [
                     {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
                    
                    {
                        // js兼容性检查
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
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
                    },
                    {
                        test: /\(jpg|png)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:8].[ext]',
                            esMoudle: false,
                            outputPath: 'img'
                        }
                    },
                    {
                        // html文件中的图片资源处理
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        // 其他资源文件
                        exclude: /\.(js|html)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            }
            
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
        }),
        // 抽离css文件
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        }),
        // 压缩css
        new OptimizCssAssetsWebpackPlugin()
    ],
    mode: 'production'
}
```
