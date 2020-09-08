# 解构赋值
## 基础语法
### 数组
```js
// 基础类型解构
let [a, b, c] = [1, 2, 3]
console.log(a, b, c) // 1, 2, 3

// 对象数组解构
let [a, b, c] = [{name: '1'}, {name: '2'}, {name: '3'}]
console.log(a, b, c) // {name: '1'}, {name: '2'}, {name: '3'}

// ...解构
let [a, ...b] = [1, 2, 3]
console.log(a, b) // 1, [2, 3]

// 嵌套解构
let [a, [b], d] = [1, [2, 3], 4]
console.log(a, b, d) // 1, 2, 4

// 解构不成功为undefined
let [a, b, c] = [1]
console.log(a, b, c) // 1, undefined, undefined

// 解构默认赋值
let [a = 1, b = 2] = [3]
console.log(a, b) // 3, 2
```

## 对象
```js
// 对象属性解构
let {a, b} = {a: '1', b: '2'}
console.log(a, b) // 1, 2

// 可以不按照顺序，这是数组解构和对象解构的区别之一
let {b, a} = {a: '1', b: '2'}
console.log(a, b) // 1, 2

// 解构对象重命名
let {a: value, b} = {a: '1', b: '2'}
console.log(value, b) // 1, 2

// 嵌套解构
let {a: {aa}} = {a: { aa: '11', bb: '22'}}
console.log(aa) // 11

// 默认值
let { a = 'test1', b: rename = 'test2' } = { a: 'current1', b: 'current2'}
console.log(a, rename) // current1, current2

```





## 参考文档

* [变量的解构赋值](https://es6.ruanyifeng.com/#docs/destructuring)
* [ES6-解构赋值及原理](https://juejin.im/post/6844903764772519943)
