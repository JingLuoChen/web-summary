# EventEmitter实现
```js
class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(cb)
        return this
    }
    emit(event, ...args) {
        let cbs = this.events[event]
        if (!cbs) {
            throw 'Error'
        }
        cbs.forEach(fn => fn.apply(this, args))
        return this
    }
    off(event, cb) {
        if (!cb) {
            this.events[event] = null
        } else {
             this.events[event].some((fn, i) => {
                 if (cb === fn) {
                     this.events[event].splice(i, 1)
                     return true
                 }
             })
        }
        return this
    }
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
