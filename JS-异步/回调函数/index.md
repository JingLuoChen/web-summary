# 回调函数
### 何为回调函数（callback function）
>当程序跑起来时，一般情况下，应用程度会时常通过API调用库里所预先备好的函数。<br>
但是有些库函数却要求应用先传给它一个函数，好在合适的时候调用，以完成目标任务。<br>
这个被传入的、后又被调用的函数就称为回调函数

### 例子
```$xslt
// 定义函数
function doSomething(msg, callback){
  alert(msg);
  if(typeof callback == "function") {
    callback();
  }
} 
// 调用函数
doSomething("回调函数", function(){
  alert("匿名函数实现回调!");
}); 
// 执行结果 alert('回调函数') alert('匿名函数实现回调') 
```

### 经典回调函数代码
```$xslt
// 异步请求的回调函数
$.get(url,function(res) {
  console.log(res)
})
// 点击事件的回调函数
$('#btn').click(function($event){
  console.log($event)
})
// 同步回调
function doSomething(msg, callback){
  alert(msg);
  if(typeof callback == "function") {
    callback();
  }
} 
doSomething("回调函数", function(){
  alert("匿名函数实现回调!");
}); 
```
>回调于同步、异步并没有直接的联系，回调只是一种实现方式，既可以有同步回调，也可以有异步回调，还可以有事件处理回调和延迟函数回调

### 异步编程中的回调函数
#### 场景
* 异步调用（例如读取文件、ajax、加载js文件、加载iframe资源等等等等）
* 事件监听器/处理器
* setTimeout/setInterval方法

### 回调地域问题以及解决方案
#### 回调地域
```$xslt
var p_client = new Db('integration_tests_20', new Server("127.0.0.1", 27017, {}), {'pk':CustomPKFactory});
   p_client.open(function(err, p_client) {
       p_client.dropDatabase(function(err, done) {
           p_client.createCollection('test_custom_key', function(err, collection) {
               collection.insert({'a':1}, function(err, docs) {
                   collection.find({'_id':new ObjectID("aaaaaaaaaaaa")}, function(err, cursor) {
                       cursor.toArray(function(err, items) {
                           test.assertEquals(1, items.length);
 
                           // Let's close the db
                           p_client.close();
                       });
                   });
               });
           });
       });
   });
```
>让人头疼的回调地域
#### 解决方案 
> promise链式调用或者async/await来解决
