# promise封装ajax
```js
const getData = (url) => {
    return new Promise((resolve, reject) => {
        // 创建对象
        const xml = new XMLHttpRequest()
        // 初始化
        xml.open('get', url)
        // 发送请求
        xml.send()
        // 处理响应结果
        xml.onreadystatechange = () => {
            // 请求是否有响应
            if (xml.readyState === 4) {
                if (xml.status >= 200 && xml.status < 300) {
                    resolve(xml.response)
                } else {
                    reject(xml.status)
                }
            }
        }
    })
}
getData()
```


