# 路由跳转模式
vue-router提供两种路由跳转方式：hash、history

Vue-Router 默认使用 hash 模式，使用 URL 的 hash 来模拟一个完整的URL，于是当URL改变时，页面不会重新加载。使用hash模式时URL中始终有#号

如果不希望你的URL带有#，可以选择使用history模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
但是使用history模式时有一个问题，因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 URL就会返回 404
