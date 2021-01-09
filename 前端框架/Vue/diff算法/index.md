# 详解Vue的diff算法
## 当数据发生变化时，Vue是怎么更新Dom节点的？
要知道渲染真实Dom的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实的Dom上会引起整个Dom树的重排和重绘，
有没有可能我们更新数据的时候，只更新我们修改的那一小块Dom而不要更新整个Dom呢？

方式：
>我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，
发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。

## 虚拟Dom和真是Dom的区别是什么？
虚拟Dom是将真实的Dom的数据抽取出来，以对象的形式模拟树形结构

```html
<div>
    <p>123</p>
</div>
```
对应的virtual DOM（伪代码）：
```js
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```


## diff的比较方式？
