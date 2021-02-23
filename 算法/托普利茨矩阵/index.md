# 托普利茨矩阵
给你一个 m * n 的矩阵matrix，如果这个矩阵是托普利茨矩阵，返回true，否则，返回false

如果矩阵上每一条由左上到右下的对角线上的元素都相同，那么这个矩阵就是托普利茨矩阵

```
输入：matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
输出：true
解释：
在上述矩阵中, 其对角线为: 
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]"。 
各条对角线上的所有元素均相同, 因此答案是 True 。
```

```js
var isToeplitzMatrix = function(matrix) {
    const r = matrix.length;
    const c = matrix[0].length;

    for (let i = 0; i < r - 1; i++) {
        for (let j = 0; j < c - 1; j++) {
            if (matrix[i][j] != matrix[i+1][j+1]) {
                return false;
            }
        }
    }
    return true;
};
```
