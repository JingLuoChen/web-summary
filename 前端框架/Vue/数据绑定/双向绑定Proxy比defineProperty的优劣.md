# 实现双向绑定Proxy比defineproperty优劣如何?
## 概览
Vue三要素
>响应式：例如如何监听数据变化，其中的实现方法就是我们提到的双向绑定<br>
模版引擎：如何解析模版<br>
渲染：Vue如何将监听到的数据变化和解析后的HTML进行渲染

常见的基于数据劫持的双向绑定有两种实现，一个是目前Vue在用的Object.defineProperty，另一个是ES2015中新增的Proxy，而Vue将在Vue3.0版本后加入Proxy，从而代替Object.defineProperty
