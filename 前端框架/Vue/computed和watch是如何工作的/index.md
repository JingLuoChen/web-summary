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

## 参考文档

* [计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)
* [Vue.js的computed和watch是如何工作的？](https://juejin.im/post/6844903667884097543)
