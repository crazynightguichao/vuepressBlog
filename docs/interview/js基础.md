<!--
 * @Author: jiaguichao
 * @Date: 2022-03-01 10:41:56
 * @LastEditTime: 2022-03-08 19:03:48
 * @Description: Do not edit
-->
# JS基础
## 一、 类型及检测方式
#### 1. JS内置类型
JavaScript 的数据类型有下图所示
![](/images/type.png)
<img src="/images/type.png" style="width: 50%; display: block; margin: 0 auto;">
::: tip 提示
其中，前 7 种类型为基础类型，最后 1 种（Object）为引用类型，也是你需要重点关注的，因为它在日常工作中是使用得最频繁，也是需要关注最多技术细节的数据类型
:::
- JavaScript一共有8种数据类型，其中有7种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol（es6新增，表示独一无二的值）和BigInt（es10新增）；
- 1种引用数据类型——Object（Object本质上是由一组无序的名值对组成的）。里面包含 function、Array、Date等。JavaScript不支持任何创建自定义类型的机制，而所有值最终都将是上述 8 种数据类型之一。
- 引用数据类型: 对象Object（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）<br>
**原始数据类型**：基础类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量；占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。<br>
**引用数据类型**：引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念；占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
**JavaScript 中的数据是如何存储在内存中的？**
::: tip 提示
在 JavaScript 中，原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。
:::
在 JavaScript 的执行过程中， 主要有三种类型内存空间，分别是代码空间、栈空间、堆空间。其中的代码空间主要是存储可执行代码的，原始类型(Number、String、Null、Undefined、Boolean、Symbol、BigInt)的数据值都是直接保存在“栈”中的，引用类型(Object)的值是存放在“堆”中的。因此在栈空间中(执行上下文)，原始类型存储的是变量的值，而引用类型存储的是其在"堆空间"中的地址，当 JavaScript 需要访问该数据的时候，是通过栈中的引用地址来访问的，相当于多了一道转手流程。<br>
在编译过程中，如果 JavaScript 引擎判断到一个闭包，也会在堆空间创建换一个“closure(fn)”的对象（这是一个内部对象，JavaScript 是无法访问的），用来保存闭包中的变量。所以闭包中的变量是存储在“堆空间”中的。<br>
JavaScript 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率。通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。而引用类型的数据占用的空间都比较大，所以这一类数据会被存放到堆中，堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。因此需要“栈”和“堆”两种空间。<br>

#### 2. 数据类型检测
##### （1）typeof
::: tip 提示
typeof 对于原始类型来说，除了 null 都可以显示正确的类型
:::
```
console.log(typeof 2);            // number
console.log(typeof true);         // boolean
console.log(typeof 'str');        // string
console.log(typeof []);           // object []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){}); // function
console.log(typeof {});           // object
console.log(typeof undefined);    // undefined
console.log(typeof null);         // object  null 的数据类型被 typeof 解释为 object
```
::: tip 提示
typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型,所以想判断一个对象的正确类型，这时候可以考虑使用 instanceof
:::
##### （2）instanceof
::: tip 提示
instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype
:::
```
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true    
// console.log(undefined instanceof Undefined);
// console.log(null instanceof Null);
```
- instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；
- 而 typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断
```
// 我们也可以试着实现一下 instanceof
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}
```
##### （3）constructor
```
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```
::: tip 提示
这里有一个坑，如果我创建一个对象，更改它的原型，constructor就会变得不可靠了
:::
```
function Fn(){};
 
Fn.prototype=new Array();
 
var f=new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true 
```
##### （4）Object.prototype.toString.call()
::: tip 提示
toString() 是 Object 的原型方法，调用该方法，可以统一返回格式为 “[object Xxx]” 的字符串，其中 Xxx 就是对象的类型。对于 Object 对象，直接调用 toString() 就能返回 [object Object]；而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息。我们来看一下代码。
:::
```
Object.prototype.toString({})       // "[object Object]"
Object.prototype.toString.call({})  // 同上结果，加上call也ok
Object.prototype.toString.call(1)    // "[object Number]"
Object.prototype.toString.call('1')  // "[object String]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)   //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g)    //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([])       //"[object Array]"
Object.prototype.toString.call(document)  //"[object HTMLDocument]"
Object.prototype.toString.call(window)   //"[object Window]"

// 从上面这段代码可以看出，Object.prototype.toString.call() 可以很好地判断引用类型，
甚至可以把 document 和 window 都区分开来。
```
- 实现一个全局通用的数据类型判断方法，来加深你的理解，代码如下
```
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');  // 注意正则中间有个空格
}
/* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回
```
##### 小结
**typeof**
- 直接在计算机底层基于数据类型的值（二进制）进行检测
- typeof null为object 原因是对象存在在计算机中，都是以000开始的二进制存储，所以检测出来的结果是对象
- typeof 普通对象/数组对象/正则对象/日期对象 都是object
- typeof NaN === 'number'

**instanceof**
- 检测当前实例是否属于这个类的
- 底层机制：只要当前类出现在实例的原型上，结果都是true
- 不能检测基本数据类型

**constructor**
- 支持基本类型
- constructor可以随便改，也不准

**Object.prototype.toString.call([val])**
- 返回当前实例所属类信息
- 判断 Target 的类型，单单用 typeof 并无法完全满足，这其实并不是 bug，本质原因是 JS 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

* 基本类型(null): 使用 String(null)
* 基本类型(string / number / boolean / undefined) + function: - 直接使用 typeof即可
* 其余引用类型(Array / Date / RegExp Error): 调用toString后根据[object XXX]进行判断

#### 3. 数据类型转换
首先我们要知道，在 JS 中类型转换只有三种情况，分别是：
- 转换为布尔值
- 转换为数字
- 转换为字符串
![](/images/type2.png)