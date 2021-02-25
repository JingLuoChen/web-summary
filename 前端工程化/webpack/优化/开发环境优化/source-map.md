# source-map
source-map：一种提供源代码到构建后代码映射技术

如果构建后代码出错了，通过映射可以追踪源代码错误

```js
module.exports = {
    devtool: 'source-map'
}
```
```
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

source-map: 外部
 错误代码准确信息和源代码的错误位置

inline-source-map: 内联 ----- 只生成一个内联source-map
 错误代码准确信息和源代码的错误位置

hidden-source-map: 外部---重新生成一个map文件
 错误代码错误原因，但是没有错误位置，不能追踪到源代码错误，只能提示到构建后代码的错误位置---为了隐藏源代码

eval-source-map: 内联 --- 每一个文件都生成对应的source-map，都在eval中
 错误代码准确信息和源代码的错误位置 
 
nosources-source-map: 外部
 错误代码的准确信息，但是没有任何源代码信息---为了隐藏源代码

cheap-source-map: 外部
 错误代码准确信息和源代码的错误位置
 只精确到行，不到列，只能知道代码哪一行出错，但不能精确到列

cheap-module-source-map: 外部
 错误代码准确信息和源代码的错误位置
 module会将loader的source map加入
 

内联与外联的区别：1、外部生成了文件 2、内联构建速度更快 
```

## 结合使用
开发环境：速度快，调试更友好
 
 速度快 eval > inline > cheap > ...
 
 eval-cheap-source-map 更快 > eval-source-map
  
 调试更友好
 
 source-map > cheap-module-source-map > cheap-source-map
 
 最好 eval-source-map(vue默认使用这种映射关系) > eval-cheap-module-source-map
 

生产环境：源代码要不要隐藏，调试要不要更友好

 生产环境下不要使用内联的方式，推荐使用外联
 
 nosources-source-map 全部隐藏 > hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
 
 最好 source-map > cheap-module-source-map
