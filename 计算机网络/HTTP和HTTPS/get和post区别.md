# HTTP中get和post的区别

```
get在浏览器回退时是无害的，而post会再次提交请求

get产生的url地址可以被BookMark，而post不可以

get请求会被浏览器主动cache，而post不会，除非手动设置

get请求只能进行url编码，而post支持多种编码方式

get请求参数会被完整保留在浏览器历史记录里，而post中的参数不会被保留

get请求在url中传送的参数是有长度限制的，而post木有

对参数的数据类型，get只接受ASCII字符，而post没有限制

get比post更不安全，因为参数直接暴露在url上，所以不能用来传递敏感信息

get参数通过url传递，post放在Request Body中
```


## 参考文档
* [听说『99% 的人都理解错了 HTTP 中 GET 与 POST 的区别』？？](https://zhuanlan.zhihu.com/p/25028045)
* [都9102年了，还问GET和POST的区别](https://segmentfault.com/a/1190000018129846)
