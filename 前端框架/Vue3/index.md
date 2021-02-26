# Vue3.0
## Vue3.0六大亮点
1、Performance：通过Proxy实现双向响应式绑定，相比defineProperty的遍历属性的方式上效率更高，性能更好。
另外，Virtual DOM更新只diff动态部分、事件缓存等，也带来了性能上的提升

2、Tree-Shaking Support：相比2.x导入整个Vue对象，3.x支持按需导入，只打包需要的代码

3、Composition API：组合式API，面向函数编程

4、Fragment、Teleport、Suspense："碎片"，Teleport即Protal传送门，"悬念"，参考了React的设计风格

5、Better Typescript support：2.x设计之初没有考虑到类型推导，导致适配ts比较困难，3.x移除了this对象，利用了天然对类型友好的普通变量和函数，对TS支持更好

6、Custom Render API：提供了自定义渲染API

## 参考文档

* [Vue3.0来袭，你想学的都在这里（二）](https://juejin.cn/post/6872113750636232712)
