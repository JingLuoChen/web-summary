# this
### this的定义
>this是在执行上下文创建时确定的一个在执行过程中不可更改的变量

### 什么是执行上下文
>所谓执行上下文，就是javaScript引擎在执行一段代码之前将代码内部会用到的一些变量、函数、this提前声明然后保存在变量对象中的过程

>this只在函数调用阶段确定，也就是执行上下文创建的阶段进行赋值，保存在变量对象中<br>
这个特性也导致了this的多变性：即当函数在不同的调用方式下都可能会导致this的值不同

### 严格模式和非严格模式下的this表现不同

```$xslt
1、严格模式下
'use strict';
var a = 1;
function fun() {
  var a = 2;
  return this.a;
}
fun(); // 报错 Cannot read property 'a' of undefined
```
```$xslt
2、非严格模式
var a = 1;
function fun() {
  var a = 2;
  return this.a;
}
fun(); // 1
```
