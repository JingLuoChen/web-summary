# plugin插件
## 概述
plugin是用来扩展webpack功能的，通过在构建流程里注入钩子实现，给webpack带来里很大的灵活性<br>

loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，包括打包优化，资源管理，注入环境变量

* webpack在打包过程中需要使用到plugin，而什么时候使用plugin则根据plugin的具体实现而定

## 常见的plugin
* define-plugin：定义环境变量<br>
* ignore-plugin：忽略部分文件<br>
* html-webpack-plugin：简化HTML文件的创建（依赖于html-loader）<br>
* web-webpack-plugin：可方便地为单页应用输出HTML，比html-webpack-plugin好用<br>
* uglifyjs-webpack-plugin：不支持ES6压缩<br>
* terser-webpack-plugin：支持压缩ES6<br>
* webpack-parallel-uglify-plugin：多进程执行代码，提示构建速度<br>
* mini-css-extract-plugin：分离样式文件，css提取为独立文件，支持按需加载（替代extract-text-webpack-plugin）<br>
* serviceworker-webpack-plugin：为网页应用增加离线缓存功能<br>
* clean-webpack-plugin：目录清理<br>
* ModuleConcatenationPlugin：开启Scope Hoisting<br>
* speed-measure-webpack-plugin：可以看到每个loader和plugin执行消耗时间（整个打包消耗时间、每个plugin和loader消耗时间）<br>
* webpack-bundle-analyzer：可视化webpack输出文件的体积（业务组件、依赖第三方模块）

## 提高效率的插件
* webpack-dashboard：可以更友好的展示相关打包信息<br>
* webpack-merge：提取公共配置，减少重复配置代码<br>
* speed-measure-webpack-plugin：简称SMP，分析出webpack打包过程中loader和plugin的耗时，有助于找到构建过程中的性能瓶颈<br>
* size-plugin：监控资源体积变大，尽早发现问题<br>
* HotModuleReplacementPlugin：模块热替换<br>




