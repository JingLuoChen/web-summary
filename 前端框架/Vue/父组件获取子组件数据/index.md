# 父组件、子组件 --- 相互获取数据方式
## 父组件主动获取子组件的数据和方法
1、调用子组件的时候，定义一个ref

```$xslt
<headerchild ref="headerChild"></headerchild>
```

2、在父组件里面通过

```$xslt
this.$refs.headerChild.属性

this.$refs.headerChild.方法
```

## 子组件主动获取父组件的数据和方法
在子组件里面通过

```$xslt
this.$parent.属性

this.$parent.方法
```
