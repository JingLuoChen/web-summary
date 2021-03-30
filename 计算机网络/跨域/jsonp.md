# jsonp
为了解决跨域问题，开发者创造出一种非官方跨域数据交互协议 --- jsonp

script:src是不会跨域的，这是主要论据

```
<script src="http://xxx.com/1.js"></script>
```

当然1.js的内容可以是json类型的数据 var RESULT = {"data": .....}，这样加载之后，就可以获得result这个变量


所以jsonp的基本原理将一个script节点动态插入document，随后浏览器会自动发起一个远程请求

```
$.jsonp({
    url: "http://**.com:8888/formTestData.do", 
    data: {
        param: "abc",
        callback: "yourCallbackFunc"
    }
});
function yourCallbackFunc(data) {
    console.log(data);
}
```

```
<script type="text/javascript" src="http://**.com:8888/formTestData.do?param1=abc&callback=yourCallbackFunc"></script>
<script type="text/javascript">
    function yourCallbackFunc(data) {
        console.log(data);
    }
</script>
```
