# Vue的双向绑定
## 绑定原理
vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的

即Vue内部通过Object.defineProperty方法属性拦截的方式，把data对象里每个数据的读写转化成getter/setter，当数据变化时通知视图更新。

## 什么是MVVM数据双向绑定
MVVM数据双向绑定主要是指：数据变化更新视图，视图变化更新数据

即
* 输入框内容变化时，Data中的数据同步变化，即View => Data的变化。
* Data中数据变化时，文本节点的内容同步变化。即Data => View的变化。

其中，View变化更新Data，可以通过事件监听的方式来实现，即如何根据Data变化更新View。

### 实现数据的双向绑定
1、实现一个监听器Observer，用来劫持并监听所有属性，如果属性发生变化，就通知订阅者。<br>
2、实现一个订阅器Dep，用来收集订阅者，对监听器Observer和订阅者Watcher进行统一管理。<br>
3、实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的方法，从而更新视图。<br>
4、实现一个解析器Compile，可以解析每个节点的相关指令，对模板数据和订阅器进行初始化。<br>

流程图：
![mahua](./img/双向数据绑定.png)

## 监听器Observer实现
监听器Observer的实现，主要是指让数据对象变得"可观测"，即每次数据读或者写时，我们能感知到数据被读取了或者数据被改了。
要使数据变得"可观测"，Vue2.0源码中用到Object.defineProperty()来劫持各个数据属性的setter/getter。

>Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性并返回这个对象

### Object.defineProperty()语法
>Object.defineProperty(obj, prop, descriptor)

* 参数
obj: 要在其上定义属性的对象<br>
prop: 要定义或修改的属性的名称<br>
descriptor: 将被定义或修改的属性描述符<br>

* 返回值
被传递给函数的对象

* 属性描述符
Object.defineProperty()为对象定义属性，分数据描述符和存取描述符，两种形式不能混用

### 监听器Observer的实现
#### 字面量定义对象
通过字面量定义对象的方式
```js
let person = {
    name:'tom',
    age:15
}
```
可以直接使用person.name和person.age的方式来进行获取对象中的属性，但当对象中的属性值发生变化时，无法感知数据的变化？

#### Object.defineProperty()定义对象
通过Object.defineProperty()来定义对象的方式

```js
let val = 'tom'
let person = {}
Object.defineProperty(person,'name',{
    get() {
        console.log('name属性被读取了...');
        return val;
    },
    set(newVal) {
        console.log('name属性被修改了...');
        val = newVal;
    }
})
```
我们通过Object.defineProperty()方法给person的name属性定义了set和get方法进行拦截，每当有属性进行读或者写的操作时就会触发get和set的方法，
这样我们就可以感知属性值的变化了。

* 改进方法
封装函数，对对象中的所有属性进行监测
```js
/**
  * 循环遍历数据对象的每个属性
  */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 将对象的属性用 Object.defineProperty() 进行设置
 */
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`${key}属性被读取了...`);
            return val;
        },
        set(newVal) {
            console.log(`${key}属性被修改了...`);
            val = newVal;
        }
    })
}

let person = observable({
    name: 'tom',
    age: 15
});
````
即对对象中的所有属性都可以进行监测了

## 订阅者Dep实现
### 发布-订阅设计模式
发布-订阅模式又叫做观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态改变时，所有依赖于它的对象都将得到通知。



## 订阅者Watcher实现
## 解析器Compile实现
## 源码

## 参考文档

* [vue 的双向绑定原理及实现](https://juejin.im/entry/6844903479044112391)
* [0 到 1 掌握：Vue 核心之数据双向绑定](https://juejin.im/post/6844903903822086151)



