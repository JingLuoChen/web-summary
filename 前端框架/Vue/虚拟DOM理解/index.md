# 虚拟DOM理解
## 概述
VDOM是对DOM的抽象，本质上是JavaScript对象，这个对象就是更加轻量级的对DOM的描述

### 为什么需要VDOM
既然我们已经有了DOM，为什么还需要额外加一层抽象？<br>

首先，我们都知道在前端性能优化的一个秘诀就是尽可能少的操作DOM，不仅仅是DOM相对较慢，更因为频繁变动DOM会造成
浏览的回流或者重回，这些都是性能的杀手，因此我们需要这一层抽象，在patch过程中尽可能地一次性将差异更新到DOM中，
这样保证了DOM不会出现性能很差的情况


其次，前端框架的一个基本要求就是无需手动操作DOM，一方面是因为手动操作DOM无法保证程序性能，多人协作的项目中如果
review不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动DOM操作可以大大提高开发效率


最后，也是VDOM最初的目的，就是更好的跨平台，比如Node.js就没有DOM，如果想实现SSR，那么一个方式就是借助VDOM，因为VDOM本身就是JS对象

## VDOM的关键因素
### VDOM的创建
我们已经知道VDOM是对真是DOM的抽象，根据不同的需求我们可以做出不同的抽象。<br>

比如snabbdom.js的抽象方式是这样的：
```typescript
export interface VNode {
    sel: string | undefined;
    data: VNodeData | undefined;
    children: Array<VNode | string> | undefined;
    elm: Node | undefined;
    text: string | undefined;
    key: Key | undefined;
}
```

我们采用最简单的抽象方法：
```typescript
{
  type, // String，DOM 节点的类型，如 'div'
  data, // Object，包括 props，style等等 DOM 节点的各种属性
  children // Array，子节点
}
```

在明确了我们抽象的VDOM构造之后，我们就需要一个函数来创建VDOM
```typescript
/**
 * 生成 vnode
 * @param  {String} type     类型，如 'div'
 * @param  {String} key      key vnode的唯一id
 * @param  {Object} data     data，包括属性，事件等等
 * @param  {Array} children  子 vnode
 * @param  {String} text     文本
 * @param  {Element} elm     对应的 dom
 * @return {Object}          vnode
 */
function vnode(type, key, data, children, text, elm) {
  const element = {
    __type: VNODE_TYPE,
    type, key, data, children, text, elm
  }

  return element
}
```
这个函数很简单，接受一定的参数，在根据这些参数返回一个对象，这个对象就是DOM的抽象。



## 参考文档

* [面试官: 你对虚拟DOM原理的理解?](https://juejin.im/post/6844903902429577229)
