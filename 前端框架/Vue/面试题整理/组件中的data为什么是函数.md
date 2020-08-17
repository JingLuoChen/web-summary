# 组件中的data为什么是函数

```$xslt
组件是一个单独功能模块的封装，既有自己的HTML的封装，也有属于自己的数据data

组件中的data属性必须是一个函数，而且返回一个对象，对象内部保存数据
```

```js
var Component = function() {};
Component.prototype.data = {
    demo: 123
}
var component1 = new Component();
var component2 = new Component();
component1.data.demo = 456;
console.log(component2.data.demo); // 456
```

```$xslt    
从上面可以看出，两个实例都引用同一个对象，其中一个改变的时候，另一个也发生改变。

每一个vue组件都是一个vue实例，通过new Vue()实例化，引用同一个对象，如果data直接是一个对象的话，那么一旦修改其中一个组件的数据，其他组件相同数据就会被改变。

而data是函数的话，每个vue组件的data都因为函数有了自己的作用域，互不干扰。

这里就是函数作用域的作用
```

