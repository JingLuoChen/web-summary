# Vue中的computed和watch的区别

## computed用法
### 概述
```$xslt
computed是计算属性，它会根据所依赖的数据动态显示新的计算结果，该计算结果会被缓存起来。

computed的值在getter执行后是会被缓存的，如果所依赖的数据发生改变的时候，就会重新调用getter来计算最新的结果
```
### 用法
```js
var vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello'
  },
  computed: {
    reversedMsg() {
      // this 指向 vm 实例
      return this.msg.split('').reverse().join('')
    }
  }
})
```
### 应用场景

1、适用于一些重复使用数据或复杂以及费时的运算，我们可以把它放入computed中进行计算，然后会在computed中缓存起来，下次就可以直接获取<br>

2、如果我们需要的数据依赖其他的数据的话，我们可以把该数据设计为computed中

## watch的用法
### 概述
```$xslt    
watch是一个对data的数据监听回调，当依赖的data的数据变化时，会执行回调。在回调中会传入newVal和oldVal两个参数，Vue实例将会在实例化时调用$watch()，它会遍历watch对象的每一个属性
```

### 用法
```js
var vm = new Vue({
  el: '#app',
  data: {
    basicMsg: '',
    age: 31,
    single: '单身'
  },
  watch: {
    age(newVal, oldVal) {
      this.basicMsg = '今年' + newVal + '岁' + ' ' + this.single;
    }
  }
})

```
### 应用场景

当在data中的某个数据发生变化时，我们需要做一些操作，或者当需要在数据变化时执行异步或开销较大的操作时，我们就可以使用watch来进行监听
