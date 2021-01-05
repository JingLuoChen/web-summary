# 回文数判断
## 什么是回文数
回文数是指正序（从左到右）和倒叙（从右到左）读都是一样的整数
>例如
121 是回文数<br>
1221 是回文数<br>
1234 不是回文数<br>
-123 不是回文数

一些特殊的情况
* 0～9的数字都可以称为回文数<br>
* 不等于0，且尾数是0的都不是回文数<br>
* 负数都不是回文数

## 字符串的转换
### 使用高阶函数来完成
思路：先将数字转为字符串A，再经过转换成数组，数组反转，数组转换成字符串B，字符串A与字符串B比较

```js
var isPalindrome = function(x) {
    if ( x < 0 ) return false
    let str = '' + x
    return Array.from(str).reverse().join('') === str
}
```

### 从后往前循环字符串数组
思路：将数字转换成字符串A，从后往前循环字符串A，将循环出来的字符拼接成新的字符串B，比较字符串A和B

```js
var isPalindrome = function(x) {
    let str = x + ''
    let newStr = ''
    for(let len = str.length, i = len - 1; i >= 0 ; i--) {
        newStr += str[i]
    }}
    return newStr === str
}
```

### 以中间数为节点，判断左右两边首尾是否相等
```js
var isPalindrome = function(x) {
    if ( x < 0 || (x !== 0 && x % 10 === 0)) {
        return false
    } else if ( 0 <= x && x < 10) {
        return true
    }
    x = '' + x
    for(let i = 0 ; i < x.length/2; i++) {
        if (x[i] !== x[x.length - i - 1]) {
            return false
        }
    }
    return true
};
```

## 数字的转换
### 求模得尾数，除10得整数
思路： 先判断一些特殊情况【小于0的、尾数为0的、小于10的正整数】。之后，将整数反转，反转前后两个整数是否相等来判断是否为回文整数。
这里的反转：将整数求模得到尾数，之后每求一次模，都再原数上添加一位(通过*10来得到），这样就能得到一个反转的数。
计算需要求模的次数： 将整数除10，来计算求模的次数。Math.floor() 返回小于或等于一个给定数字的最大整数。

```js
var isPalindrome = function(x) {
    if ( x < 0 || (x !== 0 && x % 10 === 0)) {
        return false
    } else if ( 0 <= x && x < 10) {
        return true
    }
    let y = x
    let num = 0
    while(x !== 0) {
        num = x % 10 + num * 10
        x = Math.floor(x / 10)
    }
    return y === num
};
```
