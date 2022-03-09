<!--
 * @Author: jiaguichao
 * @Date: 2022-01-17 11:03:24
 * @LastEditTime: 2022-03-09 09:57:15
 * @Description: Do not edit
-->
# 前端积累

## 一、 Vue项目过大nodejs内存溢出
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

## 二、 Vue监听浏览器窗口大小发生变化触发的事件
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
## 三、 十万条数据,前端如何优雅渲染到页面上?

#### 面试题: 后台传给前端十万条数据,你作为前端如何渲染到页面上?
- 回答者A：我有句话不知当讲不当讲,这什么鬼需求。
- 回答者B：滚，后端,我不要这样的数据,你就不能分页给我吗。
- 回答C：10万条数据这怎么展示，展示了也看不完啊。
#### 分析一下下
面试官既然能这么问，我们从技术的角度出发，探索一下这道题，上手操作了一下：
```
function loadAll() {
	var html = "";
	for (var i = 0; i < 100000; i++) {
		html += "<li>title:" + '我正在测试'+[i] + "</li>";
	}
	let content = document.getElementById("content")
	content.append(html);
}
loadAll();

```
::: tip 结果
浏览器之间加载十万条数据，网页直接崩溃，或者需要加载至少10秒。
:::
#### 解决方案
既然一次渲染10万条数据会造成页面加载速度缓慢，那么我们可以不要一次性渲染这么多数据，而是分批次渲染， 比如一次10000条，分10次来完成， 这样或许会对页面的渲染速度有提升。 然而，如果这13次操作在同一个代码执行流程中运行，那似乎不但无法解决糟糕的页面卡顿问题，反而会将代码复杂化。 类似的问题在其它语言最佳的解决方案是使用多线程，JavaScript虽然没有多线程，但是setTimeout和setInterval两个函数却能起到和多线程差不多的效果。 因此，要解决这个问题， 其中的setTimeout便可以大显身手。 setTimeout函数的功能可以看作是在指定时间之后启动一个新的线程来完成任务。
```
// 分组渲染
var response = [];
var html = "";
for (var i = 0; i < 100000; i++) {
	html = "<li>title:" + '我正在测试'+[i] + "</li>";
	response.push(html)
}
// console.log(response,'response');
function loadAll(response) {
	//将10万条数据分组， 每组500条，一共200组
	var groups = group(response);
	// console.log(groups,'groups');
	for (var i = 0; i < groups.length; i++) {
		//闭包， 保持i值的正确性
		window.setTimeout(function () {
			var group = groups[i];
			var index = i + 1;
			return function () {
				//分批渲染
				loadPart( group, index );
			}
		}(), 1);
	}
}
//数据分组函数（每组500条）
function group(data) {
	var result = [];
	var groupItem;
	for (var i = 0; i < data.length; i++) {
		if (i % 500 == 0) {
			groupItem != null && result.push(groupItem);
			groupItem = [];
		}
		groupItem.push(data[i]);
		// console.log(groupItem,'groupItem');
	}
	result.push(groupItem);
	return result;
}
var currIndex = 0;
//加载某一批数据的函数
function loadPart( group, index ) {
	// console.log(group,'================');
	var html = "";
	for (var i = 0; i < group.length; i++) {
		var item = group[i];
		html += item;
	}
	//保证顺序不错乱
	while (index - currIndex == 1) {
		let content = document.getElementById("content")
		content.append(html);
		currIndex = index;
	}
}
loadAll(response)
```
::: tip 结果
浏览器瞬间渲染出十万条数据。
:::


