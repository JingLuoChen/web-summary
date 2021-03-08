# 原型和原型链
### 相关概念
* 1、js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
* 2、Object、Function都是js内置的函数，类似的还有Array、RegExp、Date、Boolean、Number、String
* 3、属性__proto__是一个对象，它有两个属性：constructor和__proto__
* 4、原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建

>有以下构造函数Person，他的原型上有所属国的属性motherland= 'china'
```js
function Person(name, age) {
  this.name = name
  this.age = age
}
```

### 构造函数与原型
>javaScript中的new操作符后面跟的并非类名而是函数名，即并非通过类而是直接通过构造函数来创建实例
```$xslt
  function Person(name, age) {
    this.name = name
    this.age = color
    this.hello = () => {    
      console.log('哈哈')
    }
  }
  const person1 = new Person('zhangsan', 11)
  person1.hello()
  
  const person2 = new Person('lisi', 21)
```
上述实例即 声明一个构造函数并通过构造函数创建实例的过程

------------------------------------------------------------------
>出现的问题：两个实例被创建，他们有自己名字和年龄，但方法是一样的，而通过构造函数创建实例的时候，每创建一个实例，都需要
重新创建这个方法，再把它添加到新的实例中，无疑造成了很大的浪费～

>请思考：既然实例的方法是一样的，为什么不把这个方法单独放到一个地方，并让所有的实例都可以访问到？
------------------------------------------------------------------
### 原型(prototype)
>* 每一个构造函数都拥有一个prototype属性，这个属性指向一个对象(原型对象)，当使用这个构造函数创建实例的时候，prototype属性指向的原型对象就成为实例的原型对象>
>* 原型对象默认拥有一个constructor属性，指向它的那个构造函数（构造函数和原型对象是互相指向的关系）
>* 每个对象都拥有一个隐藏的属性[[prototype]]，指向它的原型对象，这个属性可以通过Object.getPrototypeOf(obj) 或 obj.__proto__ 来访问
>* 构造函数的prototype属性与它创建的实例对象的[[prototype]]属性指向的是同一个对象
>* 原型对象就是用来存放实例中共有的那部分属性
>* JavaScript中，所有的对象都是由它的原型对象继承而来，反之，所有的对象都可以作为原型对象存在
>* 访问对象的属性时，JavaScript会首先在对象自身的属性内查找，若没有找到，则会跳转到该对象的原型对象中查找
------------------------------------------------------------------
```$xslt
  即上述代码可改成
  
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype.hello = () => {
    console.log('哈哈')
  }
  
  const person1 = new Person('zhangsan', 11)
  person1.hello()  // -> 哈哈
  
  const person2 = new Person('lisi', 21)
  person2.hello() = () => {
    console.log('我是person2~')
  }  
  
  person1.hello()  // ->  哈哈
  person2.hello()  // ->  我是person2
  
  
  ps: 这里person2重写hello重写并没有对person1造成影响，即重写是为自己添加一个新的方法使原型中的hello方法被覆盖了
      而并非直接修改了原型中的方法
```
* 将实例中共有的属性放到原型对象中，让所有实例共享这部分属性，如果想要统一修改所有实例继承的属性，只需要直接修改原型对象中的属性即可
* 而且每个实例仍然可以重写原型中已经存在的属性来覆盖这个属性，并不会影响到其他的实例
------------------------------------------------------------------
### 原型链与继承
* 原型链：JavaScript中所有的对象都是由它的原型对象继承而来，而原型对象自身也是一个对象，它也有自己的原型对象，这样层层上溯，就形成了一个类似链表的结构

* 所有原型链的终点都是Object函数的prototype属性，因为在javascript中的对象都默认由object()构造

* Object.prototype指向的原型对象同样拥有原型，不过它的原型是null，而null则没有原型

* 通过原型链就可以在JavaScript中实现继承，JavaScript中的继承相当灵活，有多种继承的实现方法

* 继承会在JavaScript面向对象中详细讲解～～～哈
