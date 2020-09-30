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

## Any类型
可以表示任意类型
```ts
let list: any[] = [1, true, "free"];
// ES5：let list = [1, true, "free"];
```

## Null和Undefined
在TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null，用处并不大

```ts
let u: undefined = undefined;
let n: null = null;
```

## never类型
never类型表示那些永不存在值的类型

never类型是any的子类型，也可以赋值给any，然而没有类型是never的子类型除了never本身，即使any也不可以赋值给never

## Object类型
object表示非原始类型，也就是除number、string、boolean、symbol、null或undefined之外的类型
```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK
```
但其实我们通常不会这样去使用妈，通常会使用接口interface更加详细的表示一个对象

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

## Any类型
any类型是使用现有javascript的强大方法，可让你在编译过程中逐步选择加入或退出类型检查

## void类型
void类型像是与any类型相反，它表示没有任何类型，主要使用场景是当一个函数没有返回值
```ts
function warnUser(): void {
  console.log("This is my warning message");
}
```

## 类型断言
类型断言是一种告诉编译器应该使用什么类型的方法，类型断言就像其他语言中的类型转换，但是不执行数据的特殊检查或重组，
它对运行时没有影响，仅由编译器使用，

### 类型断言有两种形式
* 一种是"尖括号"语法

```$xslt
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
* 一种是使用as语法

```$xslt
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
这两个方法是等效的
