# Vue中的nextTick
## 概述
在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中

在created()钩子函数执行的时候DOM其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中，
与之对应的就是mounted()钩子函数，因为该钩子函数执行的时候所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题

在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中

## 为什么是nextTick
### 浏览器
浏览器(多线程)包含了**Browser进程**（浏览器的主要进程）、**第三方插件进程**和**GPU进程**（浏览器渲染进程），其中GPU进程和Web前端密切相关
* GUI渲染线程
* JS引擎线程 --- 在用户界面和渲染引擎之间传送指令
* 事件触发线程
* 定时触发器线程
* 异步HTTP请求线程

>GUI渲染线程和JS引擎线程是互斥的，为了防止DOM渲染的不一致性，其中一个线程执行时另一个线程会被挂起。

这些线程中，和Vue的nextTick息息相关的是JS引擎线程和事件触发线程

#### 补充
* 进程与线程
进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。
我们这里比喻为工厂的车间，它代表CPU所能处理的单个任务，任一时刻，CPU总是运行一个进程，其他进程处于非运行状态

线程是程序执行中一个单一的顺序控制流程，是程序执行流的最小单元。我们这里把线程比喻一个车间的工人，即一个车间可以允许由多个工人协同完成一个任务

>进程与线程的区别和关系<br>
一个进程由一个或多个线程组成，多个线程可协同工作（共享内存空间）<br>
进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间（包括代码块、数据集、堆等）及一些进程级的资源<br>
调度和切换：线程上下文切换比进程上下文切换要快的多

* 浏览器多进程
在浏览器刚被设计出来的时候，那时的网页非常的简单，每个网页的资源占有率是非常低的，因此一个进程处理多个网页时可行的。
然而在今天，大量网页变得日益复杂，把所有网页都放进一个进程的浏览器面临在健壮性，响应速度，安全性方面的挑战，因为如果浏览器中的一个tab网页崩溃的话，将会导致其他被打开的网页应用崩溃

另外相对于线程，进程之间是不共享资源和地址空间的，所以不会存在太多的安全问题，而由于多个线程共享着相同的地址空间和资源，所以会存在线程之间有可能会恶意修改或获取非授权数据等复杂的安全问题。

浏览器的两个进程：
1、Browser进程（只有1个）
>负责浏览器界面显示，比如网页之外的前进，后退界面，下载管理等等<br>
负责各个页面的管理，创建和销毁其他进程<br>
将Renderer进程得到的内存中的Bitmap，绘制到用户界面上<br>
网络资源的管理，下载等

2、Renderer进程（多个，每个Tab是一个进程）
>Render进程主要作用为页面渲染，脚本执行，事件处理等等（相当于每个Tab都是一个应用程序，包含js执行、渲染等），该进程有多个线程（js线程以及渲染线程）

* JS引擎线程<br>
也称为JS内核，负责处理JS脚本程序（例如V8引擎）

JS引擎线程负责解析JS脚本，运行代码

JS引擎一直等待着任务队列中任务的到来，然后加以处理，一个Tab页（render进程）中无论什么时候都只有一个JS线程在运行JS程序

同样注意，GUI渲染线程与JS引擎线程是互斥的，所以如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞


* 为什么JS是单线程<br>
首先在明确一个概念，JS引擎线程生存在Render进程（浏览器渲染进程），线程之间资源共享，相互影响


* 渲染线程<br>
也叫渲染引擎（大家俗语上的浏览器内核其实包括渲染引擎和JS引擎）

>1、负责渲染浏览器界面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等等<br>
2、当界面需要重绘或由于某种操作引发回流（reflow），该线程就会执行<br>
3、GUI渲染线程和JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行

### JS引擎线程和事件触发线程
浏览器页面初次渲染完毕后，JS引擎线程和事件触发线程的工作流程如下：

1、同步任务在JS引擎线程（主线程）上执行，形成执行栈

2、主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件

3、执行栈中的同步任务执行完毕，系统就会读取任务队列，如果有异步任务需要执行，将其加到主线程的执行栈并执行相应的异步任务

### 事件循环机制（Event Loop）

事件触发线程管理的任务队列是如何产生的呢？

事实上这些任务就是从JS引擎线程本身产生的，主线程在运行时会产生执行栈，栈中的代码调用某些异步API时会在任务队列中添加事件，
栈中的代码执行完毕后，就会读取任务队列中的事件，去执行事件对应的回调函数，如此循环往复，形成事件循环机制。

### Node.js中的process.nextTick
Node.js中有一个nextTick函数和Vue中的nextTick命名一致，很容易让人联想到一起（Node.js的Event Loop和浏览器的Event Loop有差异）

```js
setTimeout(function() {
  console.log('timeout')
})

process.nextTick(function(){
  console.log('nextTick 1')
})

new Promise(function(resolve){
  console.log('Promise 1')
  resolve();
  console.log('Promise 2')
}).then(function(){
  console.log('Promise Resolve')
})

process.nextTick(function(){
  console.log('nextTick 2')
})
```
在Node环境中打印的顺序：Promise 1 > Promise 2 > nextTick 1 > nextTick 2 > Promise Resolve > timeout

### Vue的API命名nextTick
Vue官方对nextTick这个API的描述：<br>
>在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM

* 例子
```javascript
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
 .then(function () {
  // DOM 更新了
})
```

Vue异步执行DOM更新，只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个watcher被多次触发，
只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后，在下一个的事件循环"tick"中，Vue刷新队列并执行
实际（已去重的）工作，Vue在内部尝试对异步队列使用原生的Promise.then和MessageChannel，如果执行环境不支持，会采用setTimeout(fn, 0)代替。

>例如：当你设置vm.someData = 'new value'，该组件不会立即重新渲染，当刷新队列时，组件会在事件循环队列清空时的下一个"tick"更新，多数情况我们不需要关心这个过程，
但是如果你想在DOM状态更新后做点什么，这就可能会有些棘手。

## 原理

Vue实现响应式并不是数据发生变化之后DOM立即变化，而是按一定的策略进行DOM的更新。
```$xlst

异步执行的运行机制如下：

1、所有同步任务都在主线程上执行，形成一个执行栈
2、主线程之外，还存在一个'任务队列'，只要异步任务有了运行结果，就在'任务队列'之中放置一个事件
3、一旦'执行栈'中所有同步任务执行完毕，系统就会读取'任务队列'，看看里面有哪些事件，哪些对应的异步任务，于是结束等待状态，进入执行栈，开始执行
4、主线程不断重复上面的第三步

即事件循环原理

```
## 作用
1、Vue.nextTick()用于延迟执行一段代码

2、需要在视图更新之后，基于新的视图进行操作

## 其他应用场景
```
1、点击按钮显示原本以 v-show = false 隐藏起来的输入框，并获取焦点。

showsou() {
  this.showit = true //修改 v-show
  document.getElementById("keywords").focus()  //在第一个 tick 里，获取不到输入框，自然也获取不到焦点
}

修改为：

showsou() {
  this.showit = true
  this.$nextTick(function () {
    // DOM 更新了
    document.getElementById("keywords").focus()
  })
}


2、点击获取元素宽度

<div id="app">
    <p ref="myWidth" v-if="showMe">{{ message }}</p>
    <button @click="getMyWidth">获取p元素宽度</button>
</div>

getMyWidth() {
    this.showMe = true;
    //this.message = this.$refs.myWidth.offsetWidth;
    //报错 TypeError: this.$refs.myWidth is undefined
    this.$nextTick(()=>{
        //dom元素更新后执行，此时能拿到p元素的属性
        this.message = this.$refs.myWidth.offsetWidth;
  })
}
```


## 参考文档

* [你真的理解$nextTick么](https://juejin.im/post/5cd9854b5188252035420a13)
* [Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)
* [简单理解Vue中的nextTick](https://juejin.im/post/6844903557372575752)
