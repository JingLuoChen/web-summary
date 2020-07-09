# 数组扁平化
## 什么是数组扁平化
>数组的扁平化，就是将一个嵌套多层的数组array(嵌套可以是任何层数)转换为只有一层的数组
```js
// 事例
let arr = [1, [2, [3, 4]]]
console.log(flatten(arr)) // [1, 2, 3, 4]
```
## 数组扁平化方法
### ES6提供的新方法flat(depth)
```js
let a = [1,[2,3]] 
a.flat(); // [1,2,3]  
a.flat(1); //[1,2,3]
```
>flat(depth)方法中的参数depth，代表展开嵌套数组的深度，默认是1<br>
使用此方法的前提是知道数组的维度，参数depth的值就是数组的维度减一
```js
let a = [1,[2,3,[4,[5]]]];  
a.flat(Infinity); // [1,2,3,4,5]  a是4维数组
```
>无需知道数组的维度，直接将目标数组变成1维数组，depth的值设置为Infinity
### for循环+递归
```js
let arr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
function flat(arr) {
  let result = [] 
  for (let i < 0; i< arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat(arr[i])) // concat 并不会改变原数组
      //  result.push(...flat(arr[i])) // 扩展运算符  
    } else {
      result.push(arr[i])
    }
  }
  return result
}
flat(arr)
```
### while
```js
let arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flat(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
    console.log(arr)
    // arr = Array.prototype.concat.apply([],arr);
  }
  return arr;
}
flat(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```
>利用while判断加some遍历来实现扁平化
```$xslt
// 运行过程
(7) [1, 2, 3, 1, 2, 3, Array(2)] 1111
(8) [1, 2, 3, 1, 2, 3, 4, Array(3)] 1111
(10) [1, 2, 3, 1, 2, 3, 4, 2, 3, 4] 1111
```
### reduce方法
```js
let arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flat(arr) {
  return arr.reduce((res,next) =>{
    return res.concat(Array.isArray(next)? flat(next) : next);
  },[]);
}
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue);
   total: 必需。初始值, 或者计算结束后的返回值。
   currentValue： 必需。当前元素。
   currentIndex： 可选。当前元素的索引；                     
   arr： 可选。当前元素所属的数组对象。
   initialValue: 可选。传递给函数的初始值，相当于total的初始值。
例子：   
   const arr = [12, 34, 23];
   const sum = arr.reduce((total, num) => total + num, 0);
   // const sum = arr.reduce((total, num) => total + num)
   console.log(sum) // 69
```
### toString方法
>如果数组的元素都是数字，那么我们可以考虑使用 toString 方法，因为：
```js
[1, [2, [3, 4]]].toString() // "1,2,3,4"
[1, '1', 2, '2'].toString() // "1,1,2,2"

var arr = [1, [2, [3, 4]]];
function flat(arr) {
  return arr.toString().split(',').map(function(item){
    return +item // 此处转为Number类型
  })
}
console.log(flat(arr))
```

## 性能测试
* 可以使用console.time()/timeEnd()来观察函数运行执行的时间
>1、性能最好的是ES的flat(depth)<br>
2、最差的是while() reduce()

