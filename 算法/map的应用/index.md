# 存在重复元素
给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。

>示例1<br>
输入: nums = [1,2,3,1], k = 3<br>
输出: true

>示例2<br>
输入: nums = [1,2,3,1,2,3], k = 2<br>
输出: false

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// 执行时间和消耗内存都比较大 --- 算比较暴力的方法
var containsNearbyDuplicate = function(nums, k) {
    for (let i=0; i<nums.length; i++) {
        for (let j=i+1; j<nums.length; j++) {
            if (nums[i] === nums[j] && i !== j) {
                if (Math.abs(i - j) <= k) {
                    return true
                }
            }
        }
    }
    return false
};

// 使用map数据结构的算法
var containsNearbyDuplicate = function(nums, k) {
   let map = new Map();
   for (let i=0; i<nums.length; i++) {
       if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
           return true
       } else {
           map.set(nums[i], i)
       }
   }
   return false
};

// 同理可以使用set数据结构的算法
var containsNearbyDuplicate = function(nums, k) {
   let setArr = new Set()
   for(let i=0;i<nums.length;i++){
       if(setArr.has(nums[i])){
           let start= nums.lastIndexOf(nums[i],i-1)
           if(i-start<=k){
               return true
           }
       }
       setArr.add(nums[i])
   }
   return false
};
```
