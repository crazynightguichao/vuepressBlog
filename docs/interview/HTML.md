<!--
 * @Author: jiaguichao
 * @Date: 2022-03-01 11:26:11
 * @LastEditTime: 2022-03-03 11:33:57
 * @Description: Do not edit
-->
# HTML
## 1 meta 标签：自动刷新/跳转
假设要实现一个类似 PPT 自动播放的效果，你很可能会想到使用 JavaScript 定时器控制页面跳转来实现。但其实有更加简洁的实现方法，比如通过 meta 标签来实现：
```
<meta http-equiv="Refresh" content="5; URL=page2.html">
```
上面的代码会在 5s 之后自动跳转到同域下的 page2.html 页面。我们要实现 PPT 自动播放的功能，只需要在每个页面的 meta 标签内设置好下一个页面的地址即可。<br>
另一种场景，比如每隔一分钟就需要刷新页面的大屏幕监控，也可以通过 meta 标签来实现，只需去掉后面的 URL 即可：
```
<meta http-equiv="Refresh" content="60">
```
