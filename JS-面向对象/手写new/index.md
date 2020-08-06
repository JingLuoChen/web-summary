# 手写new
## new 都 做了什么
> 1、创建一个新对象，并继承其构造函数的prototype （为了继承构造函数原型上的属性和方法）<br>
2、执行构造函数，方法内的this被指定为该新实例 （为了执行构造函数的赋值操作）<br>
3、返回新实例

## 实现
```js
function myNew(obj, ...rest) {
  // 基于obj的原型链创建一个新的对象
  const newObj = Object.create(obj.prototype)
  // 添加属性到新创建的newObj上，并获取obj函数执行的结果
  const result = obj.apply(newObj, rest)
  // 如果执行结果有返回值并且是一个对象，返回执行的结果，否则，返回新创建的对象
  return typeof result === 'object' ? result : newObj
}

function test(name) {
    this.name = name
}
const newObj = myNew(test, '哈哈哈')

console.log(newObj) // test {name: "哈哈哈"}

console.log(newObj instanceof test) // true
```
## 拓展
```$xslt
apply 和 call 的区别

ECMAScript 规范给所有函数都定义了call和apply两个方法

它们的作用一样 只是传参的形式有区别

apply()

传入两个参数 一个是作为函数上下文的对象 另一个是作为函数参数所组成的数组

call()

传入两个参数 一个是作为函数上下文的对象 另一个是作为函数参数所组成的参数列表
```
* 作用
```$xslt
1、改变this的指向
2、借用别的对象的方法
3、调用函数 -> apply() 和 call() 都会使函数立即执行
```
