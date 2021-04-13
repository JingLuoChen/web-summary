# vue-router的query和params的区别

$router为VueRouter实例，想要导航到不同url，则使用$router.push方法

$route为当前router跳转对象，里面可以获取name、path、query、params等

## params方式传参和接收参数

```
this.$router.push({
    name:'xxx'
    params:{
      id:id
    }
  })
  
接收参数:
this.$route.params.id
```

## query方式传参和接收参数
不过query使用name来引入也可以传参，使用path也可以
```
this.$router.push({
    path:'/xxx'
    query:{
      id:id
    }
  })
接收参数:
this.$route.query.id
```

## 区别
```
query方式生成的url为/xx?id=id，params方式生成的url为xx/id

params方式需要注意的是需要定义路由信息如：path: '/xx/:id',这样才能进行携带参数跳转，否则url不会进行变化，并且再次刷新页面后参数会读取不到
```
