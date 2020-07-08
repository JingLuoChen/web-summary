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

## call和bind的区别
