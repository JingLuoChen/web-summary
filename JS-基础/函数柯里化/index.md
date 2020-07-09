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
```
## 参考文档
* [js函数柯里化](https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.3.2.md)
* [大佬，JavaScript 柯里化，了解一下？](https://juejin.im/post/5af13664f265da0ba266efcf)
