# mode
将mode增加到webpack.config.js文件中：
```js
module.exports = {
    //....
    mode: "development",
    module: {
        //...
    }
}
```
mode配置项，告知webpack使用相应模式的内置优化

mode配置项，支持以下两个配置：
* development：将process.env.NODE_ENV的值设置为development，启用NamedChunksPlugin和NamedModulesPlugin
* production：将process.env.NODE_ENV的值设置为production，启用FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin

