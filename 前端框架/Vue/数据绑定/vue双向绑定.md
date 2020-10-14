# Vue的双向绑定
## 绑定原理
vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的

即Vue内部通过Object.defineProperty方法属性拦截的方式，把data对象里每个数据的读写转化成getter/setter，当数据变化时通知视图更新。

## 什么是MVVM数据双向绑定
## 监听器Observer实现
## 订阅者Dep实现
## 订阅者Watcher实现
## 解析器Compile实现
## 源码

## 参考文档

* [vue 的双向绑定原理及实现](https://juejin.im/entry/6844903479044112391)
* [0 到 1 掌握：Vue 核心之数据双向绑定](https://juejin.im/post/6844903903822086151)



