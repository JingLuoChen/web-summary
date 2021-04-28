# 手写axios


```javascript
class Axios { 
    constructor() { 
    } 
    request(config) { 
        return new Promise((resolve, reject) => {
            const {url = '', method = 'get', data = {}} = config
            const xml = new XMLHttpRequest()
            xml.open(method, url, true)
            xml.onload = function() {
              resolve(xml.responseText)
            }
            xml.onerror = function(err) {
              reject(err)
            }
            xml.send(data)
        })
    } 
} 
```
