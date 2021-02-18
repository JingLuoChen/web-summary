# 每次打包前清空dist目录
使用插件clean-webpack-plugin来清空dist目录

安装依赖
```
npm install clean-webpack-plugin -D
```

以前，clean-webpack-plugin是默认导出的，现在不是
```js
//webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    //...
    plugins: [
        //不需要传参数喔，它可以找到 outputPath
        new CleanWebpackPlugin() 
    ]
}
```

现在在修改文件，重现构建，生成的hash值和之前dist中的不一样，但是因为每次clean-webpack-plugin都会帮我们先清空一波dist目录，所以不会出现太多文件

## 希望dist目录下某个文件夹不被清空
有些时候，我们并不希望整个dist目录都被清空，比如，我们不希望，每次打包的时候都删除dll目录下的文件或子目录

clean-webpack-plugin为我们提供了参数cleanOnceBeforeBuildPatterns

```js
//webpack.config.js
module.exports = {
    //...
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        })
    ]
}
```
