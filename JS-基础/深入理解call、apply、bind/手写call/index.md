# 手写call

```js
function mySymbol(obj) {
    // 不要问我为什么这么写，我也不知道就感觉这样nb
    let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
        // 牛逼也要严谨
    if (obj.hasOwnProperty(unique)) {
        return mySymbol(obj) //递归调用
    } else {
        return unique
    }
}
//接下来我们一并把多参数和执行完删除自定义方法删除掉一块搞定
Function.prototype.myCall1 = function(context) {
    // 如果没有传或传的值为空对象 context指向window
    context = context || window
    let fn = mySymbol(context)
    context[fn] = this //给context添加一个方法 指向this
    // 处理参数 去除第一个参数this 其它传入fn函数
    let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
    context[fn](...arg) //执行fn
    delete context[fn] //删除方法
}
```

## 使用场景
1、对象的继承

```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.getName = function() {
    return this.name
}
// 继承
function Student(name, age, grade) {
    Person.call(this, name, age)
    this.grade = grade
}

Student.prototype = new Person()

```

2、借用方法

## 参考文档
* [手写call、apply、bind实现及详解](https://juejin.cn/post/6844903773979033614)
