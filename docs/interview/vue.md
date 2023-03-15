<!--
 * @Author: jiaguichao
 * @Date: 2022-03-01 10:41:56
 * @LastEditTime: 2022-10-08 18:30:59
 * @Description: Do not edit
-->
## Vue
### 一、 vue3带来的新特性
**1. 压缩包体积更小**
- 当前最小化并被压缩的 Vue 运行时大小约为 20kB（2.6.10 版为 22.8kB）。Vue 3.0捆绑包的大小大约会减少一半，即只有10kB！

**2. Object.defineProperty -> Proxy**
- Object.defineProperty是一个相对比较昂贵的操作，因为它直接操作对象的属性，颗粒度比较小。将它替换为es6的Proxy，在目标对象之上架了一层拦截，代理的是对象而不是对象的属性。这样可以将原本对对象属性的操作变为对整个对象的操作，颗粒度变大。
- javascript引擎在解析的时候希望对象的结构越稳定越好，如果对象一直在变，可优化性降低，proxy不需要对原始对象做太多操作。

**3. Virtual DOM 重构**

vdom的本质是一个抽象层，用javascript描述界面渲染成什么样子。react用jsx，没办法检测出可以优化的动态代码，所以做时间分片，vue中足够快的话可以不用时间分片

**4. Performance**
vue3在性能方面比vue2快了2倍。

- 重写了虚拟DOM的实现
- 运行时编译
- update性能提高
- SSR速度提高

**5. Tree-shaking support**

vue3中的核心api都支持了tree-shaking，这些api都是通过包引入的方式而不是直接在实例化时就注入，只会对使用到的功能或特性进行打包（按需打包），这意味着更多的功能和更小的体积。

**6. Composition API**

vue2中，我们一般会采用mixin来复用逻辑代码，用倒是挺好用的，不过也存在一些问题：例如代码来源不清晰、方法属性等冲突。基于此在vue3中引入了Composition API（组合API），使用纯函数分隔复用代码。和React中的hooks的概念很相似

**7. 新增的三个组件Fragment、Teleport、Suspense**

**Fragment**

在书写vue2时，由于组件必须只有一个根节点，很多时候会添加一些没有意义的节点用于包裹。Fragment组件就是用于解决这个问题的（这和React中的Fragment组件是一样的）。
```
<!-- 这意味着现在可以这样写组件了。 -->
/* App.vue */
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>

<script>
export default {};
</script>

<!-- 或者这样 -->
// app.js
import { defineComponent, h, Fragment } from 'vue';

export default defineComponent({
    render() {
        return h(Fragment, {}, [
            h('header', {}, ['...']),
            h('main', {}, ['...']),
            h('footer', {}, ['...']),
        ]);
    }
});
```
**Teleport**

Teleport其实就是React中的Portal。Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。<br>
一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框。
```
/* App.vue */
<template>
    <div>123</div>
    <Teleport to="#container">
        Teleport
    </Teleport>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    setup() {}
});
</script>

/* index.html */
<div id="app"></div>
<div id="container"></div>
```
**Suspense**

同样的，这和React中的Supense是一样的。<br>
Suspense 让你的组件在渲染之前进行“等待”，并在等待时显示 fallback 的内容
```
// App.vue
<template>
    <Suspense>
        <template #default>
            <AsyncComponent />
        </template>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AsyncComponent from './AsyncComponent.vue';

export default defineComponent({
    name: "App",
    
    components: {
        AsyncComponent
    }
});
</script>

// AsyncComponent.vue
<template>
    <div>Async Component</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const sleep = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

export default defineComponent({
    async setup() {
        await sleep();
    }
});
</script>
```
**8. Better TypeScript support**

在vue2中使用过TypesScript的童鞋应该有过体会，写起来实在是有点难受。vue3则是使用ts进行了重写，开发者使用vue3时拥有更好的类型支持和更好的编写体验。
### 二、Vue的组件data为什么必须是一个函数?
new Vue是一个单例模式，不会有任何的合并操作，所以根实例不必校验data一定是一个函数。
组件的data必须是一个函数，是为了防止两个组件的数据产生污染。
如果都是对象的话，会在合并的时候，指向同一个地址。
而如果是函数的时候，合并的时候调用，会产生两个空间。
### 三、谈谈Vue的性能优化有哪些？
- 数据层级不要过深，合理的设置响应式数据
- 使用数据时，缓存值的结果，不频繁取值
- 合理设置key
- v-show(频繁切换性能高)和v-if的合理使用
- 控制组件的粒度 -> Vue采用组件级别更新
- 采用函数式组件 -> 函数式组价开销低
- 采用异步组件 -> 借助webpack的分包策略
- 使用keep-alive来缓存组件
- 虚拟滚动、时间分片等策略
- 打包优化
### 四、vue中使用了哪些设计模式？
- 单例模式：new多次，只有一个实例
- 工场模式：传入参数就可以创建实例（虚拟节点的创建）
- 发布订阅模式：eventBus
- 观察者模式：watch和dep
- 代理模式：_data属性、proxy、防抖、节流
- 中介者模式：vuex
- 策略模式
- 外观模式
### 五、说一说keep-alive实现原理
::: tip keep-alive
keep-alive组件接受三个属性参数：include、exclude、max
:::
- include 指定需要缓存的组件name集合，参数格式支持String, RegExp, Array。当为字符串的时候，多个组件名称以逗号隔开。
- exclude 指定不需要缓存的组件name集合，参数格式和include一样。
- max 指定最多可缓存组件的数量,超过数量删除第一个。参数格式支持String、Number。
#### 原理
- keep-alive实例会缓存对应组件的VNode,如果命中缓存，直接从缓存对象返回对应VNode
- LRU（Least recently used） 算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。(墨菲定律：越担心的事情越会发生)
