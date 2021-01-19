# 接口（Interfaces）
## 概述
### 好处One --- 过去我们写JavaScript
JavaScript中定义一个函数，用来获取一个用户的姓名和年龄的字符串：

```js
const getUserInfo = function(user) {
  return `name: ${user.name}, age: ${user.age}`
}

// 函数调用
getUserInfo({name: "koala", age: 18})
```

这对于我们之前写JavaScript的时候，再正常不过了，但是如果这个getUserInfo在多人开发过程中，如果它是个公共函数，
多个开发者都会调用，如果不是每个人点进来看函数对应注释，可能会出现以下问题：

```js
const getUserInfo = function(user) {
  return `name: ${user.name}, age: ${user.age}`
}

// 错误的调用
getUserInfo() // Uncaught TypeError: Cannot read property 'name' of undefined
console.log(getUserInfo({name: "kaola"})) // name: kaola, age: undefined
getUserInfo({name: "kaola", height: 1.66}) // name: koala, age: undefined
```

JavaScript是弱类型的语言，所以并不会对我们传入的代码进行任何检测，有些错你自己都说不清楚，但是就出了问题

### TypeScript中的interface可以解决这个问题
```typescript
const getUserInfo = (user: {name: string, age: number}):string => {
    return `name: ${user.name}, age: ${user.age}`
}

// 正确的调用
getUserInfo({name: "kaola", age: 18});

// 错误的调用
getUserInfo(); // 错误信息：An argument for 'user' was not provided.
getUserInfo({name: "coderwhy"}); // 错误信息：Property 'age' is missing in type '{ name: string; }'
getUserInfo({name: "coderwhy", height: 1.88}); // 错误信息：类型不匹配
```

这时候你会发现这段代码还是有点长，代码不便于阅读，这时候就体现interface的必要性

### 使用interface对user的类型进行重构
我们先定义一个IUser接口：

```typescript
interface IUser {
  name: string,
  age: number
}

const getUserInfo = (user: IUser): string => {
  return`name: ${user.name}, age: ${user.age}`;
}

// 正确的调用
getUserInfo({name: "koala", age: 18})

// 错误的调用报错跟之前的一样
```

* 接口中函数的定义再次改造

```typescript
type IUserInfoFunc = (user: IUser) =>string;

interface IUser {
  name: string;
  age: number;
}
```

接着我们去定义函数和调用函数即可：

```typescript
type IUserInfoFunc = (user: IUser) =>string;

interface IUser {
  name: string;
  age: number;
}

const getUserInfo: IUserInfoFunc = (user) => {
  return`name: ${user.name}, age: ${user.age}`;
};

// 正确的调用
getUserInfo({name: "koala", age: 18});

// 错误的调用
getUserInfo(); // Invalid number of arguments, expected 1 
```

## 接口的定义
和java语言相同，TypeScript中定义接口也是使用interface关键字来定义

```typescript
interface IQuery {
    page: number
}
```

## 接口中定义方法
看上面的接口中，我们定义了page常规属性，定义接口时候不仅仅可以有属性，也可以有方法，看下面的例子：
```typescript
interface IQuery {
    page: number;
    findOne(): void;
    findAll(): void;
}
```
如果我们有一个对象是该接口类型，那么必须包含对应的属性和方法（无可选属性情况）：
```typescript
const q: IQuery = {
  page: 1,
  findOne() {
    console.log("findOne");
  },
  findAll() {
    console.log("findAll");
  },
};
```

## 接口中定义属性
### 普通属性
上面的page就是普通属性，如果一个对象是该接口类型，那么必须包含对应的普通属性。

### 可选属性
默认情况下一个变量（对象）是对应的接口类型，那么这个变量（对象）必须实现接口中所有的属性和方法

但是，开发中为了让接口更加的灵活，某些属性我们可能希望设计成可选的，这个时候就可以使用可选属性

```typescript
interface IQuery {
    page: number;
    findOne(): void;
    findAll(): void;
    isOnline?: string | number; // 是否出售中的商品
    delete?() : void;
}
```
上面的代码中，我们增加了isOnline属性和delete方法，这两个都是可选的

>注意<br>
可选属性如果没有赋值，那么获取到的值是undefined; 对于可选方法，必须先进行判断，在调用，否则会报错

```typescript
const q: IQuery = {
 page: 1,
 findOne() {
   console.log("findOne");
 },
 findAll() {
   console.log("findAll");
 },
};

console.log(q.isOnline); // undefined
q.delete(); // 不能调用可能是“未定义”的对象。

// 正确的调用方式：
if (q.delete) {
    q.delete()
}
```

大家可能会问既然是可选属性，可有可无的，那么为什么还要定义呢？对比起完全不定义，定义可选属性主要是：为了让接口更加的灵活，
某些属性我们可能希望设计成可选，并且如果存在属性，能约束类型，而这也是十分关键的


