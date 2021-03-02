# tree-shaking
在webpack项目中，有一个入口文件，相对于一棵树的主干，入口文件有很多依赖的模块，相当于树枝，实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能，
通过tree-shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的

## 原理
Tree-shaking的本质是消除无用的js代码，无用代码消除广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE（dead code elimination）

Tree-shaking是DCE的一种新的实现，JavaScript同传统的编程语言不同的是，JavaScript绝大多数情况需要通过网络进行加载，然后执行，加载的文件大小越小，整体执行时间更短，所以去除无用代码以减少文件体积，对JavaScript来说更有意义

Tree-shaking和传统的DCE的方法又不太一样，传统的DCE消灭不可能执行的代码，而Tree-shaking更关注于消除没有用到的代码，

## 目的
去除无用代码

## 前提条件
1、必须使用ES6模块化<br>
2、开启production环境

## 作用
减少文件打包体积

## 注意点
css文件在js中的引入可能会被tree shaking

在package.json中配置sideEffects: false 所有代码都没有副作用，都可以进行tree shaking

 问题：可能会把css / @babel/polyfill文件干掉
 
 解决：sideEffects: ["*.css"]，即标记这些文件不要进行tree shaking
 

