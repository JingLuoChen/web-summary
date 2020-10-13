# Flow
## 概述
flow是facebook出品的JavaScript静态类型检查工具，Vue.js的源码利用了Flow做了静态类型检查

## 为什么用Flow
JavaScript是动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用是很容易就写出非常隐蔽的隐患代码，在编译期甚至看上去都不会报错，
但是在运行阶段就可能出现各种奇葩的bug。

类型检查是当前动态类型语言的发展趋势，所谓类型检查，就是在编译期尽早发现（由类型错误引起的）bug，又不影响代码运行（不需要运行时动态检查类型），
是编写JavaScript具有和编写Java等强类型语言相近的体验

项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性，Vue.js在做2.0重构的时候，在ES2015的基础上，除了ESLint保证代码风格之外，
也引入来Flow做静态类型检查，之所以选择Flow，主要是因为Babel和ESLint都有对应的Flow插件以支持语法，可以完全用现有的构建配置，非常小成本的改动就
可以拥有静态类型检查的能力。

## Flow的工作方式
通常类型检查分成2种方式

* 类型推断：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型
* 类型注释：事先注释好我们期待的类型，Flow会基于这些注释来判断

## 类型推断
它不需要任何代码修改即可进行类型检查，最小化开发者的工作量。它不会强制你改变开发习惯，因为它会自动推断出变量的类型。
这就是所谓的类型推断，Flow最重要的特性之一。

```js
function split(str) {
  return str.split(' ')
}
split(11)
```

Flow检查上述代码后会报错，因为函数split期待的参数是字符串，而输入的是数字

## 类型注释
如上所述，类型推断是Flow最有用的特性之一，不需要编写类型注释就能够获取有用的反馈，但是在某些特定的场景下，
添加类型注释可以提供更好更明确的检查依据。

```js
function add(x, y) {
  return x + y
}
add('Hello', 11)
```

Flow检查上述代码时检查不出任何错误，因为从语法层面考虑，+ 即可以用在字符串上，也可以用在数字上，我们并没有明确指出add()的参数必须为数字

在这种情况下，我们可以借助类型注释来指明期望的类型。类型注释是以冒号：开头，可以在函数参数，返回值，变量声明中使用。

如果我们在上段代码中添加类型注释，就会变成如下：
```typescript
function add(x: number, y: number): number {
  return x + y
}
add('Hello', 11)
```
现在Flow就能检查出错误，因为函数参数的期待类型是数字，而我们提供了字符串。

### 数组
```typescript
var arr: Array<number> = [1, 2, 3]

arr.push('Hello')
```
数组类型注释的格式是Array<T>，T表示数组中每项的数据类型，在上述代码中，arr是每项均为数字的数组，
如果我们给这个数组添加一个字符串，Flow能检查出错误

### 类和对象
```typescript
class Bar {
  x: string;
  y: string | number;
  z: boolean;
  constructor(x: string, y: string | number) {
      this.x = x
      this.y = y
      this.z = false
  }
}

var bar: Bar = new Bar('hello', 4)

var obj: {a: string, b: number, c: Array<string>, d: Bar} = {
    a: 'hello',
    b: 11,
    c: ['hello', 'world'],
    d: new Bar('hello', 3)
}
```
类的类型注释格式如上，可以对类自身的属性做类型检查，也可以对构造函数的参数做类型检查，这里需要注意的是，属性y的类型中间用|做间隔，表示y的类型即可以是字符串也可以是数字

对象的注释类型类似于类，需要指定对象属性的类型

### Null
若想任意类型T可以为null或者undefined，只需类似如下写成?T的格式即可
```typescript
var foo:?string = null
```
此时，foo可以为字符串，也可以为null

## Flow在Vue.js源码中的应用
有时候我们需要引用第三方库，或者自定义一些类型，但Flow并不认识，因此检查的时候会报错，为了解决这类问题，Flow提出了一个libdef的概念，
可以用来识别这些第三方库或者是自定义类型，而Vue.js也利用了这一特性。

类似Flow的工具还有如TypeScript
