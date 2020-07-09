# runtime-only和runtime-compiler的区别
## 组件渲染过程
>先了解下组件是怎么被渲染到页面当中去的？<br>
```$xslt
         parse(解析)     compiler(编译)     render      update
template   ------>   ast   ------> render ------> vDom ------> ui

// 可以发现template最终还是会被渲染成为render函数的
``` 
## vue创建脚手架使用上的区别
```js
// runtime-only
import Vue from 'vue'
import App from './App'
new Vue({
   el: '#app',
   render: h => h(App)
})
```
```js
// runtime-compiler
import Vue from 'vue'
import App from './App'
new Vue({
  el:'#app',
  components: {App},
  template: '<App/>'
})
```
* 区别很明显，在Vue实例中，runtime-compiler创建的项目中的参数是components和template
* runtime-only创建的项目中，参数是render函数

## runtime-only
> 我们在使用runtime-only的时候，需要借助webpack的loader工具，将.vue文件编译为javaScript<br>
是通过使用vue-template-compiler转为render函数的

>在将.vue文件编译成为JavaScript文件过程中会将组件中的template模版编译为render函数，所以我们得到的是render函数的版本<br>
所以运行时是不带编译的，编译是在离线的时候做的

>loader中 vue-loader是处理.vue文件的 vue-template-compiler是编译template模版的

* 组件的渲染过程为 render -> vDom -> ui

## runtime-compiler
>因为在Vue中，最终渲染都是通过render函数，如果写template属性，则会编译为render函数，这个编译过程会发生在运行时，所以需要带有编译器的版本

>编译过程会对性能有一定的损耗

* 组件的渲染过程 template -> ast -> render -> vDom -> ui

## 总结 

> 推荐使用runtime-only构建项目<br>
runtime-only构建的项目代码体积更小，运行速度更快，性能更高（从组件的渲染就可以看出来，比compiler少了两步解析和编译步骤）
