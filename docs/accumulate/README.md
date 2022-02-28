<!--
 * @Author: jiaguichao
 * @Date: 2022-01-17 11:03:24
 * @LastEditTime: 2022-02-28 09:54:16
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

## Vue监听浏览器窗口大小发生变化触发的事件
#### 监听浏览器窗口大小发生改变并触发事件在JS里有原生事件，但在vue里很多同学不知道应在将此事件写在哪里，下面给大家提供一个完整的案例。
```
<!DOCTYPE html>
<html>
	<head>
		<metacharset="UTF-8">
		<!-- import CSS -->
		<linkrel="stylesheet"href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
	</head>
	<body>
		<divid="app">
			<el-button @click="visible = true">实时屏幕宽度：{{windowWidth}}</el-button>
			<el-button @click="visible = true">实时屏幕高度：{{windowHeight}}</el-button>
			<el-dialog:visible.sync="visible"title="Hello world">
				<p>Try Element</p>
			</el-dialog>

			<divid="main"style="width: 100%;height:400px;"></div>
			<divid="main2"style="width: 100%;height:400px;"></div>
		</div>
	</body>
	<!-- import Vue before Element -->
	<scriptsrc="https://unpkg.com/vue/dist/vue.js"></script>
	<!-- import JavaScript -->
	<scriptsrc="https://unpkg.com/element-ui/lib/index.js"></script>
	<scriptsrc="https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0-alpha.1/echarts.min.js"></script>
	<script>var myChart;
		var myChart2;
		new Vue({
			el: '#app',
			data: function() {
				return {
					visible: false,
					windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
					windowHeight: document.documentElement.clientHeight, //实时屏幕高度
				}
			},
			methods: {
				myEcharts() {
					// 基于准备好的dom，初始化echarts实例// myChart = this.$echarts.init(document.getElementById('main')); //VUE脚手架模块化全局引入echarts时的写法
					myChart = echarts.init(document.getElementById('main')); //引入CDN echarts链接或在VUE脚手架模块化时在当前页面按需导入echarts时的写法
					myChart2 = echarts.init(document.getElementById('main2'));

					// 指定图表的配置项和数据var option = {
						title: {
							text: 'ECharts 入门示例'
						},
						tooltip: {},
						legend: {
							data: ['销量']
						},
						xAxis: {
							data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
						},
						yAxis: {},
						series: [{
							name: '销量',
							type: 'bar',
							data: [5, 20, 36, 10, 10, 20]
						}]
					};

					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					myChart2.setOption(option);
				}
			},
			mounted() {
				let that = this;
				this.myEcharts();
				window.onresize = () => {
					return (() => {
						window.fullHeight = document.documentElement.clientHeight;
						window.fullWidth = document.documentElement.clientWidth;
						that.windowHeight = window.fullHeight; // 高
						that.windowWidth = window.fullWidth; // 宽console.log("实时屏幕高度：", that.windowHeight);
						console.log("实时屏幕宽度：", that.windowWidth);
						myChart.resize();
						myChart2.resize();
					})()
				};

			}
		})
	</script>
</html>
```
