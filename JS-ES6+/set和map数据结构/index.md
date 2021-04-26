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

#### Set的属性
```$xslt 
size：返回集合所包含元素的数量
```
#### Set的方法
* 操作方法
```$xslt 
add(value): 向集合添加一个新的项
delete(value): 从集合中移除一个值
has(value): 如果值在集合中存在，返回true，否则false
clear(): 移除集合里所有的项 
```
* 遍历方法
```$xslt 
keys(): 返回一个包含集合中所有键的数组
values(): 返回一个包含集合中所有值的数组
entries(): 返回一个包含集合中所有键值对的数组
forEach(): 用于对集合成员执行某种操作，没有返回值
```

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

#### Map的属性
```$xslt 
size：返回字典所包含的元素个数
```
#### Map的方法
* 操作方法
```$xslt 
set(key, val): 向字典中添加元素
get(key): 通过键值查找特定的数值并返回
has(key): 如果键存在字典中返回true,否则false
delete(key): 通过键值从字典中移除对应的数据
clear(): 将这个字典中的所有元素删除
```

* 遍历方法
```$xslt 
keys(): 将字典中包含的所有键名以数组形式返回
values(): 将字典中包含的所有数值以数组形式返回
forEach()：遍历字典的所有成员
```

## 参考文档

* [ES6的Set和Map数据结构，由你制造](https://juejin.im/post/6844903589920374792#heading-13)
* [介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](https://juejin.cn/post/6844904047351169038#heading-2)
