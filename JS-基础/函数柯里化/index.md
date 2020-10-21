# javaScript函数柯里化
## 定义-什么是柯里化
>实际上其实就是高阶函数的一个特殊用法<br>
柯里化（currying）是一种技术，它把接受m个参数的函数变成接受n个参数的函数（0<n<m），并且该函数返回一个新函数，这个新函数接受余下的参数......如此循环，直到最后返回结果
```js
// 普通的函数
function add(a, b) {
  return a + b
}
add(1, 2) // 输出结果为3
// Currying后的函数
function curryAdd(x) {
  return function(y) {
    return x + y
  }
}
curryAdd(1)(2) // 输出的结果为3

// 即先用一个函数接受x然后返回一个函数去处理y函数
```
## 原理
>函数柯里化的原理应该就是利用闭包，不销毁作用域的前提下，不断的返回一个新的函数，直到最后返回结果<br>
这样前面的数据会一直保存的作用域中，这里就是闭包的原理（里面的函数作用域可以拿到外面作用域中的变量）
## 柯里化的好处
### 1、参数复用
```js
// 正常正则验证字符串 reg.test(txt)
function check(reg, txt) {
  return reg.test(txt)
}

check(/\d+/g, 'test') // false
check(/[a-z]+/g, 'test') // true

// 这里就会出现可优化点即：当重复调用check方法并且使用同一个正则规则的话，就出现重复敲正则表达式了

// Curring后
function curryingCheck(reg) {
  return function(txt) {
    return reg.test(txt)
  }
}

let hasNumber = curryingCheck(/\d+/g)
let hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1') // true
hasNumber('testtest') // false
hasLetter('21212') // false

// 这样currying之后，第一个参数在反复调用函数的时候就可以省略掉了

// 当然 可能会说可以外面定义一个全局变量来定义正则规则，但在调用函数的时候还是会重复写这个全局变量，其实还是没有优化
```
### 2、延迟执行
```js
// 加和函数
function add(...args) {
  return args.reduce((result, index) => {
      return result + index
  }, 0)
}

// currying后 
function curryingAdd(func) {
  const args = [];
  return function result(...rest) {
    if (rest.length === 0) {
        return func(...args)
    } else {
        args.push(...rest)
        return result
    }
  }
}
let sul = curryingAdd(add)

console.log(sul(1)(2)(3))
console.log(sul(4))
console.log(sul())  // 结果为 10 必须有最后一个调用add函数用来累加数据
// 上面代码让函数通过柯里化，判断参数,如果有参数，就保存起来，不执行求和，直到最后一步才真正执行求和运算，达到了延迟运行的效果

// 原理为 形成闭包 作用域不会被销毁 在此不断的向数组中push值 最后在调用作用域中的数组 累加
```
### 补充-bind的实现机制就是Currying
>javaScript中的bind实现的机制就是Currying，bind用来改变函数执行时候的this的指向，但是函数本身并不执行，所以是延迟执行。
```js
Function.prototype.bind = (context) => {
    let args = Array.prototype.slice.call(arguments, 1) // 此段代码的意思就是 获取函数的参数 从第一个截取到最后 然后放到数组中，最后调用apply函数
    return () => this.apply(context, args)
}
```
思考：目的就是为了拿到除第一位之后的参数，能否直接使用arguments.slice(1)?<br>
不可，因为arguments为类数组对象，本身没有slice()这个方法 

>Array.prototype.slice.call()能把类数组对象转化为数组，但对象本身只能是{length:2,0:'lai',1:'hua'}这样的才行<br>
```js
let a={length:2,0:'lai',1:'hua'};// 类数组,有length属性，长度为2，第0个是lai，第1个是hua
console.log(Array.prototype.slice.call(a,0));// ["lai", "hua"],调用数组的slice(0);
```
## 通用的封装<br>
给定一个函数fn，设计一个通用封装（currying函数）作用于这个fn，让这个fn可以支持柯里化，该怎么实现呢？<br>
* 要让fn(a, b)等价于fn(a)(b)，那么fn(a)要返回一个函数，这个函数接受参数b，并返回与fn(a, b)相同的结果
* 设计一个currying函数，它接受第一个参数是要被柯里化的函数fn，第2～N个参数是原本要传递给fn的参数
```js
/**
* 设计真正的柯里化函数。
* @param fn     即将被柯里化的函数。
* @param length 用来记录fn应该处理的剩余参数的长度。
*/
function curry(fn, length) {
    length = length || fn.length;
    return function (...args2) {
        // 若原本要传给fn的参数还未传完
        if (args2.length < length) {
            // 合并参数
            let combinedArgs = [fn].concat(args2);
            // 递归，进一步柯里化。这里调用了primaryCurrying函数，每调用一次该函数，
            // 就可以多“1段”以便可以处理掉剩余的参数，直到把所有应传给fn的参数都处理完。
            return curry(primaryCurrying.apply(this, combinedArgs), length - args2.length);
        } 
        // 若原本要传给fn的参数都已经传完，则直接执行fn函数
        else {
            return fn.apply(this, args2);
        }
    };
}

let fn = curry(function (a, b, c) {
    return [a, b, c];
});

let l = console.log;
l(fn("a", "b", "c")); // ["a", "b", "c"]
l(fn("a", "b")("c")); // ["a", "b", "c"]
l(fn("a")("b")("c")); // ["a", "b", "c"]
l(fn("a")("b", "c")); // ["a", "b", "c"]
```
## 占位符的封装

## 柯里化性能
* 一些实现基于存取arguments对象，通常要比存取命名参数慢一点
* 一些老版本的浏览器在arguments.length的实现上是相当慢的
* 使用fn.apply()和fn.call通常比直接调用fn慢点
* 创建大量嵌套作用域和闭包函数会带来内存泄漏问题
## 结论<br>
1、Currying在javaScript中是"低性能"的，但是这些性能在绝大多数场景下是可以忽略的<br>
2、Currying的思想极大地助于提升函数的复用性<br>

## 经典柯里化面试题
>实现一个add方法，使计算结果能够满足如下预期：<br>
add(1)(2)(3) = 6<br>
add(1, 2, 3)(4) = 10<br>
add(1)(2)(3)(4)(5) = 15
```js
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  let _args = Array.prototype.slice.call(arguments)
  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  let _adder = function() {
    _args.push(...arguments)
    return _adder
  }
  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function() {
    return _args.reduce(function(result, index) {
      return result + index
    }, 0)
  }
  return _adder
}

add(1)(2)(3) // 6
add(1, 2, 3)(4) // 10
```
## 参考文档

* [js函数柯里化](https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.3.2.md)
* [大佬，JavaScript 柯里化，了解一下？](https://juejin.im/post/5af13664f265da0ba266efcf)
