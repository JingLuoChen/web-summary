# 作用域和作用域链
## 作用域
> 作用域是在运行时代码中的某些特定部分中的变量、函数和对象的可访问性<br>
即作用域决定了代码区块中变量和其他资源的可见性<br>
作用域就是一个独立的地盘，让变量不会外泄、暴露出去<br>
作用: 隔离变量，不同作用域下的同名变量不会发生覆盖冲突<br>
ES6之前没有块级作用域，只有全局作用域和函数作用域

### 1、全局作用域
> 全局变量: 生命周期将存在于整个程序之内，能被程序中的任何函数或者方法访问，在js内默认是可以被修改的

### 2、函数作用域
>函数作用内，对外是封闭的，从外层的作用域无法直接访问函数内部的作用域
```$xslt
  function f() {
    var a = 1; // 此处就是函数作用域
  }
  console.log(a) // // 报错：ReferenceError: a is not defined
```
>如何访问函数内的变量？
```$xslt
1、通过return访问函数内部变量
  function add(value) {
    let a = 10
    return a + value
  }
  console.log(add(10)) => 20
  
2、通过闭包访问函数内部变量
  function helloWorld(value) {
    let str = 'hello ';
    let rusult = str + value;
    function say() {
      return rusult;
    };
    return say();
  }
  console.log(helloWorld('world!'));		// "hello world"

3、立即执行函数 -> 也是ES5可用于封装模块的做法（问题就是内存泄漏）
  let moudlea = (function() {
    let flag = true;
    let add = function (a, b) {
        return a + b
    };
    return {
     flag,
     add
    }
  })();
  console.log(moudlea.flag)      // true
  console.log(moudlea.add(1,2))  // -> 3
  // 即能够自动执行闭包里面的内容，消除全局变量的影响
 
```
### 3、块级作用域
>块级作用域可通过新增命令let 和 const 命名声明，所声明的变量在指定块的作用域外无法被访问

```$xslt
块级作用域在如下情况被创建：
  1、在一个函数内部
  2、在一个代码块内部(由一对花括号包裹)
  
  for(let i = 0; i < 5; i++) {
    // ...
  }
  console.log(i)  // 报错：ReferenceError: i is not defined
  // 原因: 代码块外不能访问块级作用域内部的变量
```
>特点: <br>
1、声明变量不会提升到代码块顶部<br>
2、禁止重复声明<br>
3、循环中的绑定块作用域的妙用 -> 即解决经典闭包面试问题

## 作用域链


## 参考文档
* [谈谈js的作用域](https://juejin.im/post/5abb99e9f265da2392366824)
* [深入理解 JavaScript 作用域和作用域链](https://juejin.im/post/5c8290455188257e5d0ec64f)


