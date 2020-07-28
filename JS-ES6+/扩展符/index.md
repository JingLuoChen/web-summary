# es6扩展符
## 含义
扩展运算符（spread）是三个点（...），它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列
```js
console.log(...[1, 2, 3]) // 1, 2, 3

console.log(1, ...[2, 3, 4], 5) // 1, 2, 3, 4, 5

console.log([...document.querySelectorAll('div')]) // [<div>, <div>, <div>]
```

该运算符主要用于函数调用
```js
function push(array, ...items) {
  array.push(...items)
}
function add(x, y) {
  return x + y
}
let number = [4, 33]
add(...number);
```
## 替代数组的apply方法
由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了
```js
// ES5的写法
function addES(x, y, z) {
  return x + y + z
}
let args = [1, 2, 3]
addES.apply(null, args) // 6 此处使用apply来接受数组参数

// ES6的写法
function addES6(x, y, z) {
  return x + y + z
}
let arr = [1, 2, 3]
addES6(...arr) // 6 此处使用扩展符来展开数组
```

## 扩展运算符的应用



## 参考文档
* [ES6:扩展运算符](https://juejin.im/post/5ad88219f265da505546692f)
* [ES6 扩展运算符 三个点（...）](https://blog.csdn.net/qq_30100043/article/details/53391308)
