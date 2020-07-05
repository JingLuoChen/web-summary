# 数据类型的转换
## javaScript数据类型
> 常见的js数据类型有String(字符串)、NUmber(数字)、Boolean(布尔)、Null、Undefined、Object(对象)、Symbol等等

>Symbol是ES6引入的新的数据类型，表示独一无二的数值

* 数据转换分为显示转换和隐式转换<br>
>显示转换：常见的显示转换方法有 Boolean、Number、String等等<br>
隐式转换：常见的隐式转换方法有 四则运算、==、判断语句

## String类型
### 一、String转换为Number
#### 1)、parseInt(string, 10)
>parseInt()函数可解析一个字符串，从0位置开始查看每个字符，直到找到第一个非有效的字符为止，最后并返回一个整数<br>
 即 会把小数转换成整数<br>
 第一个参数代表要转换的值 第二个参数代表以几进制进行转换
```$xslt
parseInt("10") // -> 10
parseInt("19", 10) // -> 19 (解析成十进制的值)
parseInt("11", 2) // -> 3（解析成二进制的值）
```
#### 2)、parseFloat(string)
>parseFloat()函数则是将值转换成浮点数，只有对String类型的数据调用该方法才正确运行
```$xslt
parseFloat("123asd") // -> 123
parseFloat("12.2") // -> 12.2
parseFloat("12.34.56") // -> 12.34
```
####  3)、Number(string)
>Number()函数转换的是整个值，而不是部分值<br>
parseInt 和 parseFloat 方法只转换第一个无效字符之前的字符串，因此 "1.2.3" 会分别转换为 1 和 1.2<br>
Number则进行强制类型转换 "1.2.3" 将返回 NaN  --> 因为整个字符串值不能转换为数字 
```$xslt
Number("1.2.3") // -> NaN
Number("1.2.3") // -> NaN
Number("1.2") // -> 1.2
Number("12asd") // -> NaN
```
#### 4)、+String
>通过在字符串前面加了一个+，这个数值就变成了Number类型
```$xslt
const s = "123"
console.log(+s) // -> 123
```
### 二、String转换为Object
#### JSON.parse()
>通过JSON.parse()转为object时，当遇到不可解析的字符串时，会抛出SyntaxError异常

### 三、String转object(Array数组类型)
>通过split()进行转换
```$xslt
let str = "name"
const arr = str.split("") // -> arr = ['n','a','m','e']
```

## Number类型
### 一、Number转String
#### 1)、n.toString()
>toString()方法会把数字转换成指定进制形式的字符串
```$xslt
12.toString() // -> "12"
2.toString(10) // -> '1010'
```
#### 2)、加空字符串
```$xslt
const s = 123
const str = s+'' // -> "123"
```

### 二、Number转Boolean
>Number类型转Boolean,除了0数值和NaN对应的是false，其他数值都是true
```$xslt
Boolean(0) // -> false
Boolean(1) // -> true
```

## Boolean类型
```$xslt
undefined
null
false
0
NaN
''或者""(空字符串)

以上这些 都转换为 false 其余全是true
```

## Object类型
>是由key-value聚合的数据集合，即属性的集合<br>
JS对象主要可以分为两大类<br>
内置对象(内部类): Array、Boolean、RegExp、Date、Math、Number、String等等<br>
宿主对象: js运行环境所提供的对象，BOM中的window、DOM中的document<br>
数组、日期、null等数据类型都是object
### 一、Object转为String
>使用toString
```$xslt
let obj = {name: '111'}
obj.toString() // -> "[object Object]"
```
### 二、Object转为Object数组
````$xslt
Object.values(object) // -> 返回一个对象所有可枚举属性对应数值组成的数组
Object.keys(object) // -> 返回一个对象所有可枚举属性组成的数组
Object.entries(object) // -> 返回一个给定对象自身可枚举属性的键值对数组
let obj = {
  name:'zhansan',
  age:12
}
Object.values(obj) // -> ['zhansan',12]   // obj中的value是什么类型，转为数组后也是对应的类型，不会全都转为字符串
Object.keys(obj) // -> ['name', 'age']
Object.entries(obg) // -> [ ['name','zhansan'] ,['age',12] ]
````
### 补充
>如果类数组对象或者可遍历的对象要转换，可以使用Array.from() -> 转为数组<br>
Array.from()使用前提是object中必须有length属性，返回的数组长度取决于这个object中的length长度，同时object中的key必须是数值
````$xslt
let obj = {
  0: 'zh',
  1: 12,
  length: 2
}
Array.from(obj) // -> ['zh', 12]
````
### 三、日期Object转Number
>将日期对象转换为数字（时间戳的形式），可以通过Number()或者日期方法getTime()
```$xslt
const date = new Date();
Number(date) // -> 1593590469727
date.getTime() // -> 1593590469727
```
### 四、数组Object转为String
>通过使用join()或者toString()方法转换为String<br>
join()可以指定分隔符，如果不加参数，则默认使用逗号作为分隔符
```$xslt
[1,2,3,4].join('-') // -> '1-2-3-4'
[1,2,3,4].toString() // -> '1,2,3,4'
```

## undefined和null类型
### 一、undefined和null 转为 Number类型
>undefined无法转为Number数字、Null转为0
```$xslt
Number(undefined) // -> NaN
Number(null) // -> 0

const add(a = 1,b) {
  return a + b
}
add(2) // -> 结果为 NaN   // 2 + undefined       // NaN
add(null, 2) // -> 结果为 2     // Number(null) + 2    // 0 + 2
add(undefined, 2)   -> 结果为 3     // 传入的undefined会以默认值为准
```
* 即可以看下undefined的使用场景
>变量被声明了，但没有赋值， 该变量 -> undefined<br>
调用函数时，应该提供的参数没有提供，该参数 -> undefined<br>
对象没有赋值属性，该属性的值 -> undefined<br>
函数没有返回值时，默认返回 -> undefined

## Symbol类型
>Symbol是ES6新引入的数据类型，表示独一无二的值，类似于一种标识唯一性的ID
```$xslt
let s = Symbol('hhh')
let s2 = Symbol('hhh')

s === s2 // -> false
```

## 拓展
### 类型判断
```$xslt
一般的数据类型使用 typeof 来判断数据类型 但只能区分基本数据类型

即 number、string、undefined、boolean、function、symbol

对于 数组 null 对象 使用typeof会统一返回 object

需要在原型链上进行获取判断
 
即使用 object.prototype.toString.call([]) // ->   [object Array]

ES6 判断数组 Array.isArray([]) // -> true
```
