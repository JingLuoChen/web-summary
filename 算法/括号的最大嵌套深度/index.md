# 括号的最大嵌套深度

```
示例1：

输入：s = "(1+(2*3)+((8)/4))+1"
输出：3
解释：数字 8 在嵌套的 3 层括号中。


示例2：

输入：s = "(1)+((2))+(((3)))"
输出：3

示例3：

输入：s = "1+(2*3)/(2-1)"
输出：1
```

```js

var maxDepth = function(s) {
    let sum = 0, max = 0
    for (let i=0; i<s.length; i++) {
        if (s[i] === '(') {
            sum++
        } else if (s[i] === ')') {
            sum--
        }
        max = Math.max(sum, max)
    }
    return max
};
```
