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
### 合并数组
扩展运算符提供了数组合并的新写法
```js
// ES5
let more = [3, 4]
[1, 2].concat(more)

// ES6
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
console.log([...arr1, ...arr2]) // [1, 2, 3, 4, 5, 6]
```
### 与解构赋值结合
扩展运算符可以与解构赋值相结合起来，用于生成数组
```js
// ES5 
let list = [1, 2, 3, 4]
let a = list[0]
let rest = list.slice(1)

// rest通过这样来获取数组

// ES6
let list2 = [1, 2, 3, 4]
let b = list2[0]
let rest2 = []
let [b, ...rest2] = list2
```
注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
```js
const [...list, last] = [1, 2, 3, 4] // 这样会报错
const [first, ...list, last] = [1, 2, 3, 4] // 这样也会报错
const [first, ...list] = [1, 2, 3, 4] // 对
```
### 对象的扩展运算符
```js
let {a, b, ...e} = {a: 12, b: 13, d: 14, c: 15}  // e = {d: 14, c: 15}

var obj = {name : 'coco'}
var obj1 = {age : 27}
var newObj = {...obj, ...obj1}
var newObj1 = {obj, obj1};
console.log(newObj) // {name: "coco", age: 27}
console.log(newObj1) // {obj: {name: "coco"}, obj1: {age: 27}}
```
### 函数的返回值
javaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象，扩展运算符提供了解决这个问题的变通方法
```js
let dateFields = readDateFields(database)
console.log(new Date(...dateFields))
```
### 把类数组转化为数组
扩展运算符可以将字符串转为真正的数组
```js
var strArr = [...'kiwi']
console.log(strArr) // ["k","i","w","i"]
```
### 实现了Iterator接口对象
任何Iterator接口的对象，都可以用扩展运算符转为真正的数组 ---  即可以把类数组的对象转化为真正的数组
```js
let nodeList = document.querySelectorAll('div')
let arr = [...nodeList]
console.log(arr)

// querySelectorAll返回的是一个nodeList对象，它不是数组，而是一个类似数组的对象，这时，扩展运算符可以将其转为真正的数组

// 原因就在于nodeList对象实现了Iterator接口
```
对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组
```js
let arrayLike = {
    '0': 0,
    '1': 1,
    '2': 2,
    length: 3
} 
console.log([...arrayLike]) // Uncaught TypeError: arrayLike is not iterable

let arr = Array.from(arrayLike) // [0, 1, 2]
```
arrayLike是一个类似数组的对象，但是没有部署Iterator接口，扩展运算符就会报错<br>
可以使用Array.from将其转为真正的数组

### Map和Set结构，Generator函数
扩展运算符内部调用的是数据解构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符
```js
let map = new Map([
[1, 'one'],
[2, 'two'],
[3, 'three'],
])
console.log([...map.keys()]) // [1, 2, 3]
```

## 参考文档
* [ES6:扩展运算符](https://juejin.im/post/5ad88219f265da505546692f)
* [ES6 扩展运算符 三个点（...）](https://blog.csdn.net/qq_30100043/article/details/53391308)
