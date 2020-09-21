# 基础类型
## 概述
TypeScript基本类型，也就是可以被直接使用的单一类型

## Boolean类型
```ts
let isDone: boolean = false;
// ES5：var isDone = false;
```

## Number类型

```ts
let count: number = 10;
// ES5：var count = 10;
```

## String类型
```ts
let name: string = "semliker";
// ES5：var name = 'semlinker';
```

## Symbol类型
```ts
const sym = Symbol();
let obj = {
  [sym]: "semlinker",
};

console.log(obj[sym]); // semlinker 
```

## Array类型
```ts
let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
```

## Enum类型
使用枚举我们可以定义一些带名字的常量，使用枚举可以清晰地表达意图或创建一组有区别的用例
