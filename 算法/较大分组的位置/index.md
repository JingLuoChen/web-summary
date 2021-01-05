# 较大分组的位置

在一个由小写字母构成的字符串 s 中，包含由一些连续的相同字符所构成的分组。

例如，在字符串 s = "abbxxxxzyy" 中，就含有 "a", "bb", "xxxx", "z" 和 "yy" 这样的一些分组。

分组可以用区间 [start, end] 表示，其中 start 和 end 分别表示该分组的起始和终止位置的下标。上例中的 "xxxx" 分组用区间表示为 [3,6] 。

我们称所有包含大于或等于三个连续字符的分组为 较大分组 。

找到每一个 较大分组 的区间，按起始位置下标递增顺序排序后，返回结果。

示例1
>输入：s = "abbxxxxzzy"<br>
输出：[[3,6]]<br>
解释："xxxx" 是一个起始于 3 且终止于 6 的较大分组。

示例2
>输入：s = "abc"<br>
 输出：[]<br>
 解释："a","b" 和 "c" 均不是符合要求的较大分组。


// 顺序遍历
```js
var largeGroupPositions = function(s) {
    let start = 0, end = 0
    let array = []
    let arr = s.split('')
    for (let i=1; i<=arr.length; i++) {
        if (arr[i] === arr[i-1]) {
            end++
        } else {
            if (end - start >= 2) {
                array.push([start, end])
            }
            start = end = i
        }
    }
    return array
};
```
