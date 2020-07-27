# 循环遍历

## 遍历数组
### forEach
```$xslt
可以改变数组自身
中途不能用常规操作退出循环，可以用抛出异常（try/catch）的方式，但不推荐
```
```$xslt
易错点
1、forEach不一定改变自身数组
当数组中元素是值类型时，绝不会改变数组
当数组中元素是引用类型时，则会改变数组

2、forEach不支持链式操作---即forEach是放在最后面的
arr.forEach().filter() --- 不支持
arr.filter().forEach() --- 支持
```
### map
### filter
### sort
### some
### every
### find
### findIndex

## 遍历对象
### for...in方法
### Object.keys()方法
### Object.getOwnProperty()方法
