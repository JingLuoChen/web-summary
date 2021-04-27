# 手写jsonp
```javascript
function jsonp(url, data = {}, callback = 'callback') {
   // 处理json对象，拼接url
   data.callback = callback
   let params = []
   for (let key in data) {
     params.push(key + '=' + data[key])
   }
   console.log(params.join('&'))
   // 创建script元素
   let script = document.createElement('script')
   script.src = url + '?' + params.join('&')
   document.body.appendChild(script)
   // 返回promise
   return new Promise((resolve, reject) => {
     window[callback] = (data) => {
       try {
         resolve(data)
       } catch (e) {
         reject(e)
       } finally {
         // 移除script元素
         script.parentNode.removeChild(script)
         console.log(script)
       }
     }
   })
}

```
