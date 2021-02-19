# devServer - 热更新
1、首先配置devServer的hot为true

2、并且在plugins中增加new webpack.HotModuleReplacementPlugin()

```js
const webpack = require('webpack');
module.exports = {
    //....
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ]
}
```

我们配置了HotModuleReplacementPlugin之后，会发现，此时我们修改代码，仍然是整个页面都会刷新，不希望整个页面刷新，还需要修改入口文件

3、在入口文件中新增
```js
if(module && module.hot) {
    module.hot.accept()
}
```

此时，在修改代码，不会造成整个页面的刷新


