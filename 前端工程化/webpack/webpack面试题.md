# webpack面试题
## 常见的loader有哪些？你用过哪些loader？
raw-loader：加载文件原始内容（utf-8）
file-loader：把文件输出到一个文件夹中，在代码中通过相对url去引用输出的文件（处理图片和字体）
url-loader：与file-loader类似，区别是用户可以设置一个阀值，大于阀值会交给file-loader处理，小于阀值时返回文件base64形式编码（处理图片和字体）

## 有哪些常见的plugin？你用过哪些plugin?
## 说一说loader和plugin的区别
## webpack的构建流程
## 使用webpack时，用过哪些可以提升效率的插件
## source map是什么？生产环境怎么用？
source map是将编译、打包、压缩后的代码映射回源代码的过程，打包压缩后的代码不具备良好的可读性，想要调试源码就需要source map

map文件只要不打开开发者工具，浏览器是不会加载的

## 模块打包原理
webpack实际上为每一个模块创造了一个可以导出和导入的环境，本质上并没有修改代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致

## 文件监听原理
在发现源码发生变化时，自动重新构建出新的输出文件

webpack开启监听模式，有两种方式：
>启动webpack命令时，带上--watch参数<br>
在配置webpack.config.js中设置watch：true

缺点：每次需要手动刷新浏览器

原理：轮询判断文件的最后编辑时间是否变化，如何某个文件发生变化，并不会立刻告诉监听者，而是先缓存起来，等aggregateTimeout后在执行

## webpack的热更新原理
## 如何对bundle体积进行监控和分析
## 文件指纹是什么？怎么用？
## 如何优化webpack的构建速度？
## 是否写过loader？简单描述下编写一个loader的思路
## 是否写过plugin？简单描述下编写plugin的思路
## babel原理
