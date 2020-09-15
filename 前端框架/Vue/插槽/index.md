# 插槽slot
## 概念
插槽，也就是slot，是组件的一块HTML模板，这块模板显示不显示，以及怎么显示、以及显示什么由父组件来决定。
但是插槽显示的位置却由子组件自身决定，slot写在组件template的什么位置，父组件传过来的模板将来就显示在什么位置。

## 单个插槽 | 默认插槽 | 匿名插槽
单个插槽也可以叫它默认插槽，单个插槽可以放置在组件的任意位置，但是就像它的名字一样，一个组件只能有一个该类插槽。

```$xlst
// 父组件
<template>
    <div class="father">
        <h3>这里是父组件</h3>
        <child>
            <div class="tmpl">
              <span>菜单1</span>
              <span>菜单2</span>
              <span>菜单3</span>
              <span>菜单4</span>
              <span>菜单5</span>
              <span>菜单6</span>
            </div>
        </child>
    </div>
</template>

```
```$xlst
// 子组件
<template>
  <div class="child">
    <h3>这里是子组件</h3>
    <slot></slot>
  </div>
</template>
```
```$xlst
// 最终渲染
<div class="father">
  <h3>这里是父组件</h3>
    <div class="child">
      <h3>这里是子组件</h3>
      <div class="tmpl">
      <span>菜单1</span>
      <span>菜单2</span>
      <span>菜单3</span>
      <span>菜单4</span>
      <span>菜单5</span>
      <span>菜单6</span>
    </div>
  </div>
</div>
```

## 具名插槽
匿名插槽没有name属性，插槽添加了name属性之后就是具名插槽，具名插槽可以在一个组件中出现N次，出现在不同的位置。
```$xlst
// 子组件
<template>
  <div class="child">
    // 具名插槽
    <slot name="up"></slot>
    <h3>这里是子组件</h3>
    // 具名插槽
    <slot name="down"></slot>
    // 匿名插槽
    <slot></slot>
  </div>
</template>
```

## 参考文档

* [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)
* [深入理解vue中的slot与slot-scope](https://juejin.im/post/6844903555837493256)

