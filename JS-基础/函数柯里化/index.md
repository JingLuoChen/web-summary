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
console.log(sul(1))
console.log(sul()) 
```

## 参考文档
* [js函数柯里化](https://github.com/coffe1891/frontend-hard-mode-interview/blob/master/1/1.3.2.md)
* [大佬，JavaScript 柯里化，了解一下？](https://juejin.im/post/5af13664f265da0ba266efcf)
