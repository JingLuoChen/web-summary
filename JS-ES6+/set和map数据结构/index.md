# set和map数据结构

## 概述
Set和Map主要的应用场景在于数组去重和数据存储，Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构

## 集合
集合是由一种无序且唯一(即不能重复)的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组

## Set
ES6提供了新的数据结构Set，它类似数组，但是成员的值都是唯一的，没有重复的值，Set本身是一个构造函数，用来生成Set数据结构

### 基础用法
```js
const s = new Set()

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x))

for (let i of s) {
    console.log(i) // 2 3 4 5
}
console.log(s) // Set(4) [2, 3, 4, 5]

console.log([...s]) // [2, 3, 4, 5]

// 去除数组中的重复成员
let arr = [1, 2, 1, 4, 5, 6]
console.log([...new Set(arr)])
```

### Set的属性和方法



## Map
在数据结构中还有一种结构叫做字典，它就是实现基于ES6中的Map类的结构

```$xslt
集合 和 字典 的区别

共同点：集合、字典可以存储不重复的值

不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储
```
### 基础使用
```js
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

### Map的属性和方法


## 参考文档

* [ES6的Set和Map数据结构，由你制造](https://juejin.im/post/6844903589920374792#heading-13)
