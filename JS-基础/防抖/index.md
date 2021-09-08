# 防抖
>防抖: 触发高频事件后，n秒内函数只会执行一次 -> 即 延迟执行

>实现原理:
设置一个计时器，规定在约定时间内再触发事件处理，则重新设置计时器，直到约定的时间内没有再次触发事件处理

>实例: search搜索，不断输入值时，用防抖节约请求资源

>理解: 即法师发动技能时要读条，技能读条没完，再次按技能重新读条，读条完才能发动技能

>优点: 主要是减少请求

```js
  function deBounce(func, time) {
    let timer = null
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, time)
    }
  }
```
>即 每次触发都清空计时器，直到在约定时间内没有再次触发，那么计时器就会执行到里面的回调函数


## 参考文档

* [防抖与节流](https://www.jianshu.com/p/c8b86b09daf0)

