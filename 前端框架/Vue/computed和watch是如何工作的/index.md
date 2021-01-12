# Vue.js的computed和watch是如何工作的？
## 概述
Vue的组件对象支持计算属性computed和侦听属性watch两个选项，但这两个属性用法有什么异同以及它们底层实现的原理是什么？

## computed和watch定义
1、computed是计算属性，类似于过滤器，对绑定到视图的数据进行处理，并监听变化进而执行对应的方法

基础例子
```vue
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```
计算属性是基于它们的依赖进行缓存的，只在相关依赖发生改变时它们才会重新求值。值得注意的是reversedMessage不能在组件的props和data中定义，否则会报错

2、watch是一个侦听的动作，用来观察和响应Vue实例上的数据驱动

## computed和watch用法异同
相同：computed和watch都起到监听/依赖一个数据，并进行处理的作用

异同：它们其实都是Vue对监听器的实现，只不过computed主要用于对同步数据的处理，watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑

注意：能用computed的时候优先用computed，避免了多个数据影响其中数据时多次调用watch的尴尬情况

## watch高级用法

## 参考文档
* [计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)
* [Vue.js的computed和watch是如何工作的？](https://juejin.im/post/6844903667884097543)
