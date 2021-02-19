# devServer - 热更新
1、首先配置devServer的hot为true

2、并且在plugins中增加new webpack.HotModuleReplacementPlugin()

开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
特点：只会在内存中编译打包，不会有任何输出
启动devServer指令为：webpack-dev-server

```js
const webpack = require('webpack');
module.exports = {
    //....
    devServer: {
        contentBase: resolve(__dirname, 'built'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
    },
}
```


