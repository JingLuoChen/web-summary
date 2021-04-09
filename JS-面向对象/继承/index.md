# 继承
## ES5实现继承
### 使用call实现继承
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name)
}

function Student(name, age, grade) {
  Person.call(this, name, age)
  this.grade = grade
}

let xm = new Student('小明', 14, '初二')
xm.getName()
console.log(xm, 1112222)
```
问题：虽然能够拿到父类的属性值，但是父类原型对象中一旦存在方法那么子类无法继承

### 借助原型链实现继承
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name)
}

function Student(name, age, grade) {
  this.name = name;
  this.age = age;
  this.grade = grade;
}
Student.prototype = new Person()

let xm = new Student('小明', 14, '初二')
xm.getName()
console.log(xm, 1112222)
```
问题：虽然能够实现继承，但父类的所有属性子类都需要在初始化一下

### 组合方式
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name)
}

function Student(name, age, grade) {
  Person.call(this, name, age)
  this.grade = grade;
}
Student.prototype = new Person()

let xm = new Student('小明', 14, '初二')
xm.getName()
console.log(xm, 1112222)
```

### 优化
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name)
}

function Student(name, age, grade) {
  Person.call(this, name, age)
  this.grade = grade;
}
//  用于设置原型
Student.prototype = Object.create(Person.prototype)
//  设置原型的构造器
// 把Student的constructor重新设为Student，不然的话它就会变成Person
Student.prototype.constructor = Student;

let xm = new Student('小明', 14, '初二')
xm.getName()
console.log(xm, 1112222)
```

## ES6实现继承
```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    getName() {
        console.log(this.name, '在想你哈')
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age)
        this.grade = grade
    }
}

let xm = new Student('小明', 14, '初二')
console.log(xm, 11111222)
```

constructor方法是类的构造函数，是一个默认方法，通过new命令创建对象实例时，自动调用该方法

在constructor中必须调用super方法，
