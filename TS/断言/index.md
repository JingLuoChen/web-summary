# TypeScript断言
## 概览
类型断言是一种告诉编译器应该使用什么类型的方法，类型断言就像其他语言中的类型转换，但是不执行数据的特殊检查或重组，
它对运行时没有影响，仅由编译器使用
## 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具体比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，"相信我，我知道自己在干什么"，类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。
它没有运行时的影响，只是在编译阶段起作用

## 断言形式
### 尖括号语法
```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
### as语法
```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

## 非空断言
在上下文中当类型检查无法断定类型时，一个新的后缀表达式操作符！可以用于断言操作对象是非null和非undefined类型，具体而言，x!将从x值域中排除null和undefined。

### 忽略undefined和null类型
```typescript
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```
### 调用函数时忽略undefined类型
```typescript
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```
因为！非空断言操作符会从编译生成的javaScript代码中移除，所以在实际使用的过程中，要特别注意

## 确定赋值断言
