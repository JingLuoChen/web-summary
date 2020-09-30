# plugin插件
## 概述
plugin是用来扩展webpack功能的，通过在构建流程里注入钩子实现，给webpack带来里很大的灵活性<br>

loader用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，包括打包优化，资源管理，注入环境变量

* webpack在打包过程中需要使用到plugin，而什么时候使用plugin则根据plugin的具体实现而定
