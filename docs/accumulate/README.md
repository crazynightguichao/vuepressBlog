<!--
 * @Author: jiaguichao
 * @Date: 2022-01-17 11:03:24
 * @LastEditTime: 2023-09-27 10:37:52
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
## 四、localStorage遇到一个小坑
::: tip 场景
设置一个Switch开关，switch 打开时存localStorage值为当前开关的value，用户重新进入页面时，获取当前localStorage值设为开关状态。
但是获取到了localStorage值而Switch却没有生效。一头雾水.....
:::
**仔细一看：**
![](/images/localTip.png)
::: warning 真相大白
打印出来竟然是字符串！！！
怪不得不生效！！！
:::

因此，把字符串转换为Boolean就可以了。
```
JSON.parse('true')   // 返回true
JSON.parse('false')  // 返回false
```
## 五、 JS中 ?? 与 || 的区别

::: tip 相同点
用法相同：
- 都是前后是值，中间用符号连接。根据前面的值来判断最终返回前面的值还是后面的值。
:::
::: warning 不同点
判断方式不同：
- 使用 ?? 时，只有当值1为null或undefined时才返回值2；
- 使用 || 时，值1会转换为布尔值判断，为true返回值1，false 返回值2
:::

```
<!-- ?? -->
undefined ?? 2	// 2
null ?? 2		// 2
0 ?? 2			// 0
"" ?? 2			// ""
true ?? 2		// true
false ?? 2		// false

<!-- || -->
undefined || 2	// 2
null || 2		// 2
0 || 2			// 2
"" || 2			// 2
true || 2		// true
false || 2		// 2
```
#### 总的来说，??更加适合在不知道变量是否有值时使用。
## 六、获取某一天的N年后的第N天

::: tip 用法
- 输入：this.$getYearDay(2022-03-03,1,1)
- 输出：2023-03-04
:::

```
Vue.prototype.$getYearDay = function(value,year,day){  // 获取N年后的第N天
      // value 代表开始日期 year代表几年 day代表几天
      let time = new Date(value);
      let y = time.getFullYear() + year;
      let m = time.getMonth() + 1
      let d = time.getDate();
      //考虑二月份场景，若N年后的二月份日期大于该年的二月份的最后一天，
	  则取该年二月份最后一天
      if(m == '02' || m == 2){
        var monthEndDate = new Date(y ,m,0).getDate();
        if(parseInt(d) > monthEndDate){//为月底时间
          //取两年后的二月份最后一天
          d = monthEndDate;
        }
      }
      let date = y + "-" + m + "-" + d
      let time2 = new Date(date)
      time2.setDate(time2.getDate() + day);//获取Day天后的日期
      var y2 = time2.getFullYear();
      var m2 = time2.getMonth() + 1;//获取当前月份的日期
      var d2 = time2.getDate();
      let date2 = y2 + "-" + m2 + "-" + d2
      return date2;
    }
```
## 七、element-ui 修改 el-tooltip 样式
**tooltip所在的div位置：**

![](/images/tooltipDiv.png)
#### 解决方案
```
<!-- 给el-tooltip标签添加popper-class属性 -->
<el-tooltip content="提示文字" popper-class="my-tooltip"></el-tooltip>
```
::: tip 注意
该代码片段，需要写在根文件的style里，如果写在当前文件里也并非不可，但是需要将scope取消掉。
:::

```
<!-- 具体样式自行更改 -->
.my-tooltip {
    padding: 2px 3px;
    border-radius: 3px;
    font-size: 10px;
    line-height: 1.6;
    .is-light{
        border: 1px solid #ebeef5;
    }
}
```
## 八、常用方法封装
#### 实现深克隆---对象/数组
```
DeepCopy(target) {
    // 判断拷贝的数据类型
    let result;
    const targetType = Object.prototype.toString.call(target).slice(8, -1);
    if (targetType === 'Object') {
      result = {};
    } else if (targetType === 'Array') {
      result = [];
    } else {
      return target;
    }
    // 遍历目标数据
    for (const i in target) {
      const value = target[i];
      // 判断目标结构里的每一值是否存在对象/数组
      if (Object.prototype.toString.call(value).slice(8, -1) === 'Object' || Object.prototype.toString.call(value).slice(8, -1) === 'Array') {
        result[i] = this.DeepCopy(value);
      } else {
        result[i] = value;
      }
    }
    return result;
  }

```
#### 格式化金额信息
#### 保留2位小数，千分位逗号
```
Number2Currency(moneyStr) {
    // eslint-disable-next-line no-unused-vars
    let data = moneyStr;
    if (typeof moneyStr !== 'string') {
      data = String(data);
    }
    if (!data) return '';
    let falg = true; // 默认都是整数
    // 判断是不是负数
    if (data.indexOf('-') === 0) {
      falg = false;
    }
    // 转化金额格式中的所有逗号，默认不管
    data = data.replace(/,/g, '');
    // 剔除数字和点之外的字符
    data = data.replace(/[^\d|.|,]/g, '');
    if (!data) {
      // 容错处理
      data = '0.00';
    }
    if (data.indexOf('.') === -1) {
      // 已经有千分位的补0
      data += '.00';
    }
    const integerNum = data.split('.')[0]; // 整数部分
    let floatNum = data.split('.')[1]; // 小数部分
    let str = integerNum.replace(/,/g, '');
    const integerNumLength = str.length;
    const commaAmount = Math.ceil(integerNumLength / 3) - 1;
    if (commaAmount > 0) {
      for (let i = commaAmount; i >= 1; i--) {
        str = str.substring(0, str.length - i * 3) + ',' + str.substring(str.length - i * 3);
      }
    }
    if (floatNum.length > 2) {
      // 长度截取 保留千分位
      floatNum = floatNum.substr(0, 2);
    } else if (floatNum.length === 0) {
      floatNum = '00';
    } else if (floatNum.length === 1) {
      floatNum = floatNum + '0';
    }
    if (str) {
      data = str + '.' + floatNum;
    } else {
      data = '0.' + floatNum;
    }

    return falg ? data : '-' + data;
  }
```
#### 保留num位小数，千分位逗号
```
NumberCurrency(value, num) {    
        if (!value) return ''
        // 将数值截取，保留2位小数
        value = parseFloat(value);
        value = value.toFixed(num);
        // 获取整数部分
        const intPart = Math.trunc(value)
        // 整数部分处理，增加,
        const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        // 预定义小数部分
        if (num === 2) {
            var floatPart = '.00' 
        }else if(num === 4){
            var floatPart = '.0000'
        }else if(num === 6){
            var floatPart = '.000000'
        }
        // 将数值截取为小数部分和整数部分
        const valueArray = value.toString().split('.')
        if (valueArray.length > 0) { // 有小数部分
          floatPart = valueArray[1].toString() // 取得小数部分
          return intPartFormat + '.' + floatPart
        }
        return intPartFormat + floatPart
    };
```
#### 金额转数字
```
Currency2Number(moneyStr) {
    if (!moneyStr) return moneyStr;
    moneyStr = moneyStr.toString();
    return moneyStr.replace(/,/g, '');
}
```
#### 银行卡格式化
```
BankCard(bankCard) {
    if (bankCard) {
      if (typeof content === Number) {
        bankCard = bankCard.toString();
      }
      const numLength = bankCard.length;
      let value = '';
      for (let i = 0; i < numLength; i++) {
        if (i % 4 === 0 && i > 0) {
          value = value + '  ' + bankCard.charAt(i);
        } else {
          value = value + bankCard.charAt(i);
        }
      }
      return value;
    } else {
      return '';
    }
  }
```
#### 数组转为树模型
```
Array2Tree(datum, defaultProp = { child: 'pid', label: 'name', parent: 'id' }) {
    const result = [];
    const map = {};
    const data = JSON.parse(JSON.stringify(datum));
    const childKey = defaultProp.child ? defaultProp.child : 'pid';
    const labelKey = defaultProp.label ? defaultProp.label : 'name';
    const parentKey = defaultProp.parent ? defaultProp.parent : 'id';
    data.forEach(item => {
      item.label = item[labelKey];
      const id = item[parentKey];
      map[id] = item;
    });
    data.forEach(item => {
      const parent = map[item[childKey]];
      if (parent && parent[childKey] !== item[parentKey]) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  }
```
#### 获取当前日期 XXXX-XX-XX 
```
getTime(val) { 
	let time = (val)? val: new Date()
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var strDate = time.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	return year + "-" + month + "-" + strDate;
}
```
#### 获取当前时间  XXXX-XX-XX hh:mm:ss
```
getTime(val) { 
	let time = (val)? val: new Date()
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var strDate = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	return year + "-" + month + "-" + strDate + ' '+ hour + ':' + minute + ':' + second;
}
```
#### 获取某个日期到今天的每一天的日期数组
```
getminTimeArr(opt) { 
		var minTime = +new Date(opt.minTime);//计算2019/5/20的时间，精确到毫秒
		var oneDay = 24 * 3600 * 1000; //计算一天的时间，精确到毫秒 86400000
		var date = [];
		var today =  +new Date(new Date().toLocaleDateString().split('/').join(','));
		var date_len = (today-minTime)/oneDay;//今天距离某一天的天数
		var now = new Date(minTime);
		for (var i = 0; i < date_len; i++) {
		now = [now.getFullYear(), now.getMonth()+1, now.getDate()].join('-');
		date.push(now);
		now = new Date(+new Date(now) + oneDay);
		}
		date.push(new Date().toLocaleDateString().split('/').join('-'));
		return date
	},
```
#### 生成长度为length的ID
```
getID(length) {  
        return  Number(Math.random().toString().substr(3,length) +  Date. now()). toString(36);
    };
```

## 九、el-dropdown遇到的一个坑
正常el-dropdown代码是这样的：
```
<el-dropdown split-button type="primary">
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
```
而我项目中为了自己的追求样式，并未使用el-dropdown-item：
```
<el-dropdown class="ts-menu" trigger="click" >
      <div class="ts-menu-center">
          <img class="ts-menu-icon" :src="getImg(menu.img,key)" />
          <div class="ts-menu-title">{{ menu.text }}</div>
      </div>
  <el-dropdown-menu :class="['ts-submenu', {'hide-submenu': status}]" >
      <div class="ts-submenu-item" v-for="submenu in menu.menu" :key="submenu.id">
      ......
      </div>
  </el-dropdown-menu>
</el-dropdown>
```
可是，发现有一个bug：
点击菜单栏选中一个路由菜单之后，el-dropdown-menu不会消失，然后就想办法操作dom隐藏起来：
```
 const menuId = document.getElementsByClassName('el-dropdown-menu')
  menuId.forEach(ele => {
    ele.style.display="none";
  });
```
这样虽然问题解决了，但会出现一个bug，我点击第一个菜单路由跳转新页面没问题，在点击菜单栏，
el-dropdown并没有下拉下来，再次点击，才正常。然后根据visible-change方法，找到原因：手动操作dom
虽然把下拉菜单隐藏，但是el-dropdown组件并没有监听到，所以，需要再次点击页面任意位置，el-dropdown才会真正收起来。
::: tip 解决方案
最后找到解决办法：用ref属性，控制el-dropdown 的显示和隐藏。
:::
```
<el-dropdown trigger="click" ref="messageDrop"></el-dropdown>
 
this.$refs.messageDrop.hide();
this.$refs.messageDrop.show();

```

## 十、静态网页部署--surge
#### 作为开发人员，在不涉及商业机密或者个人隐私的情况下，有没有想把自己做得项目或者demo部署到网络服务器的冲动？

如果有，你行动了吗？用得是什么方式/平台？过程顺利否？花了多少时间？最终结果又如何？是否方便大家看看效果？

在此，我希望这一切都是一个丝滑的过程，这样既有成就感，又没花太多时间，若是愿意，还可以跟别人分享下成果。但是在实际操作过程中，我们可能会面临下面几个问题：

- 1、没有自己的服务器
- 2、如果不买/不借，不知道哪些平台提供这方面的服务
- 3、有自己的服务器，但不知道怎么操作或者操作过程中卡住了
- 4、知道一些提供该服务的平台，但是无人指点的情况下，部署存在困难

下面，我想简单介绍下surge部署：
surge是面向前端开发人员的静态资源部署平台，它是简单的，单命令的web发布，无需离开命令行即可免费发布html，css，javascript。

最简单的时候，你只要进入项目静态资源目录下，执行下方命令，然后刚开始需要输入下邮箱和密码，之后按回车即可部署完成，随后得到最终部署好后的站点链接，最后访问该链接（红框部分）即可，相关截图如下：

```
npm install --global surge
surge
```
![](/images/surge_run.gif)

成功后就会获得你的网站域名了，直接访问即可！

## 十一、如何判断一个对象是不是空对象？
#### 方法1
```
Object.keys(obj).length === 0
```
#### 方法2
```
JSON.stringify(obj) === '{}'
```
## 十二、for循环调用接口并将数据分组休眠后再继续执行
#### 需求
::: tip 背景
前端批量调用接口，由于数据量过大，数据库承受不住，所以准备将全部数据分组，每组1000条，并休眠2秒，之后再继续进行接口调用。
:::
#### 方案
```
// 循环接口
reqmethos(i){
    this.taskArr = [];
    const data = { businessKey:i.busId,
            taskExpandData:{processTitle:i.name,isBack:'否'}
            }
    this.$request({
        url: this.$api.getStart,
        data: data,
    }).then((response) => {
        if (response && response.status === 200) {
          this.taskArr.push(response.data)
        }
    })
},
// 截取数组
_chunk(arr, length){
var _arr = [];
while(arr.length){
    _arr.push(arr.splice(0, length))
}
return _arr
},
// 休眠函数
sleep(millisecond) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, millisecond)
    })
},
// 批量调用方法
async batchStarts(array) {
let arrs = this._chunk(array, 1000)  // 1000个一组截取数组
    for (let i = 0; i < arrs.length; i++) {
        for (let j = 0; j < arrs[i].length; j++) {
          this.reqmethos(arrs[i][j]) // 循环调用的接口
        }
        await this.sleep(2000);  // 休眠2秒再执行
    }
},
```
::: tip 结果
这样就完美解决了问题！
:::

## 十三、d3的svg导出图片踩坑
![](/images/exportSVG.png)
#### 啥也不说了，直接上代码
```
<template>
    <div class="penetrate-chart">
      <div class="bt-group">
        <el-button  @click="saveImg">导出</el-button>
      </div>
      <div id="apps"></div>
    </div>
</template>
<script>
  import * as d3 from 'd3'
  export default {
    props: {},
    components: {},
    data () {
      return {
        data: {
            el: "#apps",
            type: 'fold',
            originTreeData: {
                id: "abc1005",
                // 根节点名称
                name: "山东吠舍科技有限责任公司",
                // 子节点列表
                children: [
                    {
                    id:"abc1006",
                    name: "山东第一首陀罗科技服务有限公司",
                    percent: '100%',
                    },
                    {
                    id:"abc1007",
                    name: "山东第二首陀罗程技术有限公司",
                    percent: '100%',
                    },
                    {
                    id:"abc1008",
                    name: "山东第三首陀罗光伏材料有限公司",
                    percent: '100%',
                    },
                    {
                    id:"abc1009",
                    name: "山东第四首陀罗科技发展有限公司",
                    percent: '100%',
                    children: [
                        {
                        id:"abc1010",
                        name: "山东第一达利特瑞利分析仪器有限公司",
                        percent: '100%',
                        children:[
                            {
                            id:"abc1011",
                            name: "山东瑞利的子公司一",
                            percent: '80%',
                            },
                            {
                            id:"abc1012",
                            name: "山东瑞利的子公司二",
                            percent: '90%',
                            },
                            {
                            id:"abc1013",
                            name: "山东瑞利的子公司三",
                            percent: '100%',
                            },
                        ]
                        }
                    ]
                    },
                    {
                    id:"abc1014",
                    name: "山东第五首陀罗电工科技有限公司",
                    percent: '100%',
                    children: [
                        {
                        id:"abc1015",
                        name: "山东第二达利特低自动化设备有限公司",
                        percent: '100%',
                        children:[
                            {
                            id:"abc1016",
                            name: "山东敬业的子公司一",
                            percent: '100%',
                            },
                            {
                            id:"abc1017",
                            name: "山东敬业的子公司二",
                            percent: '90%',
                            }
                        ]
                        }
                    ]
                    },
                    {
                    id: "abc1020",
                    name: "山东第六首陀罗分析仪器(集团)有限责任公司",
                    percent: '100%',
                    children: [
                        {
                        id:"abc1021",
                        name: "山东第三达利特分气体工业有限公司",
                        }
                    ]
                    },
                ],
                // 父节点列表
                parents: [
                    {
                    id: "abc2001",
                    name: "山东刹帝利集团有限责任公司",
                    percent: '60%',
                    parents: [
                        {
                        id: "abc2000",
                        name: "山东婆罗门集团有限公司",
                        percent: '100%',
                        },
                    ]
                    },
                    {
                    id: "abc2002",
                    name: "吴小远",
                    percent: '40%',
                    }
                ],
            },                                         
        },
        svg : null,
        gAll : null,
        gLinks : null,
        gNodes : null,
        tree : null,
        rootOfDown : null,
        rootOfUp : null,
        // 配置项
        config : {
            // 节点的横向距离
            dx: 200,
            // 节点的纵向距离
            dy: 170,
            // svg的viewBox的宽度
            width: 0,
            // svg的viewBox的高度
            height: 0,
            // 节点的矩形框宽度
            rectWidth: 170,
            // 节点的矩形框高度
            rectHeight: 70,
        }
      }
    },
    mounted () {
      this.constructor();
    },
    methods: {
      saveImg () {
        let rootNode = document.getElementById(`svgColumn`);
        var serializer = new XMLSerializer();
        var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(rootNode);
        var image = new Image();
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        image.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = this.config.width*1.5;
            canvas.height = this.config.height*1.5;
            var context = canvas.getContext("2d");
            context.fillStyle = "#fff"; //设置背景
            context.fillRect(0, 0, this.config.width*1.5, this.config.height*1.5);
            context.drawImage(image, 0, 0, this.config.width*1.5, this.config.height*1.5, 0, 0, this.config.width*1.5, this.config.height*1.5);   //进行绘制图片
            var url = canvas.toDataURL("image/jpeg"); // 这就是得到的base64编码
            var a = document.createElement("a");
            a.download = '图谱' + ".jpeg";
            a.href = url;
            a.click();
        };
      },
      // 股权树
        constructor(options) {
            // 树的源数据
            // 宿主元素选择器
            // this.nodeClickEvent = options.nodeClickEvent || function (e,d){
            // alert(d.name)
            // }
            this.drawChart();
        },
        // 初始化树结构数据
        drawChart() {
            // 宿主元素的d3选择器对象
            let host = d3.select(this.data.el);
            // 宿主元素的DOM，通过node()获取到其DOM元素对象
            let dom = host.node();
            // 宿主元素的DOMRect
            let domRect = dom.getBoundingClientRect();
            // svg的宽度和高度
            this.config.width = domRect.width;
            this.config.height = domRect.height;

            let oldSvg = d3.select('svg')
            // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
            if(!oldSvg.empty()){
            oldSvg.remove();
            }
            const svg = d3
            .create("svg")
            .attr("viewBox", () => {
                let parentsLength = this.data.originTreeData.parents ? this.data.originTreeData.parents.length : 0;
                return [
                -this.config.width / 2,
                    // 如果有父节点，则根节点居中，否则根节点上浮一段距离
                parentsLength > 0 ? -this.config.height / 2 : -this.config.height / 3,
                this.config.width,
                this.config.height,
                ]
            })
            .attr("id", "svgColumn")
            .style("user-select", "none")
            .style("cursor","move");

            // 包括连接线和节点的总集合
            const gAll = svg.append("g").attr("id", "all");
            svg.call(
            d3
                .zoom()
                .scaleExtent([0.2, 5])
                .on("zoom", (e) => {
                gAll.attr("transform", () => {
                    return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`;
                });
                })
            ).on("dblclick.zoom", null);// 取消默认的双击放大事件

            this.gAll = gAll;
            // console.log(this.gAll,'this.gAll');
            // 连接线集合
            this.gLinks = gAll.append("g").attr("id", "linkGroup");
            // 节点集合
            this.gNodes = gAll.append("g").attr("id", "nodeGroup");
            // 设置好节点之间距离的tree方法
            this.tree = d3.tree().nodeSize([this.config.dx, this.config.dy]);
            // console.log(this.tree,'this.tree');

            this.rootOfDown = d3.hierarchy(this.data.originTreeData,(d) => d.children);
            this.rootOfUp = d3.hierarchy(this.data.originTreeData,(d) => d.parents);
            this.tree(this.rootOfDown);
            // console.log(this.rootOfDown,'this.rootOfDown');
            [this.rootOfDown.descendants(), this.rootOfUp.descendants()].forEach((nodes) => {
            nodes.forEach((node) => {
                node._children = node.children || null;
                if(this.data.type === 'all'){
                    //如果是all的话，则表示全部都展开
                    node.children = node._children;
                } else if(this.data.type === 'fold'){ //如果是fold则表示除了父节点全都折叠
                    // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
                    if (node.depth) {
                        node.children = null;
                    }
                }
            });
            });

            //箭头(下半部分)
            svg
            .append("marker")
            .attr("id", "markerOfDown")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", 55) //箭头坐标
            .attr("refY", 0)
            .attr("markerWidth", 10) //标识的大小
            .attr("markerHeight", 10)
            .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr("fill", "#215af3"); //箭头颜色

            //箭头(上半部分)
            svg
            .append("marker")
            .attr("id", "markerOfUp")
            .attr("markerUnits", "userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10") //坐标系的区域
            .attr("refX", -50) //箭头坐标
            .attr("refY", 0)
            .attr("markerWidth", 10) //标识的大小
            .attr("markerHeight", 10)
            .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width", 2) //箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5") //箭头的路径
            .attr("fill", "#215af3"); //箭头颜色

            this.svg = svg;
            this.update();
            // 将svg置入宿主元素中
            host.append(function () {
            return svg.node();
            });
        },
        // 更新数据
        update(source) {
            if (!source) {
            source = {
                x0: 0,
                y0: 0,
            };
            // 设置根节点所在的位置（原点）
            this.rootOfDown.x0 = 0;
            this.rootOfDown.y0 = 0;
            this.rootOfUp.x0 = 0;
            this.rootOfUp.y0 = 0;
            }
            let nodesOfDown = this.rootOfDown.descendants().reverse();
            let linksOfDown = this.rootOfDown.links();
            let nodesOfUp = this.rootOfUp.descendants().reverse();
            let linksOfUp = this.rootOfUp.links();
            this.tree(this.rootOfDown);
            this.tree(this.rootOfUp);
            const myTransition = this.svg.transition().duration(500);
            /***  绘制子公司树  ***/
            const node1 = this.gNodes
            .selectAll("g.nodeOfDownItemGroup")
            .data(nodesOfDown, (d) => {
                return d.data.id;
            });
            const node1Enter = node1
            .enter()
            .append("g")
            .attr("class", "nodeOfDownItemGroup")
            .attr("transform", (d) => {
                return `translate(${source.x0},${source.y0})`;
            })
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .style("cursor", "pointer");
            // 外层的矩形框
            node1Enter
            .append("rect")
            .attr("width", (d) => {
                if (d.depth === 0) {
                return (d.data.name.length + 2) * 16;
                }
                return this.config.rectWidth;
            })
            .attr("height", (d) => {
                if (d.depth === 0) {
                return 30;
                }
                return this.config.rectHeight;
            })
            .attr("x", (d) => {
                if (d.depth === 0) {
                return (-(d.data.name.length + 2) * 16) / 2;
                }
                return -this.config.rectWidth / 2;
            })
            .attr("y", (d) => {
                if (d.depth === 0) {
                return -15;
                }
                return -this.config.rectHeight / 2;
            })
            .attr("rx", 5)
            .attr("stroke-width", 1)
            .attr("stroke", (d) => {
                if (d.depth === 0) {
                return "#5682ec";
                }
                return "#7A9EFF";
            })
            .attr("fill", (d) => {
                if (d.depth === 0) {
                return "#7A9EFF";
                }
                return "#FFFFFF";
            })
            // .on("click", (e, d) => {
            //     this.nodeClickEvent(e,d)
            // });
            // 文本主标题
            node1Enter
            .append("text")
            .attr("class", "main-title")
            .attr("x", (d) => {
                return 0;
            })
            .attr("y", (d) => {
                if (d.depth === 0) {
                return 5;
                }
                return -14;
            })
            .attr("text-anchor", (d) => {
                return "middle";
            })
            .text((d) => {
                if (d.depth === 0) {
                return d.data.name;
                } else {
                return d.data.name.length > 11
                    ? d.data.name.substring(0, 11)
                    : d.data.name;
                }
            })
            .attr("fill", (d) => {
                if (d.depth === 0) {
                return "#FFFFFF";
                }
                return "#000000";
            })
            .style("font-size", (d) => (d.depth === 0 ? 16 : 14))
            .style('font-family','黑体')
            .style("font-weight", "bold");
            // 副标题
            node1Enter
            .append("text")
            .attr("class", "sub-title")
            .attr("x", (d) => {
                return 0;
            })
            .attr("y", (d) => {
                return 5;
            })
            .attr("text-anchor", (d) => {
                return "middle";
            })
            .text((d) => {
                if (d.depth !== 0) {
                let subTitle = d.data.name.substring(11);
                if (subTitle.length > 10) {
                    return subTitle.substring(0, 10) + "...";
                }
                return subTitle;
                }
            })
            .style("font-size", (d) => 14)
            .style('font-family','黑体')
            .style("font-weight", "bold");

            // 控股比例
            node1Enter
            .append("text")
            .attr("class", "percent")
            .attr("x", (d) => {
                return 12;
            })
            .attr("y", (d) => {
                return -45;
            })
            .text((d) => {
                if (d.depth !== 0) {
                return d.data.percent;
                }
            })
            .attr("fill", "#000000")
            .style('font-family','黑体')
            .style("font-size", (d) => 14);

            // 增加展开按钮
            const expandBtnG = node1Enter
            .append("g")
            .attr("class", "expandBtn")
            .attr("transform", (d) => {
                return `translate(${0},${this.config.rectHeight / 2})`;
            })
            .style("display", (d) => {
                // 如果是根节点，不显示
                if (d.depth === 0) {
                return "none";
                }
                // 如果没有子节点，则不显示
                if (!d._children) {
                return "none";
                }
            })
            .on("click", (e, d) => {
                if (d.children) {
                d._children = d.children;
                d.children = null;
                } else {
                d.children = d._children;
                }
                this.update(d);
            });
            expandBtnG
            .append("circle")
            .attr("r", 8)
            .attr("fill", "#7A9EFF")
            .attr("cy", 8);
            expandBtnG
            .append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")
            .attr("y", 13)
            .style('font-size', 16)
            .style('font-family','微软雅黑')
            .text((d)=>{
                return d.children ? "-" : "+"
            });
            const link1 = this.gLinks
            .selectAll("path.linkOfDownItem")
            .data(linksOfDown, (d) => d.target.data.id);
            const link1Enter = link1
            .enter()
            .append("path")
            .attr("class", "linkOfDownItem")
            .attr("d", (d) => {
                let o = {
                source: {
                    x: source.x0,
                    y: source.y0,
                },
                target: {
                    x: source.x0,
                    y: source.y0,
                },
                };
                return this.drawLink(o);
            })
            .attr("fill", "none")
            .attr("stroke", "#7A9EFF")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#markerOfDown)");
            // 有元素update更新和元素新增enter的时候
            node1
            .merge(node1Enter)
            .transition(myTransition)
            .attr("transform", (d) => {
                return `translate(${d.x},${d.y})`;
            })
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);
            // 有元素消失时
            node1
            .exit()
            .transition(myTransition)
            .remove()
            .attr("transform", (d) => {
                return `translate(${source.x0},${source.y0})`;
            })
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);
            link1.merge(link1Enter).transition(myTransition).attr("d", this.drawLink);
            link1
            .exit()
            .transition(myTransition)
            .remove()
            .attr("d", (d) => {
                let o = {
                source: {
                    x: source.x,
                    y: source.y,
                },
                target: {
                    x: source.x,
                    y: source.y,
                },
                };
                return this.drawLink(o);
            });
            /***  绘制股东树  ***/
            nodesOfUp.forEach(node => {
            node.y = -node.y
            })
            const node2 = this.gNodes
                .selectAll("g.nodeOfUpItemGroup")
                .data(nodesOfUp, (d) => {
                return d.data.id;
                });
            const node2Enter = node2
                .enter()
                .append("g")
                .attr("class", "nodeOfUpItemGroup")
                .attr("transform", (d) => {
                return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .style("cursor", "pointer");
            // 外层的矩形框
            node2Enter
                .append("rect")
                .attr("width", (d) => {
                if (d.depth === 0) {
                    return (d.data.name.length + 2) * 16;
                }
                return this.config.rectWidth;
                })
                .attr("height", (d) => {
                if (d.depth === 0) {
                    return 30;
                }
                return this.config.rectHeight;
                })
                .attr("x", (d) => {
                if (d.depth === 0) {
                    return (-(d.data.name.length + 2) * 16) / 2;
                }
                return -this.config.rectWidth / 2;
                })
                .attr("y", (d) => {
                if (d.depth === 0) {
                    return -15;
                }
                return -this.config.rectHeight / 2;
                })
                .attr("rx", 5)
                .attr("stroke-width", 1)
                .attr("stroke", (d) => {
                if (d.depth === 0) {
                    return "#5682ec";
                }
                return "#7A9EFF";
                })
                .attr("fill", (d) => {
                if (d.depth === 0) {
                    return "#7A9EFF";
                }
                return "#FFFFFF";
                })
                // .on("click", (e, d) => {
                // this.nodeClickEvent(e,d)
                // });
            // 文本主标题
            node2Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", (d) => {
                return 0;
                })
                .attr("y", (d) => {
                if (d.depth === 0) {
                    return 5;
                }
                return -14;
                })
                .attr("text-anchor", (d) => {
                return "middle";
                })
                .text((d) => {
                if (d.depth === 0) {
                    return d.data.name;
                } else {
                    return d.data.name.length > 11
                        ? d.data.name.substring(0, 11)
                        : d.data.name;
                }
                })
                .attr("fill", (d) => {
                if (d.depth === 0) {
                    return "#FFFFFF";
                }
                return "#000000";
                })
                .style("font-size", (d) => (d.depth === 0 ? 16 : 14))
                .style('font-family','黑体')
                .style("font-weight", "bold");
            // 副标题
            node2Enter
                .append("text")
                .attr("class", "sub-title")
                .attr("x", (d) => {
                return 0;
                })
                .attr("y", (d) => {
                return 5;
                })
                .attr("text-anchor", (d) => {
                return "middle";
                })
                .text((d) => {
                if (d.depth !== 0) {
                    let subTitle = d.data.name.substring(11);
                    if (subTitle.length > 10) {
                    return subTitle.substring(0, 10) + "...";
                    }
                    return subTitle;
                }
                })
                .style("font-size", (d) => 14)
                .style('font-family','黑体')
                .style("font-weight", "bold");

            // 控股比例
            node2Enter
                .append("text")
                .attr("class", "percent")
                .attr("x", (d) => {
                return 12;
                })
                .attr("y", (d) => {
                return 55;
                })
                .text((d) => {
                if (d.depth !== 0) {
                    return d.data.percent;
                }
                })
                .attr("fill", "#000000")
                .style('font-family','黑体')
                .style("font-size", (d) => 14);

            // 增加展开按钮
            const expandBtnG2 = node2Enter
                .append("g")
                .attr("class", "expandBtn")
                .attr("transform", (d) => {
                return `translate(${0},${-this.config.rectHeight / 2})`;
                })
                .style("display", (d) => {
                // 如果是根节点，不显示
                if (d.depth === 0) {
                    return "none";
                }
                // 如果没有子节点，则不显示
                if (!d._children) {
                    return "none";
                }
                })
                .on("click", (e, d) => {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                }
                this.update(d);
                });

            expandBtnG2
                .append("circle")
                .attr("r", 8)
                .attr("fill", "#7A9EFF")
                .attr("cy", -8);

            expandBtnG2
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "#ffffff")
                .attr("y", -3)
                .style('font-size', 16)
                .style('font-family','微软雅黑')
                .text((d)=>{
                return d.children ? "-" : "+"
                });

            const link2 = this.gLinks
                .selectAll("path.linkOfUpItem")
                .data(linksOfUp, (d) => d.target.data.id);

            const link2Enter = link2
                .enter()
                .append("path")
                .attr("class", "linkOfUpItem")
                .attr("d", (d) => {
                let o = {
                    source: {
                    x: source.x0,
                    y: source.y0,
                    },
                    target: {
                    x: source.x0,
                    y: source.y0,
                    },
                };
                return this.drawLink(o);
                })
                .attr("fill", "none")
                .attr("stroke", "#7A9EFF")
                .attr("stroke-width", 1)
                .attr("marker-end", "url(#markerOfUp)");

            // 有元素update更新和元素新增enter的时候
            node2
                .merge(node2Enter)
                .transition(myTransition)
                .attr("transform", (d) => {
                return `translate(${d.x},${d.y})`;
                })
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // 有元素消失时
            node2
                .exit()
                .transition(myTransition)
                .remove()
                .attr("transform", (d) => {
                return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            link2.merge(link2Enter).transition(myTransition).attr("d", this.drawLink);

            link2
                .exit()
                .transition(myTransition)
                .remove()
                .attr("d", (d) => {
                let o = {
                    source: {
                    x: source.x,
                    y: source.y,
                    },
                    target: {
                    x: source.x,
                    y: source.y,
                    },
                };
                return this.drawLink(o);
                });
            // node数据改变的时候更改一下加减号
            const expandButtonsSelection = d3.selectAll('g.expandBtn')
            expandButtonsSelection.select('text').transition().text((d) =>{
            return d.children ? "-" : "+";
            })
            this.rootOfDown.eachBefore((d) => {
            d.x0 = d.x;
            d.y0 = d.y;
            });
            this.rootOfUp.eachBefore((d) => {
            d.x0 = d.x;
            d.y0 = d.y;
            });
        },
        // 直角连接线 by wushengyuan
        drawLink({ source, target }) {
            const halfDistance = (target.y - source.y) / 2;
            const halfY = source.y + halfDistance;
            return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`;
        },
        // 展开所有的节点
        expandAllNodes(){
            this.drawChart({
            type: 'all',
            })
        },
        // 将所有节点都折叠
        foldAllNodes(){
            this.drawChart({
            type: 'fold',
            })
        },
    }
  }
</script>
<style lang="scss" scoped>
    #apps {
      width: 1200px;
      height: 500px;
      box-sizing: border-box;
      margin: 0 auto;
    }
</style>
```

::: tip 踩坑的地方
svg标签要加id，我一开始是获取div的apps的dom，let rootNode = document.getElementById(`apps`),但是点击下载一直没反应，最后排查了好久才发现原来是这个问题。初始化的时候给svg手动创建一个id：.attr("id", "svgColumn")，获取该dom：document.getElementById(`svgColumn`)，就没问题了。
:::

## 十四、 统计一个文件夹里面各个后缀名的代码行数
```
find . "(" -name "*.vue" -or -name "*.css" -or -name "*.js" -or -name "*.scss" ")" -print | xargs cat | wc -l
```
![](/images/rowsNumber.png)

## 十五、 window.open打开页面报错CSRF ERROR
在项目开发中遇到这样一个问题，项目里用window.open打开了一个外链，但是外链界面无法显示，页面有一个报错CSRF ERROR。奇怪的是复制这个链接，直接在浏览器地址栏粘贴，然后回车就可以正常打开。。。
#### 问题原因：
当点击访问页面中外链地址时，会产生一个http请求（用于获取外链地址内容），此时出于安全策略（一些用户信息或登录信息会通过url传递），浏览器会在请求头中添加一个referrer，用来表示当前请求是从哪个页面跳转来的，也就是访问来源。当外链网站对访问做判断时，于是会出现诸如403 Forbidden、The HTTP request is not acceptable for the requested resource.问题。

#### 解决方法：
```
在项目的的<head>中加入如下<meta>代码：
    <meta name="referrer" content="no-referrer" />
```