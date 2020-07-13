# 内存泄漏
## 定义
>程序的运行需要内存，只要程序提出要求，操作系统或者运行时，就必须提供内存，对于持续运行的服务进程，必须及时释放不再用到的内存
否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃
* 简单说就是不再被需要的内存，由于某种原因无法被释放
## 常见的JavaScript内存泄漏
### 全局变量造成内存泄漏
```js
function foo() {
  name: 'zhangsan'
}
console.log(name)
```
在javaScript中处理未被声明的变量，上述范例会把name定义到全局对象中，在浏览器中就是window上，在页面中的全局变量，只要当页面被关闭后才会被销毁

### 未销毁的定时器和回调函数造成内存泄漏
```js
setInterval(function() {
  let oHtml = document.getElementById("test")
  if(oHtml) {
    oHtml.innerHTML = function() {
      return 2
    };
  }
}, 1000); // 每 1 秒调用一次
```
如果没有回收定义器，整个定时器依然有效，不但定时器无法被内存回收，定时器函数中的依赖也无法回收
### 闭包造成内存泄漏
一个内部函数，有权访问包含其的外部函数中的变量，因为外部中的变量被引用，所以外面的作用域会一直保留，不会被销毁，造成内存泄漏

### DOM引用造成内存泄漏
很多时候，我们对DOM的操作，会把DOM的引用保存在一个数组或者Map中
```js
let refA = document.getElementById('refA');
document.body.removeChild(refA); // dom删除了
console.log(refA, "refA");  // 但是还存在引用
// 能console出整个div 没有被回收
```
保留了对DOM中节点的引用，导致没有被回收，可以设置为refA为null

## 参考文档
* [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
* [彻底掌握js内存泄漏以及如何避免](https://juejin.im/post/5d5664ebf265da03f3334f13)
* [javascript 垃圾回收机制](https://juejin.im/post/5b684f30f265da0f9f4e87cf)

