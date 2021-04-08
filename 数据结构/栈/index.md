# 栈
## 概览
栈又名堆栈，是一种遵循后进先出原则的有序集合，新添加或待删除的元素都保存在栈的末尾，称作栈顶，另一端称作栈底，在栈里，新元素都靠近栈顶，旧元素接近栈底

## 实现栈的完整代码
栈其实就是利用数组来实现的，只不过不会利用下标进行操作
```js
function Stack() {

  /**
   * 用数组来模拟栈
   */
  var items = [];

  /**
   * 将元素送入栈，放置于数组的最后一位
   */
  this.push = function(element) {
    items.push(element);
  };

  /**
   * 弹出栈顶元素
   */
  this.pop = function() {
    return items.pop();
  };

  /**
   * 查看栈顶元素
   */
  this.peek = function() {
    return items[items.length - 1];
  }

  /**
   * 确定栈是否为空
   * @return {Boolean} 若栈为空则返回true,不为空则返回false
   */
  this.isAmpty = function() {
    return items.length === 0
  };

  /**
   * 清空栈中所有内容
   */
  this.clear = function() {
    items = [];
  };

  /**
   * 返回栈的长度
   * @return {Number} 栈的长度
   */
  this.size = function() {
    return items.length;
  };

  /**
   * 以字符串显示栈中所有内容
   */
  this.print = function() {
    console.log(items.toString());
  };
}
```



