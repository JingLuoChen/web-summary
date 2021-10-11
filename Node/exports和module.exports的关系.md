# exports和module.exports的关系和区别

其实，在node执行一个文件时，会给这个文件内生成一个exports对象和一个module对象，而这个module对象又有一个属性叫做exports

exports === module.exports 为true，这说明文件开始执行的时候，它们是指向同一个内存区域的

## module.exports
module.exports是一个对象，该对象由系统创建，在外部文件引入此模块时实际就是引入了exports对象，一般我们都采用module.exports.xxx的方式导出数据，
也可以使用直接给module.exports赋值的方式导出数据

## exports
exports是个值得注意的地方，它的使用方法和module.exports是一样的，类似于module.exports的快捷方式

非常要注意的是不要直接给exports赋值，只能使用.对exports的属性进行赋值，如果使用=直接给exports赋值会导致数据不能导出

原因：node模块是通过mudole.exports导出的，如果直接将exports变量指向一个值，就切断了exports和module.exports的联系，导致意外发生 --- 空对象



## 总结
1、Node中每个模块都有一个module对象，module对象中有一个exports属性为一个接口对象，我们需要把模块之间公共的方法或属性挂载在这个接口对象中，
方便其他的模块使用这些公共的方法和属性

2、Node中每个模块的最后，都会return module.exports

3、Node中每个模块都会把module.exports指向的对象赋值给一个变量exports，也就是说 exports = module.exports

4、module.exports === xxx，表示当前模块导出一个单一成员，结果就是xxx

5、如果需要导出多个成员时必须使用exports.add = XXX; exports.foo = XXX;或者使用module.exports.add = XXX; module.export.foo = XXX;

## 总结

在commonjs中，每个模块内部，module变量代表当前模块，这个变量是一个对象，对象中的exports属性是该模块外对的接口，加载一个模块其实就是加载该模块的module.exports属性

为了方便，node为每个模块提供了exports变量，该变量指向module.exports，等同于在每个模块顶部上加入var exports = module.exports

node模块是通过module.exports导出的，如果给exports变量指向另一个变量的话，该模块导出的就是空对象