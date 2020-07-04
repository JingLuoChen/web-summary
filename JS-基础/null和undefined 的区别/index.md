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
