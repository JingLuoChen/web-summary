# webpack面试题
## 常见的loader有哪些？你用过哪些loader？
raw-loader：加载文件原始内容（utf-8）<br>
file-loader：把文件输出到一个文件夹中，在代码中通过相对url去引用输出的文件（处理图片和字体）<br>
url-loader：与file-loader类似，区别是用户可以设置一个阀值，大于阀值会交给file-loader处理，小于阀值时返回文件base64形式编码（处理图片和字体）<br>
source-map-loader：加载额外的Source Map文件，以方便断点调试 <br>
image-loader：加载并压缩图片文件 <br>
json-loader：加载json文件（默认包含）<br>
handlebars-loader：将Handlebars模版编译成函数并返回<br>
babel-loader：把ES6转换成ES5 <br>
ts-loader：将TypeScript转换成JavaScript <br>
awesome-typescript-loader：将TypeScript转换成JavaScript，性能优于ts-loader <br>
sass-loader：将scss/sass代码转换成css <br>
style-loader：把css代码注入到JavaScript中，通过DOM操作去加载css <br>
postcss-loader：扩展css语法，使用下一代css，可以配合autoprefixer插件自动补齐css3前缀 <br>
eslint-loader：通过eslint检查JavaScript代码 <br>
mocha-loader：加载 Mocha 测试用例的代码 <br>
coverjs-loader：计算测试的覆盖率 <br>
vue-loader：加载 Vue.js 单文件组件 <br>
i18n-loader: 国际化 <br>
cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里 <br>

## 有哪些常见的plugin？你用过哪些plugin?
define-plugin：定义环境变量（webpack4之后指定mode会自动配置）<br>
ignore-plugin：忽略部分文件 <br>
html-webpack-plugin：简化HTML文件创建（依赖于html-loader）<br>
web-webpack-plugin：可方便地为单页应用输出HTML，比html-webpack-plugin好用 <br>
uglifyjs-webpack-plugin：不支持ES6压缩（webpack4之前）<br>
terser-webpack-plugin：支持压缩ES6（webpack4）<br>
webpack-parallel-uglify-plugin：多进程执行代码压缩，提升构建速度 <br>
mini-css-extract-plugin：分离样式文件，css提取为独立文件，支持按需加载（替代extract-text-webpack-plugin）<br>
serviceworker-webpack-plugin：为网页应用增加离线缓存功能 <br>
clean-webpack-plugin：目录清理 <br>
moduleConcatenationPlugin：开启Scope Hoisting <br>
speed-measure-webpack-plugin：可以看到每个loader和plugin执行耗时 <br>
webpack-bundle-analyzer：可视化webpack输出文件的体积 <br>

## 说一说loader和plugin的区别
loader本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为webpack只认识javaScript，所以loader就成了翻译官了，对其他类型的资源进行转译的预处理工作

plugin就是插件，基于事件流框架tapable，插件可以扩展webpack的功能，在webpack运行的生命周期中会广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的api改变输出结果

loader在module.rules中配置，作为模块的解析规则，类型为数组，每一项都是object，内部包含了test（类型文件）、loader、options（参数）等属性

plugin在plugins中单独配置，类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入

## webpack的构建流程
webpack的运行流程是一个串行的过程，从开启到结束会依次执行以下流程
初始化参数：从配置文件和Shell语句中读取与合并参数，得出最终的参数
开始编译：用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的run方法开始执行编译
编译模块：从入口文件出发，调用所有配置的loader对模块进行翻译，再找出该模块依赖的模块，在递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
完成模块编译：在经过第4步使用loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，webpack会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用webpack提供的api改变webpack的运行结果

## 使用webpack时，用过哪些可以提升效率的插件
webpack-dashboard：可以更友好的展示相关打包信息
webpack-merge：提取公共配置，减少重复配置代码
speed-measure-webpack-plugin：简称SMP，分析出webpack打包过程中loader 和 plugin的耗时，有助于找到构架过程中的性能瓶颈
size-plugin：监控资源体积变化，尽早发现问题
HotModuleReplacementplugin：模块热替换

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
webpack的热更新又称热替换（Hot Module Replacement）,缩写为HMR，这个机制可以做到不用刷新浏览器而将变更的模块替换掉旧的模块

HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，
当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 
请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

## 如何对bundle体积进行监控和分析


## 文件指纹是什么？怎么用？
文件指纹是打包后输出的文件名的后缀

Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会发生更改

Chunkhash：和webpack打包的chunk有关，不同的entry会生出不同的chunkhash

Contenthash：根据文件内容来定义hash，文件内容不变，则contenthash不变





## 如何优化webpack的构建速度？
## 是否写过loader？简单描述下编写一个loader的思路
## 是否写过plugin？简单描述下编写plugin的思路
## babel原理
