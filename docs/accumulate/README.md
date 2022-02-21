<!--
 * @Author: jiaguichao
 * @Date: 2022-01-17 11:03:24
 * @LastEditTime: 2022-02-21 11:40:16
 * @Description: Do not edit
-->
# 前端积累

## Vue项目过大nodejs内存溢出
#### 问题
今天在启动vue项目的时候报了这样一个错误, 如图所示：频繁出现此种情况，项目太大，导致内存溢出，排除代码问题外，可参照以下方式解决。</br>
[错误截图](/images/memoryOut.png)
#### 解决方案
```
// 全局安装increase-memory-limit
npm install -g increase-memory-limit
// 进入工程目录，执行：
increase-memory-limit
```
没错，就如此简单。

