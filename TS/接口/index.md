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

### 好处Two --- 过去我们用Node.js写后端接口
