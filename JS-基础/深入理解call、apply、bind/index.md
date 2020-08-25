# apply、call的区别
>ECMAScript规范给所有函数都定义了call与apply两个方法<br>
它们的作用非常广泛，作用也是一样的，只是传参的形式有区别而已
```$xslt
即：
Function.prototype.call()
Function.prototype.apply()
```
## apply
>apply接受两个参数<br>
第一个参数指定了函数体内this对象的指向<br>
第二个参数为一个带下标的集合，这个集合也可以是数组，也可以为类数组<br>
apply方法把这个集合中的元素作为参数传递给被调用的函数
```js
let func = function (a, b, c) {
  console.log([a, b, c])
}
func.apply(null, [1, 2, 3]) // 输出为 [1, 2, 3]
```
## call
>call传入的参数不固定，跟apply相同的是<br>
第一个参数也是代表函数体内的this的指向<br>
从第二个参数开始往后，每个参数被依次传入函数
```js
let func = function (a, b, c) {
  console.log([a, b, c])
}
func.call(null, 1, 2, 3) // 输出为 [1, 2, 3]
```
## 注意
>当使用call和apply的时候，如果我们传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器中则是window
```js
let func = function (a, b, c) {
  console.log(this === window)
}
func.apply(null, 1, 2, 3) // 输出为 true
```

>有时候我们使用call或者apply的目的不在于指定this指向，而是另有用途，比如借用其他对象的方法
```js
let a = Math.max.apply(null, [ 1, 2, 5, 3, 4 ]);
console.log(a);// 输出 5
```
## 用途
### 改变this的指向
```js
var obj = {
  name: 'haha'
}
function getName() {
  console.log(this.name);
}
getName.call(obj); // haha
```
### 借用其他对象的方法
```js
let A = function ( name ){ 
  this.name = name;
};
let B = function(){ 
  A.apply(this,arguments);
};
B.prototype.getName = function () { 
  return this.name;
};
let b = new B('sven');
console.log(b.getName()); // 输出 'sven'
```
### 调用函数
>apply、call 方法都会使函数立即执行，因此它们也可以用来调用函数。
````js
function func() {
  console.log('呵呵');
}
func.call(); // 呵呵
````

## bind
> bind()方法创建一个新的函数，在调用时设置this关键字为提供的值，并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项

>bing方法与apply和call比较类似，也能改变函数体内的this的指向<br>
不同的是，bind方法的返回值是函数，并且需要稍后调用，才会执行 --- apply和call是立即执行
```js
function add(a, b) {
  return a + b 
}
function sub (a, b) {
  return a - b
}

add.bind(sub, 5, 3) // 此时不会返回 8
add.bind(sub, 5, 3)() // 调用后返回 8  
```
* 如果bind的第一个参数是null或者undefined，this就指向全局对象window

## 总结
```$xslt
call和apply的主要作用是改变对象的执行上下文，并是立即执行的，它们在参数上的写法略有区别

bind也能改变对象的执行上下文，它与call和apply不同的是，返回值是一个函数，并需要稍后再调用才会执行, 即并不会立即执行
```

## 参考文档

* [细说 call、apply 以及 bind 的区别和用法](https://segmentfault.com/a/1190000018017796)
