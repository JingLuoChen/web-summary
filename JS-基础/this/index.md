 # this
### this的定义
>this是在执行上下文创建时确定的一个在执行过程中不可更改的变量

### 什么是执行上下文
>所谓执行上下文，就是javaScript引擎在执行一段代码之前将代码内部会用到的一些变量、函数、this提前声明然后保存在变量对象中的过程

>this只在函数调用阶段确定，也就是执行上下文创建的阶段进行赋值，保存在变量对象中<br>
这个特性也导致了this的多变性：即当函数在不同的调用方式下都可能会导致this的值不同

### 严格模式和非严格模式下的this表现不同

```js
// 1、严格模式下
'use strict';
var a = 1;
function fun() {
  var a = 2;
  return this.a;
}
fun(); // 报错 Cannot read property 'a' of undefined

// 严格模式下 this指向undefined
```
```js
// 2、非严格模式
var a = 1;
function fun() {
  var a = 2;
  return this.a;
}
fun(); // 1

// 非严格模式下 this指向window
```
>当函数独立调用的时候，在严格模式下它的this指向undefined<br>
在非严格模式下，当this指向undefined的时候，自动指向全局对象(浏览器中就是window)

```js
var a = 1000;
var obj = {
  a: 1,
  b: this.a + 1
}
function fun() {
  var obj = {
    a: 1,
    c: this.a + 2 // 严格模式下这块报错 Cannot read property 'a' of undefined 非严格不报错 值的是window
  }
  return obj.c;
}
console.log(fun()); // 1002
console.log(obj.b); // 1001
```
> 当obj在全局声明的时候，obj内部属性中的this指向全局对象<br>
当obj在一个函数中声明的时候，严格模式下this会指向undefined，非严格模式自动转为指向全局对象

### 函数的调用方式
#### 在全局函数或是普通函数中直接调用
```js
var a = 1;
function fun() {
  var a = 2;
  return this.a;
}
fun(); // 1
```
#### 作为对象的方法
```js
var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
}
console.log(obj.b()) // 2
```
>作为obj的一个方法调用，这时候this指向调用它的对象，即obj对象，a就是2
```js
var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
}
var t = obj.b;
console.log(t()); // 1
```
>obj对象的b属性存储的是对该匿名函数的一个引用，可以理解为指针，当赋值给t的时候，并没有单独开辟内存空间，而是让t存储了一个指针，该指针指向这个函数

>调用t，相当于直接调用fun()，那么this指向的就是浏览器中的window
#### 使用apply或者call
```js
var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
}
obj.b() // 2
obj.b.call(obj) // 2
```
>call或者apply会改变this的指向，函数b中的this便指向了obj对象，那么a的值就是obj中定义的a的值
#### 作为构造函数
>何为构造函数？<br>
所谓构造函数就是用来new对象的函数，像Function、Object、Date、Array等都是全局定义的构造函数<br>
注意构造函数首字母大写
```js
function Fun() {
  this.name = 'Damonre';
  this.age = 21;
  this.sex = 'man';
  this.run = function () {
    return this.name + '正在跑步';
  }
}
Fun.prototype = {
  contructor: Fun,
  say: function () {
    return this.name + '正在说话';
  }
}
var f = new Fun();
f.run(); // Damonare正在跑步
f.say(); // Damonare正在说话
```
>如果函数作为构造函数使用，那么其中的this就代表它即将new出来的对象
* new做了什么？
```js
function Fun() {
  // new做的事情
  var obj = {};
  obj.__proto__ = Fun.prototype;//Base为构造函数
  obj.name = 'Damonare';
  ...//一系列赋值以及更多的事
  return obj
}
```
>创建一个临时对象<br>
给临时对象绑定原型<br>
给临时对象对象属性赋值<br>
将临时对象return

```js
function Fun() {
  this.name = 'Damonre';
  this.age = 21;
  this.sex = 'man';
  this.run = function () {
    return this.name + '正在跑步';
  }
}
Fun();
console.log(window)
```
>直接调用一个函数，this在非严格模式下指向window
#### 箭头函数
```js
var a = 1;
var obj = {
  a: 2
};
var fun = () => console.log(this.a);
fun(); // 1
fun.call(obj) // 1
```
>箭头函数会捕获其所在上下文的this值，作为自己的this值
```js
var a = 1;
var obj = {
  a: 2
};
function fun() {
    var a = 3;
    let f = () => console.log(this.a);
      f();
};
fun(); // 1
fun.call(obj); // 2
```
>this为window，此时指向的是全局window中的a<br>
call会改变this的指向，此时指向的是obj中的a

## 参考文档
* [JavaScript中的this](https://juejin.im/post/59748cbb6fb9a06bb21ae36d)
