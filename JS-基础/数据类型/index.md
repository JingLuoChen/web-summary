# js基本数据类型
## 值类型
String、Number、Boolean、Null、Undefined、Symbol、BigInt

## 引用类型
Object（Array、Function）

## BigInt --- 新增数据类型
BigInt数据类型的目的是比Number数据类型支持的范围更大的整数值，在对大整数执行数学运算时，以任意精度表示整数的能力尤为重要。使用BigInt，整数溢出将不再是问题。

为了解决这些限制，一些JS开发人员使用字符串类型表示大整数。 例如，Twitter API 在使用 JSON 进行响应时会向对象添加字符串版本的 ID。 此外，还开发了许多库，例如 bignumber.js，以便更容易地处理大整数。

使用BigInt，应用程序不再需要变通方法或库来安全地表示Number.MAX_SAFE_INTEGER和Number.Min_SAFE_INTEGER之外的整数。 现在可以在标准JS中执行对大整数的算术运算，而不会有精度损失的风险。

要创建BigInt，只需在整数的末尾追加n即可。比较:
```
console.log(9007199254740995n);    // → 9007199254740995n
console.log(9007199254740995);     // → 9007199254740996
```


## 参考文档
* [JS最新基本数据类型：BigInt](https://juejin.cn/post/6844903902295359502)
