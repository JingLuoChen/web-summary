# JSX
## 概念
```
1、全称：JavaScript XML

2、react定义的一种类似于XML的JS扩展语法：JS + XML

3、本质是React.createElement(component, props, ...children)方法的语法糖

补充

XML早期用于存储和传输数据

以前传输数据就这样 但不好

<student>
    <name>TOM</name>
    <age>19</age>
</student>

后来JSON来代替了XML
{
    "name": 'TOM'，
    "age": 19
}

当然 现在也还有使用XML进行数据传输的

```

## 规则
```
1、定义虚拟DOM时，不要使用引号

2、标签中混入JS表达式时要使用{}

3、样式的类名不要用class，要使用className --- 原因：为了避开ES6中的类class，所以使用className

4、内联样式要使用style={{key: value}}的形式去写 --- 两个大括号的原因：第一个代表JS中使用变量{} 第二个代表样式多，要用对象的形式

5、虚拟DOM必须只有一个根标签 --- 后期可以省略这个规则，前期使用注意

6、标签使用必须闭合

7、标签首字母 小写开头：则转为html同名标签元素 大写开头：react理解为对应的react组件
```
