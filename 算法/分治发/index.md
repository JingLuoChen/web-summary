# 分治法
给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。

```
示例 1：

输入：s = "aaabb", k = 3
输出：3
解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。

示例 2：

输入：s = "ababbc", k = 2
输出：5
解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
```

````js
var longestSubstring = function (s, k) {
    const helper = (start, end) => { // 从start到end的区间的最长T长度
        if (end - start + 1 < k) { 	// 区间的长度小于k，不存在满足条件的T串
            return 0;
        }
        const freq = {};  // 统计当前区间的字符的出现次数
        for (let i = start; i <= end; i++) { // 遍历当前区间的字符 统计频次
            if (freq[s[i]] === undefined) {
                freq[s[i]] = 1;
            } else {
                freq[s[i]]++;
            }
        }
        // 在区间长度>=k的前提下，如果start位置上的字符出现的次数小于k
        while (end - start + 1 >= k && freq[s[start]] < k) {
            start++;   // 则T子串肯定不包含这个start字符，start指针右移
        }
        // 在区间长度>=k的前提下，如果end位置上的字符出现的次数小于k
        while (end - start + 1 >= k && freq[s[end]] < k) {
            end--;   // 则T子串肯定不包含这个end字符，end指针左移
        }
        if (end - start + 1 < k) { // 如果区间长度因此而 < k，直接返回0
            return 0;
        }
        for (let i = start; i <= end; i++) { // 遍历当前区间的字符
            if (freq[s[i]] < k) { // 如果在区间内的出现次数 < k，递归考察两侧的区间
                return Math.max(helper(start, i - 1), helper(i + 1, end));
            }
        }
        return end - start + 1; // 当前区间的字符出现次数都 >= k，当前区间满足要求，返回该长度
    };

    return helper(0, s.length - 1); // 整个s串的最长的T长度
};
````
