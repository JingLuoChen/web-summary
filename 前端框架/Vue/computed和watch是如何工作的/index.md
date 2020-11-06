# Vue.js的computed和watch是如何工作的？
## 计算属性
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

### 计算属性缓存vs方法
你可能已经注意到我们可以通过在表达式中调用方法来达到相同的效果：
```vue
<p>Reversed message: "{{ reversedMessage() }}"</p>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```
我们可以将同一函数定义为一个方法而不是一个计算属性，两种方式的最终结果是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的
## 参考文档

* [计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)
* [Vue.js的computed和watch是如何工作的？](https://juejin.im/post/6844903667884097543)
