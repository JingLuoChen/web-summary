# 前端模块化理解
## 为什么需要模块化
### 潜在问题
>* 问题1、在之前没有模块化的概念时，所以的js文件都是通过script引入，这导致当不同的人在不同的js文件中命名变量时，会出现重名的情况<br>
那么，当引入之后，就会出现变量值被覆盖等情况
>* 问题2、js文件之间没法复用相关的方法和变量，导致代码出现冗余
### 模块化的优点
>模块化的开发可以提高代码的复用率，方便进行代码的管理，通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数

## AMD和require.js
>AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行，所有依赖这个模块的语句都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

* 这里介绍用require.config()指定引用路径等，用define()定义模块，用require()加载模块
>首先我们需要引入require.js文件和一个入口文件main.js，main.js中配置require.config()并规定项目中用到的基础模块
```js
// 网页中引入require.js及main.js 
<script src="js/require.js" data-main="js/main"></script>

// main.js入口文件/主模块 
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```
>引用模块的时候，我们将模块名放到[]中作为require()的第一参数；如果我们定义的模块本身也依赖其他模块，那就需要将它们放到[]中作为define()的第一参数
```js
// 定义math.js模块
define(function () {
    var basicNum = 0;
    var add = function (x, y) {
        return x + y;
    };
    return {
        add: add,
        basicNum :basicNum
    };
});
// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})
// 引用模块，将模块放在[]内
require(['jquery', 'math'],function($, math){
  let sum = math.add(10,20);
  $("#sum").html(sum);
});
```
## CMD和sea.js
>CMD是另一种js模块化方案，它与AMD很类似，不同点在于：<br>
AMD推崇依赖前置、提前执行<br>
CMD推崇依赖就近、延迟执行
```js
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});
// CMD写法 
define(function(require, exports, module) {
    let a = require('./a') // 在需要时申明
    a.doSomething()
    if (false) {
        let b = require('./b')
        b.doSomething();
    }
});
// sea.js 
// 定义模块 math.js
define(function(require, exports, module) {
  let $ = require('jquery.js')
  let add = function(a,b){
     return a+b
  }
  exports.add = add
})
// 加载模块
seajs.use(['math.js'], function(math){
  let sum = math.add(1+2)
})
```
## CommonJS
>Node.js是CommonJS规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：<br>
module、exports、require、global

* 实际使用时，用module.exports定义当前模块对外输出的接口（不推荐直接使用exports），用require加载模块
```js
// 定义模块math.js
let basicNum = 0
function add(a, b) {
  return a + b
}
module.exports = { // 在这里写上需要向外暴露的函数、变量
  add: add,
  basicNum: basicNum
}

// 引用自定义的模块时，参数包含路径，可省略.js
let math = require('./math')
math.add(2, 5)

// 引用核心模块时，不需要带路径
let http = require('http')
http.createService(...).listen(3000)
```
>CommonJS用同步的方式加载模块<br>
在服务端，模块文件都存在本地磁盘，读取速度非常快<br>
在浏览器，限于网络原因，更合理的方案是使用异步加载

### 补充 module.exports 和 exports
>exports只是module.exports的引用，即它们指向的是同一个内存地址<br>
如果直接给exports重新赋值的话，这样修改是无效的，因为导出的依然是module.exports（这里是隐式的，默认就是导出的module.exports）<br>
如果是给exports添加一些属性或者方法的话，因为这样也会直接修改module.exports，所以会有效

```js
//utils.js
let a = 100
console.log(module.exports) // 能打印出结果为：{}
console.log(exports) // 能打印出结果为：{}

exports.a = 200 // 这里module.exports 的内容也会同步修改成 {a : 200}

exports = '指向其他内存区' // 这里把exports的指向指走 相当于重新给exports分配内存地址，指向的也不是原来的内存地址了

//test.js
let b = require('/utils')
console.log(b) // 打印为 {a : 200} 
```
## ES6的Module
>ES6在语言标准的层面上，实现了模块功能，其模块功能主要由两个命令构成：export 和 import<br>
export命令用于规定模块的对外接口<br>
import命令用于输入其他模块提供的功能
```js
// 导出模块 util.js
let num = 0
let add = function (a, b) {
  return a + b
}
export { num, add }

// 导入模块
import { num, add } from './util'
function test() {
   console.log(add(1 + basicNum))
}
test();
```
>export default 在导入的时候使用者可以自己命名，而不必需要使用之前的命名，对应的import语句不需要使用大括号，但只能有一个导出是这样命名的
```js
/** export default **/
//定义输出
let num = 0
let add = function (a, b) {
  return a + b
}
export default { num, add }
//引入
import mathModule from './math'
function test() {
  console.log(mathModule.add(99 + mathModule.num))
}
test()
```
## ES6模块与CommonJS模块的差异
```$xslt
1、CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用
  CommonJS模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
  ES6模块中，JS引擎对脚本静态分析的时候，遇到import时，就会生成一个只读引用，等到脚本真正执行时候，在根据这个引用到被加载的那个模块里面取值
  即ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块
2、CommonJS模块是运行时加载，ES6模块是编译时输出接口
  运行时加载：CommonJS模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后在从这个对象上面读取方法
  编译时加载：ES6模块不是对象，而是通过export命令显式指定输出的代码，import时采用静态命令的形式，即在import时可以执行加载某个输出值，而不是整个模块
```

## 参考文档
* [谈谈前端模块化](https://github.com/PDKSophia/blog.io/blob/master/JavaScript%E7%AC%94%E8%AE%B0/JavaScript%E7%AF%87-%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96.md)
