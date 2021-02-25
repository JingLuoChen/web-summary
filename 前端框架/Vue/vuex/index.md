# vuex
## 概览
组件化应用构建是Vue的特点之一，因此我们在Vue的实际开发过程中会经常需要封装自定义组件，以提高开发的效率。
而组件在大部分情况下并不会孤立的存在，它必然会与父组件和兄弟组件产生数据的交互

## 介绍
Vuex是一个专为Vue.js应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

简单来说，Vuex就是一种公共的状态管理器，可以管理所有组件的状态

![mahua](vuex.png)

state是存储公共的状态，组件需要访问state数据时通过this.$store.state.属性 进行访问，修改了state页面会自动更新

actions是用来处理异步数据（当Vuex中的数据需要通过异步获取时，就必须要在actions中进行配置）

mutations是用来修改state中的数据，注意state中的数据只能在mutations里面的每一个函数中，通过默认传递的state参数进行修改

getters可以理解为是store的计算属性，getters中的函数依赖于state中的属性，当state中的属性发生了改变就会触发getters里面的方法

然后在src文件目录下新建一个名为store的文件夹，为方便引入并在store文件夹里新建一个index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store();

export default store;
```

接下来，在main.js里面引入store，然后在全局注入一下，这样一来就可以在任何一个组件里面使用this.$store
```js
import store from './store' // 引入store

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
```
## state
回到store文件的index.js里面，我们先声明一个state变量，并赋值一个空对象给它，里面定义初始属性值，然后再在实例化的Vuex.Store里面传入一个空对象，并把刚声明的变量state放里面

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {//要设置的全局访问的state对象
    showFooter: true,
    changableNum: 0
    //要设置的初始属性值
};
const store = new Vuex.Store({
  state
});
 
export default store;
```

实际上做完上面的三个步骤之后，你已经可以用this.$store.state.showFooter等在任何一个组件里面获取showFooter的值了，但这不是理想的获取方式，
Vuex提供了getters 和 vue计算属性computed一样，来实时监听state值得变化

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {//要设置的全局访问的state对象
    showFooter: true,
    changableNum: 0
    //要设置的初始属性值
};
const getters = { // 实时监听state值得变化
    isShow(state) { // 方法名随意，主要是来承载变化的showFooter的值
        return state.showFooter
    },
    getChangedNum() {
        return state.changableNum
    }
}
const store = new Vuex.Store({
  state,
  getters
});
 
export default store;
```

## mutations
mutations也是一个对象，这个对象里面可以放改变state的初始值的方法，具体的用法就是给里面的方法传入参数state或额外的参数，然后利用vue的双向数据驱动进行值的改变

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {//要设置的全局访问的state对象
    showFooter: true,
    changableNum: 0
    //要设置的初始属性值
};
const getters = { // 实时监听state值得变化
    isShow(state) { // 方法名随意，主要是来承载变化的showFooter的值
        return state.showFooter
    },
    getChangedNum() {
        return state.changableNum
    }
}
const mutations = {
    show(state) {
        state.showFooter = true
    },
    hide(state) {
        state.showFooter = false
    },
    newNum(state, sum) {
        state.changableNum += sum
    }
}
const store = new Vuex.Store({
  state,
  mutations,
  getters
});
 
export default store;
```
这时候你完全可以用this.$store.commit('show') 或 this.$store.commit('hide') 以及this.$store.commit('newNum', 6)方法

## actions 
actions也是个对象变量，最大的作用就是里面的Action方法可以包含任意异步操作，这里面的方法是用来异步触发mutations里面的方法，
actions里面自定义的函数接受一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit('')

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象
     showFooter: true,
     changableNum:0
     //要设置的初始属性值
};
const getters = {   //实时监听state值的变化(最新状态)
    isShow(state) {  //承载变化的showFooter的值
       return state.showFooter
    },
    getChangedNum() {  //承载变化的changebleNum的值
       return state.changableNum
    }
};
const mutations = {
    show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.showFooter = true;
    },
    hide(state) {  //同上
        state.showFooter = false;
    },
    newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
       state.changableNum += sum;
    }
};
 const actions = {
    hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('hide');
    },
    showFooter(context) {  //同上注释
        context.commit('show');
    },
    getNewNum(context,num){   //同上注释，num为要变化的形参
        context.commit('newNum',num)
     }
};
  const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
});
export default store;
```
在外部组件里进行全局执行actions里面的方法的时候，你只需要用执行this.$store.dispatch('hideFooter')等等方法

## modules模块化以及组件中引入mapGetters、mapActions 和 mapStates 的使用
因为在大多数的项目中，我们对于全局状态的管理并不仅仅一种情况的需求，有时有多方面的需求，比如写一个商城项目，
你所用到的全局state可能是关于购物车这一块的也有可能是关于商品价格这一块的，像这样的情况我们就需要考虑使用vuex中的modules模块化

首先，在store文件夹下面新建一个modules文件夹，然后在modules文件里面建立需要管理状态的js文件，既然要把不同部分的状态分开管理，那就要把它们给分成独立的状态文件

对应的store文件夹下面的index.js里面的内容就直接改写成
```js
import Vue from 'vue';
import Vuex from 'vuex';
import footerStatus from './modules/footerStatus'
import collection from './modules/collection'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
         footerStatus,
         collection
    }
});
```

相应的js，其中的namespaced: true表示当你需要再别的文件里面使用（mapGetters，mapActions）时，里面的方法需要注明来自哪一个模块的方法
```js
//collection.js

const state={
    collects:[],  //初始化一个colects数组
};
const getters={
  renderCollects(state){ //承载变化的collects
    return state.collects;
  }
};
const mutations={
     pushCollects(state,items){ //如何变化collects,插入items
        state.collects.push(items)
     }
 };
const actions={
    invokePushItems(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
        context.commit('pushCollects',item);
    }
};
export default {
     namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
     state,
     getters,
     mutations,
     actions
}
```

在对应使用的组件中我们可以这样使用

```vue
computed:{
    ...mapState({  //这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
         isShow:state=>state.footerStatus.showFooter //注意这些与上面的区别就是state.footerStatus,
                                                      //里面定义的showFooter是指footerStatus.js里state的showFooter
      }),
     //你也可以用下面的mapGetters来获取isShow的值，貌似下面的更简洁
    /*...mapGetters('footerStatus',{ //footerStatus指的是modules文件夹下的footerStatus.js模块
         isShow:'isShow' //第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
                         //第二个isShow是对应的footerStatus.js里的getters里的isShow
      })*/
},
watch:{
    $route(to,from){
      if(to.name=='book'||to.name=='my'){
         this.$store.dispatch('footerStatus/showFooter') //这里改为'footerStatus/showFooter',
                                                         //意思是指footerStatus.js里actions里的showFooter方法
      }else{
         this.$store.dispatch('footerStatus/hideFooter') //同上注释
      }
    }
}
```
