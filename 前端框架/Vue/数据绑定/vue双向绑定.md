# Vue的双向绑定
##几种实现双向绑定的做法
实现数据绑定的做法大致有如下几种：
>发布者-订阅者模式(backbone.js) <br>
脏值检查(angular.js)<br>
数据劫持(vue.js)

发布者-订阅者模式：一般通过sub，pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是vm.set('property', value) <br>
脏值检查：通过setInterval()定时轮询检测数据变动，angular只有在指定的事件触发时进入脏值检测<br>
数据劫持：vue则是通过采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter和getter，
在数据变动时发布消息给订阅者，触发相应的监听回调

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

* 数据描述符和存取描述符均具有以下可选键值<br>
configurable: 当且仅当该属性的configurable为true时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除，默认为false<br>

enumerable: 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中默认为false。

* 数据描述符具有以下可选键值<br>
value: 该属性对应的值。可以是任何有效的JavaScript值（数值、对象、函数等等），默认为undefined<br>

writable: 当且仅当该属性的writable为true时，value才能被赋值运算符改变，默认为false。

* 存取描述符具有以下可选键值<br>
get: 一个给属性提供getter的方法，如果没有getter则为undefined，当访问该属性时，该方法会被执行，方法执行时没有参数传入，
但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象），默认为undefined。<br>

set: 一个给属性提供setter的方法，如果没有setter则为undefined。当属性值修改时，触发执行该方法，该方法将接受唯一参数，即该属性新的参数值，默认为undefined。

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

console.log(person.name) // name属性被读取了...
person.name = "Tom" // name属性被修改了...

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

// 通过以上方法封装，我们可以直接定义person
let person = observable({
    name: 'tom',
    age: 15
});
````
即对对象中的所有属性都可以进行监测了，当对象中的属性值发生修改时我们就可以感知了

## 订阅器Dep实现
### 发布-订阅设计模式
发布-订阅模式又叫做观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态改变时，所有依赖于它的对象都将得到通知。

* 发布-订阅模式的优点
>发布-订阅模式广泛应用于异步编程中，这是一种替代传递回调函数的方案，比如，我们可以订阅ajax请求的error，success等事件。
在异步编程中使用发布-订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。

>发布-订阅模式可以取代对象之间硬编码的通知机制，一个对象不用再显示地调用另外一个对象的某个接口。发布-订阅模式让两个对象松耦合的联系在一起，虽然不太清楚彼此的细节，
但这不影响它们之间相互通信。当有新的订阅者出现时，发布者的代码不需要任何修改；同样发布者需要改变时，也不会影响到之前的订阅者，只要之前约定的事件名没有变化，就可以自由地改变它们


* 发布-订阅模式的生活实例
>以售楼处的例子来举例说明发布-订阅模式<br>
小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄，好在售楼MM告知小明，不久后还有一些尾盘推出，开发商正在办理相关手续，手续办好之后就可以购买，小明离开之前，
把电话号码留在 了售楼处。售楼 MM 答应他，新楼盘一推出就马上发信息通知小明。小红、小强和小龙也是一样，他们的电话号码都被记在售楼处的花名册上，
新楼盘推出的时候，售楼 MM会翻开花名册，遍历上面的电话号码，依次发送一条短信来通知他们。

### 订阅器Dep实现
完成了数据的可观测，我们就可以在数据被读取或者写的时候通知那些依赖该数据的视图更新了，为了方便，我们需要先将所有依赖收集起来，一旦数据发生变化，就统一通知更新。
其实，这就是前面所讲的发布订阅模式，数据变化为---"发布者"，依赖对象为---"订阅者"

>消息订阅器<br>
用来收集订阅者，然后当数据变化的时候后执行对应订阅者的更新函数

* 创建消息订阅器Dep：
```js
function Dep () {
    this.subs = [];
}
Dep.prototype = {  // 原型对象上
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
```
有了订阅器，将defineReactive函数进行改造，向其植入订阅器

```js
function defineReactive(data, key, val) {
	var dep = new Dep();
	Object.defineProperty(data, key, {
		enumerable: true, // 可枚举
		configurable: true, // 可更改
		get: function getter () {
			if (Dep.target) {
				dep.addSub(Dep.target);
			}
			return val;
		},
		set: function setter (newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal;
			dep.notify();
		}
	});
}
```
订阅器Dep类，该类里面定义类一些属性和方法，其中静态属性Dep.target，这是一个全局唯一的Watcher，因为在同一时间只能有一个全局的Watcher被计算，另外它的自身属性subs也是Watcher的数组

## 订阅者Watcher实现
订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，那该如何添加呢？

>我们已经知道监听器Observer是在get函数执行了添加订阅者Watcher的操作的，所以我们只要在订阅者Watcher初始化的时候触发对应的get函数去执行添加订阅者操作即可

那要如何触发get的函数？<br>
只要获取对应的属性值就可以触发了，核心原因就是因为我们使用了Object.defineProperty()进行数据监听，这里还有一个细节点需要处理，我们只要在订阅者Watcher初始化的时候才需要添加订阅者，
所以需要做一个判断处理，因此可以在订阅器上做一下手脚：<br>

在Dep.target上缓存下订阅者，添加成功后再将其去掉就可以了

* 订阅者Watcher的实现
```js
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this; // 全局变量 订阅者 赋值
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null; // 全局变量 订阅者 释放
        return value;
    }
};
```
订阅者Watcher是一个类，在它的构造函数中，定义了一些属性：<br>
* vm: 一个Vue的实例对象 <br>
* exp: 是node节点的v-model等指令的属性值或者插值符号中的属性，如v-model="name"，exp就是name <br>
* cb: 是Watcher绑定的更新函数 <br>

当我们去实例化一个渲染Watcher的时候，首先进入Watcher的构造函数逻辑，就会执行它的this.get()方法，进入get函数，首先会执行

> Dep.target = this; // 将自己赋值为全局的订阅者

实际上就是把Dep.target赋值为当前的渲染Watcher，接着又执行了

> let value = this.vm.data[this.exp] // 强制执行监听器里的get函数

在这个过程中会对vm上的数据访问，其实就是为了触发数据对象的getter <br>

每个对象值的getter都持有一个dep，在触发getter的时候会调用dep.depend()方法，也就会执行this.addSub(Dep.target)，即把当前的Watcher订阅到这个数据持有的dep的
Watchers中，这个目的是为了后续数据变化时候能通知到哪些Watchers做准备<br>

完成依赖收集后，还需要把Dep.target恢复成上一个状态，即：

> Dep.target = null; / /释放自己

而update()函数是用来当数据发生变化时调用Watcher自身的更新函数进行更新的操作，先通过let value = this.vm.data[this.exp]获取到最新的数据，
然后将其与之前get()获得的旧数据进行比较，如果不一样，则调用更新函数cb进行更新。

## 解析器Compile实现
### 解析器Compile关键逻辑代码分析
通过监听器Observer、订阅器Dep和订阅者Watcher的实现，其实就已经实现了一个双向数据绑定的例子，但是整个过程都没有去解析dom节点，而是直接固定某个节点进行替换数据的。

解析器Compile实现步骤：
* 解析模版指令，并替换模板数据，初始化视图
* 将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器

```js
compileText: function(node, exp) {
	var self = this;
	var initText = this.vm[exp]; // 获取属性值
	this.updateText(node, initText); // dom 更新节点文本值
    // 将这个指令初始化为一个订阅者，后续 exp 改变时，就会触发这个更新回调，从而更新视图
	new Watcher(this.vm, exp, function (value) { 
		self.updateText(node, value);
	});
}
```

## 源码
* [web-mvvm](https://github.com/JingLuoChen/web-mvvm)

## 参考文档

* [双向数据绑定](https://github.com/DMQ/mvvm)
* [vue 的双向绑定原理及实现](https://juejin.im/entry/6844903479044112391)
* [0 到 1 掌握：Vue 核心之数据双向绑定](https://juejin.im/post/6844903903822086151)



