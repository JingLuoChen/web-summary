# 实现双向绑定Proxy比defineproperty优劣如何?
## 概览
Vue三要素
>响应式：例如如何监听数据变化，其中的实现方法就是我们提到的双向绑定<br>
模版引擎：如何解析模版<br>
渲染：Vue如何将监听到的数据变化和解析后的HTML进行渲染

常见的基于数据劫持的双向绑定有两种实现，一个是目前Vue在用的Object.defineProperty，另一个是ES2015中新增的Proxy，而Vue将在Vue3.0版本后加入Proxy，从而代替Object.defineProperty

>严格来讲Proxy应该被称为「代理」而非「劫持」，不过由于作用有很多相似之处，

数据绑定方式：

![mahua](./img/数据绑定.png)

## 基于数据劫持实现的双向绑定的特点

### 什么是数据劫持
数据劫持比较好理解，通常我们利用 Object.defineProperty 劫持对象的访问器，在属性值发生变化时我们可以获取变化，从而进行进一步操作

```js
// 这是将要被劫持的对象
const data = {
  name: '',
};

function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏');
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多,可游戏我只玩贪玩懒月');
  } else {
    console.log('来做我的兄弟');
  }
}

// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置对象，删除属性
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});

data.name = '刘德华';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月

```

### 数据劫持的优势
目前业界分为两个大的流派，一个是以React为首的单向数据绑定，另一个是以Angular、Vue为主的双向数据绑定。

>其实三大框架都是既可以双向绑定也可以单向绑定，比如React可以手动绑定onChange和value实现双向绑定，也可以调用一些双向绑定库，Vue也加入了props这种单向流的api，不过都是非主流卖点

数据劫持的优势所在：

1、无需显示调用：例如Vue运用数据劫持+发布订阅，直接可以通知变化并驱动视图。<br>
上面的例子也是比较简单的实现data.name = '刘德华'后直接触发变更，而比如Angular的脏值检测则需要显示调用markForCheck，react需要显示调用setState

2、可精确得知变化数据：还是上面的小🌰，我们劫持了属性的setter，当属性值改变，我们可以精确获知变化的内容newVal，因此在这个部分不需要额外的diff操作，否则我们只知道数据发生了变化而不知道
具体哪些数据变化了，这个时候大量diff来找出变化值，这个额外性能损耗。

### 基于数据劫持双向绑定的实现思路
数据劫持是双向绑定各种方案中比较流行的一种，最著名的实现就是Vue

基于数据劫持的双向绑定离不开 Proxy 与 Object.defineProperty 等方法对对象/对象属性的劫持，要点：

1、利用 Proxy 或 Object.defineProperty生成的Observer针对对象/对象属性进行劫持， 在属性发生变化后通知订阅者

2、解析器 Compile 解析模版中的 Directive（指令），收集指令所依赖的方法和数据，等待数据变化然后进行渲染

3、Watcher数据 Observer 和 Compile 桥梁，它将接收到的Observer产生的数据变化，并根据Compile提供的指令进行视图渲染，使得数据变化促使视图比那话

![mahua](./img/数据劫持.png)
