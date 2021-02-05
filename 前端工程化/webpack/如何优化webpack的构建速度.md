# 如何优化webpack的构建速度

* 使用高版本的webpack和node
* 多进程/多实例构建：HappyPack、thread-loader
* 压缩代码
>1、多进程并行压缩<br>
2、通过mini-css-extract-plugin提取chunk中的css代码到单独文件中，通过css-loader的minimize选项开启cssnano压缩代码

