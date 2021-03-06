# 面向对象
## 面向过程编程POP---Process Oriented Programming
```$xslt
面向过程就是分析出解决问题的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了

优点：性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程思想
缺点：没有面向对象易维护、易复用、易扩展
```
## 面向对象编程OOP---Object Oriented Programming
```$xslt  
面向对象是把事物分解成为一个一个对象，然后由对象之间分工与合作
面向对象编程具有灵活性、代码可复用、容易维护和开发的优点，更适合多人合作的大型软件项目

优点：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，是系统更加灵活、更加易于维护
缺点：性能比面向过程低
```
## 事例区分 
* 例如 把大象装冰箱 
```$xslt
面向过程的思想就是

冰箱打开 冰箱关闭 大象装进去

面向对象的思想就是

冰箱 大象

```
## ES5中的类和对象
```js
function Person(name, age ) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    return '我叫' + this.name + ',今年' + this.age + '岁';
}
var  p = new Person('大彬哥',18);  // Person {name: "大彬哥", age: 18}
p.say()  
```
使用ES5语法定义了一个person类，该类有name和age两个属性和一个原型say方法

## ES6中的类和对象
### 面向对象的思维特点
* 抽取对象共用的属性和行为组织(封装)成一个类(模版)
* 对类进行实例化，获取类的对象

>好比 汽车图纸只有一份 但可以制造出成千上万辆汽车

### 对象
在现实生活中：万物皆对象，对象是一个具体的事物，看得见摸得着的实物。<br>
在js中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如：字符串，数组...<br>

对象是由属性和方法组成的：<br>
* 属性：事物的特征，在对象中用属性来表示
* 方法：事物的行为，在对象中用方法来表示

### 类Class
在ES6中新增加了类的概念，可以使用class关键字声明一个类，之后可以以这个类来实例化对象。<br>
类抽象了对象的公共部分，它泛指某一大类<br>
对象特质某一个，通过类实例化一个具体的对象

### 创建类
```$xslt
constructor()的方法是类的构造函数(默认方法)，用于传递参数，返回实例对象，通过new命令生成对象实例时，自动调用该方法，
如果没有显示定义，类内部会自动给我们生成一个constructor()
```
```js
// 语法
class People {
  constructor(name, age) {
     this.name = name
     this.age = age
  }
  say() {
     console.log(this.name + '你好')
  }
}

// 实例化对象
let zp = new People('刘德华', 26)

console.log(zp.name) // 刘德华
```
### 注意点
创建类和对象的几点注意事项：<br>
1、通过class关键字创建类，类名习惯性定义首字母大写<br>
2、类里面的constructor函数，可以接受传递过来的参数，同时返回实例对象<br>
3、constructor函数只要new生成实例时，就会自动调用<br>
4、生成实例new不能省略<br>
5、类名后面不需要小括号，生成实例时类名后面要有小括号，构造函数不需要加function
6、多个函数之间不需要添加逗号分隔

## 类中的成员
### 静态成员
静态成员是指在方法或属性名前面加上static关键字，和普通方法不一样的是，static修饰的方法不能在实例中访问，只能用类名直接访问
```js
class People {
  constructor(name, age) {
     this.name = name
     this.age = age
  }
  static say() {
     console.log(this.name + '你好')
  }
}
Person.say();
```
### 实例成员
在ES6中，类的实例属性只能定义在构造函数中，用this关键字定义只属于实例对象本身的属性，实例之间互不影响，千万不要在类中直接定义成员属性，至少目前来说是不支持的
```js
class People {
  constructor(name, age) {
     this.name = name // 实例成员
     this.age = age // 实例成员
  } 
  static say() {
     console.log(this.name + '你好')
  }
}
Person.say();
```


