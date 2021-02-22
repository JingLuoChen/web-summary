# devServer - 热更新
开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
特点：只会在内存中编译打包，不会有任何输出  --- 注意webpack5编译打包之后是由build目录生成的
启动devServer指令为：npx webpack-dev-server

```js
const webpack = require('webpack');
module.exports = {
    //....
    devServer: {
        // 项目构建后的路径
        contentBase: resolve(__dirname, 'built'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开默认浏览器
        open: true 
    },
}
```


