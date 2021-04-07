# EventEmitter实现
```js
class EventEmitter {
    constructor() {
        this.events = {}
    }
    // 订阅事件
    on(event, cb) {
        if (this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(cb)
        return this
    }
    // 发布事件
    emit(event, ...args) {
        let cbs = this.events[event]
        if (!cbs) {
            throw 'Error'
        }
        cbs.forEach(fn => fn.apply(this, args))
        return this
    }
    // 取消订阅事件
    off(event, cb) {
        if (!cb) {
            this.events[event] = null
        } else {
            this.events[event].forEach((fn, i) => {
                if (fn === cb) {
                    this.events[event].splice(i, 1)
                    return true
                }
            })
        }
        return this
    }
    // 仅仅调用一次
    once(event, cb) {
        const func = (...args) => {
            cb.apply(this, args)
            this.off(event, func)
        }
        this.on(event, func)
        return this
    }
    
}
```
