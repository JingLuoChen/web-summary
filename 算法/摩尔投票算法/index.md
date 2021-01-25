# 摩尔投票算法
## 算法针对问题
找出一组数组序列中出现次数大于总数1/2的数字（并且假设这个数字一定存在），显然这个数字只可能有一个

摩尔投票算法是基于这个事实：每次从序列里选择两个不相同的数字删除掉（或称为"抵消"），最后剩下一个数字或几个相同的数字，就是出现次数大于总数一半的那个。

## 算法原理
摩尔投票算法的核心思想是任意元素两两抵消，最后剩下的元素一定是出现次数超过1/2的，算法维护一个序列元素num和一个计数器，num指示当前数字，计数器指示此元素还可以抵消几个元素

我们访问下一个元素时，多种情况，这里介绍两种思维方式：count为中心和元素为中心

### Count为中心
1、count=0：前面元素都两两抵消，应该将num指向当前元素

2、count>0：和当前元素相同，应将count+1；和当前元素不同，应将count-1

执行完毕后，余下的num即使出现次数最多的元素

### 元素为中心
1、和当前元素相同，应将count+1

2、和当前元素不同，如果count>1，抵消两个元素，应将count-1；如果count=0，说明前面的元素都被抵消了，应将num指向新元素，count+1

执行完毕后，余下的num即使出现次数最多的元素

## 算法的实现
### 以Count为中心的算法
```js
function majorityElement(nums) {
    let major = 0, count = 0;
    for (let i=0; i<nums.length; i++) {
        if (count === 0) {
            major = nums[i]
            count = 1
        } else {
            if (major === nums[i]) {
                count++
            } else {
                count--
            }
        }
    }
    return major
}
```

### 以元素为中心的算法
```js
function majorityElement(nums) {
    let major = nums[0], count = 1;
    for (let i=1; i<nums.length; i++) {
        if (nums[i] === major) {
            count++
        } else {
            if (count>0) {
                count--
            } else if (count === 0) {
                count++
                major = nums[i]
            }
        }
    }
}
```

## 时间复杂度和空间复杂度
时间复杂度为O(n)

空间复杂度为O(1)

摩尔投票算法的时间和空间复杂度都很低
