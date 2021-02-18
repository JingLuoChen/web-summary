# 处理html中的本地图片
安装html-withimg-loader来解决
```
npm install html-withimg-loader -D
```

修改webpack.config.js：
```js
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}
```
