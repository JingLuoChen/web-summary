# 手写promise
## 初级版
```js
function promise(constructor) {
    let self = this;
    self.status = "pending"; //定义状态改变前的初始状态
    self.value = undefined;//定义状态为resolved的时候的状态
    self.reason = undefined;//定义状态为rejected的时候的状态
    resolve(value) {
        if (this.status === 'pending') {
             this.status = 'resolved'
             this.value = value
        }
    }
    reject(reason) {
        if (this.status === 'pending') {
             this.status = 'reject'
             this.value = reason
        }
    }
    try {
        constructor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

promise.prototype.then = function(onFullfilled, onRejected) {
    let self=this
    switch(self.status){
        case "resolved":
          onFullfilled(self.value)
          break
        case "rejected":
          onRejected(self.reason)
          break
        default:       
    }
}
```


// then返回的是promise

## 完整版
```js
class Promise {
    constructor(extrect) {
	    this.status = 'pending'; //promise状态
	    this.value = undefined; //resolve成功结果
	    this.reason = undefined; //reject失败结果
	    this.onFullFiledCallback = []; //成功回调列表
	    this.onRejectrdCallback = []; //失败回调列表
	    // 判断是否是函数
	    this.isFunction = (value) => typeof value === 'function';

    	// 成功回调
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'fullFiled';
                this.value = value;
                this.onFullFiledCallback.forEach((fn) => fn());
            }
    	};
        // 失败回调
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectrdCallback.forEach((fn) => fn());
            }
        };
        // 执行回调
        try {
        	extrect(resolve, reject);
        } catch (err) {
        	reject(err);
        }
    }
    // 实例方法
    then(onFullFiled, onRejected) {
    	onFullFiled = this.isFunction(onFullFiled)
    		? onFullFiled
    		: (data) => data;
    	onRejected = this.isFunction(onRejected)
    		? onRejected
    		: (err) => {
    				throw err;
    		  };
    	let promise2 = new Promise((resolve, reject) => {
    		let x;
    		if (this.status === 'fullFiled') {
                    try {
                    	x = onFullFiled(this.value);
                    	x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                    } catch (err) {
                    	reject(err);
                    }
    		}
    		if (this.status === 'rejected') {
    			try {
    				x = onRejected(this.reason);
    				x instanceof Promise ? x.then(resolve, reject) : resolve(x);
    			} catch (err) {
    				reject(err);
    			}
    		}
    		if (this.status === 'pending') {
    		    // 保存回调函数
    			this.onFullFiledCallback.push(() => {
    				try {
    					x = onFullFiled(this.value);
    					x instanceof Promise
    						? x.then(resolve, reject)
    						: resolve(x);
    				} catch (err) {
    					reject(err);
    				}
    			});
    			this.onRejectrdCallback.push(() => {
    				try {
    					x = onRejected(this.reason);
    					x instanceof Promise
    						? x.then(resolve, reject)
    						: resolve(x);
    				} catch (err) {
    					reject(err);
    				}
    			});
    		}
    	});
    	return promise2;
    }

    catch(onReject) {
        return this.then(undefined, onReject);
    }

    finally(cb) {
        return this.then(
            (value) => Promise.resolve(cb()).then(() => value),
            (reason) =>
                Promise.reject(cb()).then(() => {
            	    throw reason;
            })
        );
    }

    static resolve(value) {
        if (value instanceof Promise) return value;
        return new Promise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new Promise((resolve, reject) => reject(reason));
    }
	
	static all(promiseList) {
		return new Promise((resolve, reject) => {
			let valueArr = [];
			let index = 0;
			for (let i = 0; i < promiseList.length; i++) {
				if (promiseList[i] instanceof Promise) {
					promiseList[i].then(
						(res) => {
							valueArr[index] = res;
							index++;
							if (index === promiseList.length) {
								resolve(valueArr);
							}
						},
						(err) => {
							reject(err);
						}
					);
				} else {
					valueArr[index] = promiseList[i];
					index++;
					if (index === promiseList.length) {
						resolve(valueArr);
					}
				}
			}
		});
	}
	
    static race(promiseList) {
        return new Promise((resolve, reject) => {
    	    for (let i = 0; i < promiseList.length; i++) {
                if (promiseList[i] instanceof Promise) {
                    promiseList[i].then(
                        (res) => {
                            resolve(res);
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                } else {
                    resolve(promiseList[i]);
                }
    	    }
        });
    }
}

let p = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('resolve');
		reject('reject');
	}, 500);
});

p.then(
	(res) => {
		console.log(res);
		return new Promise((resolve, reject) => {
			resolve('promise2 success');
			reject('promise2 filed');
		});
	},
	(err) => {
		console.log(err);
		return 'promise2 filed';
	}
)
	.finally(() => {
		console.log('999');
	})
	.then((res) => {
		console.log(res);
	})
	.finally(() => {
		console.log('888');
	});


```
