# EventBus
## 概览
Vue组件非常常见的有父子组件通信，兄弟组件通信，而父子组件通信就很简单，父组件会通过props向下传数据给子组件，当子组件有事情要告诉父组件时会通过$emit事件告诉父组件。

但如果两个页面没有任何引入和被引入关系，该如何通信？

## EventBus的简介
EventBus又称事件总线，在Vue中可以使用EventsBus来作为沟通桥梁，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接受事件

## 如何使用EventBus
### 初始化
首先需要创建事件总线并将其导出，以便其他模块可以使用或监听它，我们可以通过两种方式来处理

1、第一种：新建一个.js文件，比如event-bus.js
```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```
实质上EventBus是一个不具备DOM的组件，它具有的仅仅只是它的实例方法而已，因此它非常的轻便

2、另一种方式，可以直接在项目中的main.js中初始化EventBus
```js
Vue.prototype.$EventBus = new Vue()
```
注意，这种方式初始化的EventBus是一个全局的事件总线

### 发送事件
```js
EventBus.$emit({
    channel: string,
    callback()
})
```

### 接收事件
```js
EventBus.$on({
    channel: string,
    callback()
})
```

### 移除事件监听者
```js
EventBus.$off(channel, {})
```
也可以使用EventBus.$off(channel)来移除应用内所有对此某个事件的监听，或者直接调用EventBus.$off()来移除所有事件频道，不需要添加任何参数


### 问题
如果使用不善，EventBus会是一种灾难，Vue是单页应用，如果你在某一个页面刷新之后，与之相关的EventBus会被移除，这样就导致业务走不下去。
还有如果业务有反复操作的页面，EventBus在监听的时候就会触发很多次，也是一个非常大的隐患
