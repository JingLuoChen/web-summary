# typeof和instanceof区别
## typeof
> typeof 表示是对某个类型的检测，基本数据类型除了null，都能正确的显示为对应的类型<br>
引用类型除了函数会显示为function，其他都是显示为object

>ps : 000 开头代表是对象，然而null表示为全零，所以typeof null的值为object

```js
console.log(typeof '哈哈哈') // -> String
console.log(typeof 123)  // -> Number
console.log(typeof true) // -> Boolean
console.log(typeof undefined) // -> undefined

console.log(typeof null) // -> Object

console.log(typeof []) // -> Object
console.log(typeof function () {}) // -> function
```

## instanceof
>instanceof 主要是检测某个构造函数的原型对象在不在某个对象的原型链上

```js
let person = function () {}
let newPerson = new person();
console.log(newPerson instanceof person) // -> true

```
