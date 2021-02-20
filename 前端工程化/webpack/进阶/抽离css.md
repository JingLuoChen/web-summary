# 抽离css
有些时候，我们可能会有抽离css的需求，即将css文件单独打包，这可能是因为打包成一个js文件太大，影响加载速度，也有可能是为了缓存（例如：只有js部分有改动）

mini-css-extract-plugin 和 extract-text-webpack-plugin 相比
```
1、异步加载

2、不会重复编译---性能更好

3、更容易使用

4、只适用css
```
