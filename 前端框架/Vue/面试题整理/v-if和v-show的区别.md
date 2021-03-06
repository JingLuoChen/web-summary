# v-if和v-show的区别
## 概述
v-show和v-if都是用来显示隐藏元素，v-if还有一个v-else配合使用，两者达到的效果都是一样的，但性能上会有很大的区别

## v-show
```$xslt
不管条件是真是假，第一次渲染的时候都会编译出来，也就是标签都会添加到Dom中，
之后切换的时候，都是通过display:none来显示和隐藏元素，
可以说只是改变CSS样式，几乎不会影响什么性能
```

## v-if
```$xslt
在首次渲染的时候，如果条件为假，什么也不操作，页面当作没有这个元素。
当条件为真时，开始局部编译，动态的向Dom元素里面添加元素。
当条件从真变成假的时候，开始局部编译，卸载这些元素，也就是删除
```

## 性能
```$xslt
v-if是绝对更消耗性能的，因为v-if在显示和隐藏过程中有Dom的添加和删除

v-show只是单纯的Dom的显示和隐藏，纯CSS操作

```


## 参考文档

* [v-if和v-show的区别](https://www.jianshu.com/p/405cfe2582a9)
