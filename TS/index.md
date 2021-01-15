# TypeScript
## 概述
* TypeScript是JavaScript的超集
* 向JavaScript添加了可选的静态类型和基于类的面向对象编程
* 支持ES6到ES10甚至ES-NEXT的语法
* TS最终也会被编译成JavaScript，使其在浏览器、Node中等环境中使用

## TS和JS在类型上的区别
JavaScript被称作是一种「动态」脚本语言，其中有一个被疯狂诟病的特性：缺乏静态强类型

```js
function init() {
    var a = 'TOM';
    console.log('a: ', a); // a: TOM
    a = 1;
    console.log('a: ', a); // a: 1
}

```
当我们执行init函数的时候，变量a的类型就一直在变化。

如果在Java中，会这样
```
class HelloWorld {
    public staticvoid main(String[] args) {
        String a = "axuebin";
        System.out.printf("a: %s", a);
        a = 1;
        System.out.printf("a: %d", a);
    }
}
// HelloWorld.java:4: error: incompatible types: int cannot be converted to String
```
在Java中根本就没办法让a=1，会直接导致报错

如果在TS中，会这样

```typescript
function init() {
    var a: string = 'axuebin';
    console.log('a: ', a);
    a = 1;
    console.log('a: ', a);
}
// Type '1' is not assignable to type 'string'.
```
变量a的类型发生变化时，在编译阶段就会报错提示

## 为什么使用TS
### 问题
我们来想想在日常的业务开发中是否有遇到以下的情况：

1、协同开发时，你需要调用一个其他人写的函数，但是那个函数里变量命名和管理特别混乱，并且没有写任何的注释，为了搞清楚函数的参数类型以及用法，你只能硬着头皮读函数的具体代码。

2、你突然看到项目里自己半年前甚至一年前的一个函数，这写的什么鬼啊，简直没法看，强迫症的你想着重构一把。然后你就大刀阔斧的改造了一把，甚至对入参都进行了改造，
嗯，终于满意了。突然发现不对啊，还得搜了一下哪里调用了这个函数，得保证调用成功啊。

...

### 优势
1、程序更容易理解，例如函数的参数类型，减少了手动对代码进行注释的工作量
2、丰富的接口提示
3、编译期间能够发现大部分错误
4、完全兼容JavaScript

### 缺点
* 增加了学习成本
* 短期内增加了一些开发成本

## 参考文档

* [一份不可多得的 TS 学习指南（1.8W字）](https://juejin.im/post/6872111128135073806)
* [TypeScript 手册学习整理](https://itbilu.com/javascript/js/typescript.html)
