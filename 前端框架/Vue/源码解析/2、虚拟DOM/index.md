# 虚拟DOM
所谓虚拟DOM，就是用一个JS对象来描述一个DOM节点，我们把组成一个DOM节点的必要东西通过一个JS对象表示出来，那么这个JS对象就可以用来描述这个DOM节点，
我们把这个JS对象就称为这个真是DOM节点的虚拟DOM节点
```
<div class="a" id="b">我是内容</div>

{
  tag:'div',        // 元素标签
  attrs:{           // 属性
    class:'a',
    id:'b'
  },
  text:'我是内容',  // 文本内容
  children:[]       // 子元素
}
```

## 为什么需要虚拟DOM？

Vue是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图的时候难免要操作DOM，而操作真实DOM又是非常耗费性能的，这是因为浏览器的标准就把DOM设计的非常复杂

那我们就需要不要盲目的去更新视图，而是通过对比数据变化前后的状态，计算出视图中哪些地方需要更新，只更新需要更新的地方，而不需要更新的地方则不需要关心，这样就可以减少操作DOM

我们可以用JS模拟出一个DOM节点（虚拟DOM），当数据发生变化时，我们对比变化前后的虚拟DOM节点，通过DOM-Diff算法计算出需要更新的地方，然后去更新需要更新的视图


## VNode的作用
我们在视图渲染之前，把写好的template模板先编译成VNode 并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的VNode与前一次缓存下来的VNode进行对比，找出差异，
然后有差异的VNode对应的真实DOM节点就是需要重新渲染的节点，最后根据有差异的VNode创建出真实的DOM节点在插入到视图中，最终完成一次视图更新

* 即就是以JS的计算性能来换取操作真实DOM所消耗的性能，以达到减少操作真实DOM更新视图的目的

## DOM-Diff
在Vue中，把DOM-Diff过程叫做patch过程，即指对旧的VNode修补，打补丁从而得到新的VNode，其本质就是对比新旧两份VNode的过程。

即以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样

### patch
整个patch无非就做了三件事：

```
1、创建节点：新的VNode中有而旧的oldVNode中没有，就在旧的oldVNode中创建
2、删除节点：新的VNode中没有而旧的oldVNode中有，就从旧的oldVNode中删除
3、更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode
```

#### 创建节点
VNode类可以描述6种类型的节点，而实际上只有3种类型的节点能够被创建并插入到DOM中，它们分别是：元素节点、文本节点、注释节点，
所以Vue在创建节点的时候会判断在新的VNode中有而旧的oldVNode中没有的这个节点是属于哪种类型的节点，从而调用不同的方法创建并插入到DOM中

#### 删除节点
如果某些节点在新的VNode中没有而在旧的oldVNode中有，那么就需要把这些节点从旧的oldVNode中删除，删除节点非常简单，只需要在删除节点的父元素上调用removeChild方法即可

#### 更新节点
更细节点就是当某些节点在新的VNode和旧的oldVNode中都有时，我们就需要细致比较一下，找出不一样的地方进行更新

1、如果 VNode 和 oldVNode 均为静态节点<br>
  静态节点无论数据发生任何变化都与它无关，所以都为静态节点的话则直接跳过，无需处理

2、如果是VNode是文本节点<br>
  如果VNode是文本节点即表示这个节点内只包含纯文本，那么只需看oldVNode是否也是文本节点，如果是，那就比较两个文本是否不同，如果不同则把oldVNode里的文本改成跟VNode的文本一样，如果oldVNode不是文本节点，
  那么不论它是什么，直接调用setTextNode方法把它改成文本节点，并且文本内容跟VNode相同

3、如果VNode是元素节点<br>
  1、该节点包含子节点 --- 递归<br>
  2、该节点不包含子节点 --- 直接清空

#### 更细子节点
当新的VNode与旧的oldVNode都是元素节点并且都包含子节点时，那么这两个节点的VNode实例上的children属性就是所包含的子节点数组，我们把新的VNode上的子节点数组记为newChildren，
旧的oldVNode上的子节点数组记为oldChildren，我们把newChildren里面的元素和oldChildren里的元素--进行对比，对比两个子节点数组肯定是要通过循环，外层循环newChildren数组，
内层循环oldChildren数组，每循环外层newChildren数组里的一个子节点，就去内层oldChildren数组里找看有没有与之相同的子节点

* 以上过程将会存在四种情况

1、创建子节点
```
如果newChildren里面的某个子节点在oldChildren里找不到与之相同的子节点，那么说明newChildren里面的这个子节点时之前没有的，是需要此次新增的节点，那么就创建子节点
```

2、删除子节点
```
如果把newChildren里面的每一个子节点都循环完毕后，发现在oldChildren还有未处理的子节点，那就说明这些未处理的子节点是需要被废弃的，那么就将这些节点删除
```

3、移动子节点
```
如果newChildren里面的某个子节点在oldChildren里找到了与之相同的子节点，但是所处的位置不同，这说明此次变化需要调整该子节点的位置，那就以newChildren里子节点的位置为基准，
调整oldChildren里该节点的位置，使之与在newChildren里该节点相同
```

4、更新节点
```
如果newChildren里面的某个子节点在oldChildren里找到了与之相同的子节点，并且所处的位置也相同，那么就更新oldChildren里该节点，使之与newChildren里的该节点相同
```

## 优化更新子节点
Vue为了避免双重循环数据量大时间复杂度升高带来的性能问题，而选择了从子节点数组中的4个特殊位置互相比对，分别是：新前与旧前、新后与旧后、新后与旧前，新前与旧后


## 参考文档

* [Vue源码系列：Vue中文社区](https://vue-js.com/learn-vue/reactive/object.html#_2-%E4%BD%BFobject%E6%95%B0%E6%8D%AE%E5%8F%98%E5%BE%97-%E5%8F%AF%E8%A7%82%E6%B5%8B)
