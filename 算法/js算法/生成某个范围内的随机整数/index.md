# 生成某个范围内的随机整数
```
Math.random() 函数返回一个浮点, 伪随机数在范围[0，1)
Math.ceil() 向上取整
Math.floor() 向下取整
Math.round() 四舍五入
```

```
生成[0,10]的随机整数，Math.round(Math.random() * 10) ，通过四舍五入可以将大于9.5的数值转换为10；

生成[0,10)的随机整数，Math.floor(Math.random() * 10 )；

生成(0,10]的随机整数，Math.ceil(Math.random() * 10 )；
```

## 生成随机整数的四种情况
### min ≤ r ≤ max
```js
function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
```

### min﹤r ≦ max
````js
function Random(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min;
}

function Random(min, max) {
    return Math.round(Math.random() * (max - min)) === 0? (min+1):Math.round(Math.random() * (max - min)) + min;
}
````

### min≦ r ﹤ max
```js
function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Random(min, max) {
    return Math.round(Math.random() * (max - min)) === max ? (max-1):Math.round(Math.random() * (max - min)) + min;
}
```

### min﹤ r ﹤ max
```js
function Random(min, max) {
    return Math.floor(Math.random() * (max - min)) === min  ? (min + 1) : Math.floor(Math.random() * (max - min)) + min;
}

function Random(min, max) {
    return Math.floor(Math.random() * ((max-1) - (min+1))) + (min+1);
}
```
