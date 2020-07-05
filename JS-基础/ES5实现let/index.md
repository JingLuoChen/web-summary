# ES5实现let
## let/const 和 var 的区别
> 1、let 和 const 是不存在变量提升的； var 会有变量提升<br>
2、let 和 const 在声明之前是不能使用的； var 不存在 因为有变量提升<br>
3、let 和 const 不允许重复声明 在同一个作用域中，不能重复声明同一个变量； var 可以重复声明同一个变量<br>
4、let 和 const 是有块级作用域的，不能跨块访问，也不能跨函数访问

>let 和 var 是不需要初始值的； const是需要初始值的，因为是常量

* 即 es5 环境下实现let 主要使用函数作用域(闭包) -> 块级作用域

```$xslt
(function(){
  for(var i = 0; i < 5; i ++){
    console.log(i)  // 0 1 2 3 4
  }
})();

console.log(i) // Uncaught ReferenceError: i is not defined
```

## 扩展-经典闭包面试题
```$xslt
function showBiBao() {
    for (var i = 0; i < 5; i++) {
        setTimeout( function timer() {
            console.log(i);
        }, 1000 );
    }
    console.log(i)
}
showBiBao() // 5 5 5 5 5
```

### 原因
>同步 和 异步 的执行<br>
setTimeout是异步执行 for循环为同步执行<br>
js执行机制是 先执行同步任务 等同步任务执行完之后 在执行异步任务<br>
故 当执行setTimeout时 变量i -> 5

### 解决

```$xslt
// 使用闭包实现解决

function show() {
  for (var i = 0; i < 5; i++) {
    (function(i) {
      setTimeout(function timer() {
        console.log(i);
      }, 1000)
    })(i)
  }
}
show()
```
```$xslt
// 使用es6实现解决

function showEs6() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i)
    }, 1000)
  }
}
showEs6()
```
