<!--
 * @Author: jiaguichao
 * @Date: 2022-03-01 11:26:29
 * @LastEditTime: 2022-03-08 19:03:16
 * @Description: Do not edit
-->
## CSS
### 一、 BFC
- 块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

**触发条件:**
- 根元素
- position: absolute/fixed
- display: inline-block / table
- float 元素
- ovevflow !== visible

**规则:**
- 属于同一个 BFC 的两个相邻 Box 垂直排列
- 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- BFC 中子元素的 margin box 的左边， 与包含块 (BFC) border box的左边相接触 (子元素 absolute 除外)
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

**应用:**
- 阻止margin重叠
- 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个div都位于同一个 BFC 区域之中)
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖