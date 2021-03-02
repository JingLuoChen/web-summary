# Object.defineProperty的问题
通过Object.defineProperty实现了对object数据的可观测，但是这个方法仅仅只能观测到object数据的取值以及设置值，当我们向object数据里添加一对新的key/value 
或者删除一对已经有的key/value时，它是无法观测到的，导致当我们对object数据添加或者删除时，无法通知依赖，无法驱动视图进行响应式更新

* 解决
Vue为了解决这个问题，增加了两个全局API：Vue.set 和 Vue.delete
