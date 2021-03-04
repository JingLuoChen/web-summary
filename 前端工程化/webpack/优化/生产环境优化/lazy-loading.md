# lazy loading --- 懒加载
针对js进行懒加载，只触发了某些条件才加载，不会一次全加载

```
// 一定会为test文件进行单独打包
document.getElementById('btn').onclick = function() {
    // 懒加载： 当文件需要使用时才加载，文件体积比较大，使用体验不好，会出现延迟等情况
    // 预加载 prefetch： 会在使用之前，提前加载js文件  
    // 正常加载可以认为是并行加载---同一时间加载多个文件  预加载prefetch是等其他资源加载完，浏览器空闲了，在偷偷加载预加载文件，不会浪费时间，更加灵活， 但兼容性比较差
    import(/* webpackChunkName: 'test', wwebpackPrefetch: true */'./test').then((result) => {
        console.log('文件加载成功')
        console.log(result)
    }).catch(() => {
        console.log('文件加载失败')
    })
}
```
