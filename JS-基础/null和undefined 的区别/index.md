# null和undefined 
>null 是 js 的关键字，表示一个特殊值，常用来描述空值<br>
typeof null -> object  /  Number(null) -> 0

>undefined 是预定义的全局变量，它的值就是未定义<br>
typeof undefined -> undefined  /  Number(undefined) -> NaN

## 使用场景上
>变量被声明了，但没有赋值， 该变量 -> undefined<br>
调用函数时，应该提供的参数没有提供，该参数 -> undefined<br>
对象没有赋值属性，该属性的值 -> undefined<br>
函数没有返回值时，默认返回 -> undefined

## js中如何判断undefined
以下是不正确的用法
```js
var exp = undefined;
if (exp == undefined)
{
  alert("undefined");
}
// exp为null，也会得到与undefined相同的结果，虽然null和undefined不一样

// 注意：要同时判断undefined和null时可使用本方法
```
```js
var exp = undefined;
if (typeof(exp) == undefined)
{
  alert("undefined");
}
// typeof返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
```
以下是正确的用法
```js
var exp = undefined;
if (typeof(exp) == "undefined")
{
  alert("undefined");
}
```
## js中如何判断null
以下是不正确的用法
```js
var exp = null;
if (exp == null)
{
  alert("is null");
}
// exp为undefined时，也会得到与null相同的结果，虽然null与undefined不一样 

// 注意：要同时判断null和undefined时可使用本方法
```
```js
var exp = null;
if (!exp)
{
  alert("is null");
}
// 如果exp是undefined或者数字0时，也会得到与null相同的结果，虽然null和二者不一样 

// 注意：要同时判断null、undefined和数字0时可使用本方法
```
以下是正确的用法
```js
var exp = null;
if (!exp && typeof(exp)!="undefined" && exp!=0)
{
  alert("is null");
}　
```

## 总结
>我们在DOM应用中，一般只需要使用（!exp）来判断就可以了，因为DOM应用中，可能返回null，可能返回undefined，
如果具体判断null还是undefined会使程序过于复杂
