# 手写apply

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
Function.prototype.myApply = function(context) {
    // 如果没有传或传的值为空对象 context指向window
    context = context || window
    let fn = mySymbol(context)
    context[fn] = this //给context添加一个方法 指向this
    // 处理参数 去除第一个参数this 其它传入fn函数
    let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
    context[fn](arg) //执行fn
    delete context[fn] //删除方法
}
```

## 使用场景

1、Math.max。用它来获取数组中最大的一项。
```js
let max = Math.max.apply(null, array);
```

2、实现两个数组合并。在 ES6 的扩展运算符出现之前，我们可以用 Array.prototype.push来实现。
```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

## 参考文档

* [手写call、apply、bind实现及详解](https://juejin.cn/post/6844903773979033614)
