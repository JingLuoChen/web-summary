# 节流
>节流：触发高频事件后，但在n秒内函数只会执行一次，稀释函数的执行频率  -> 即 间隔执行

>实现原理：
设置一个计时器，约定规定时间后执行事件，如果时间到了，那么执行函数并重置定时器<br>
触发事件后，如果在约定的时间内再次触发事件，则无视该动作，直到约定时间之后，才能重新触发事件

>实例：鼠标不断点击触发，mousedown单位时间内只触发一次

>理解：fps游戏的射速，就算一直按着鼠标，只会在规定速度内射出子弹

```$xslt

  function throttle(func, time) {
    let canRun = true;
    return () => {
      if (!canRun) return
      canRun = false
      setTimeout(() => {
        func.apply(this, arguments)
        canRun = true;
      }, time)
    }
  }
```
>即 此方法是设置一个状态flag标示来处理<br>
当flag是 false时，不进入程序内<br>
当flag是 true时，才进入程序
