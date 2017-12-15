# 介绍

> `Elf.js`是一个简洁的高效的`JavaScript`框架。它不仅高度重视用户的体验，也高度重视开发者的体验。在实现当今主流技术的同时，以尽可能原生态的形式展现出来。在如今花样繁多的框架中，你是否感觉各种思想、语法、工具大大增加了你的学习时间，那么`Elf.js`是一个不错的开始。她将最初的 Web 设计理念与现代技术完美结合，她追求的是简单、明朗、返璞归真。

## 安装

***

* __NPM__
```html
    npm install elfjs --save
```
* __文件__
    * 在`NPM`包的目录你将找到`.js(完整版)`、`.min.js(迷你版)`以及`.d.ts(类型声明)`文件。
    * `elf-loader.js`提供简单的`AMD/CommonJS`规范的加载器，她可以让你在开发中免去编译的等待。
    * `shims`目录下的提供在`IE9`上运行的补丁与集成第三方库的补丁。她们并不是时常用到。
    * 使用支持 [DefinitelyTyped](http://definitelytyped.org/) 的 [IDE](https://code.visualstudio.com/) 可以有效的进行代码提示与类型检查。

# 开始

> `Elf.js`并未创建过多的私有思想和语法。若你已经具有 Web 中级知识，那么一切将非常得心应手。

## 第一个组件

***

* `Elf.js`采用简洁的模板语法来声明 DOM 与数据。
```html
    <!-- viewComponent.html -->
    <div>
        {{ message }}
    </div>
```
```js
    // viewComponent.js
    var temp = require("viewComponent.html");
    module.exports = Elf.Component("view", {
        constructor : function () {
            this.message = "Hello Word!";
        },
        render : Elf.redactElement(temp)
    });
```
```js
    // bootstrap.js
    var View = require("viewComponent");
    Elf.render(Elf.createElement(View), document.body, true);
```
* 上面的代码展示了如何从模板中创建组件和如何将组件渲染到指定节点。
* 更多模板语法参见 [模板语法](/docs.html)

## 使用指令

***

* `Elf.js`提供可增强`HTML`特性的功能。下面将展示一个简单的拖动功能。
```js
    // dragDirective.js
    module.exports = Elf.Directive("drag", {
        onInitial : function (element, props) {
            Elf.attachEvent(element, "mousedown", this);
            Elf.attachEvent(element, "mousemove", this);
            Elf.attachEvent(element, "mouseup", this);
        },
        onDispose : function (element, props) {
            Elf.detachEvent(element, "mousedown", this);
            Elf.detachEvent(element, "mousemove", this);
            Elf.detachEvent(element, "mouseup", this);
        },
        handleEvent : function (event) {
            // coding drag
        }
    });
```
```html
    <!-- viewComponent.html -->
    <div cmd="drag">
        {{ message }}
    </div>
```
```js
    // viewComponent.js
    var temp = require("viewComponent.html");
    var dragDirective = require("dragDirective");
    module.exports = Elf.Component("view", {
        constructor : function () {
            this.message = "Hello Word!";
        },
        render : Elf.redactElement(temp, dragDirective)
    });
```
* 通过`Elf.Directive`方法，我们定义并实现了一个拖动指令。通过`Elf.redactElement`函数注入依赖的指令（已经通过`Elf.depend`方法注册为全局依赖则不必在这里注入了），就可以在模板中通过指令别名使用了。此时的`div`已经具备拖动能力。
* 指令能有效的将功能操作与业务逻辑分离，并高度重用代码。

## 使用管道

***

* 在渲染过程中，往往数据需要转换成某种特定格式，我们可以通过`Transform`来实现。例如下面代码将日期格式化输出。
```js
    // dateTransform.js
    module.exports = Elf.Transform("date", {
        transform : function (value, formatExpr) {
            return moment(value).format(formatExpr);
        }
    });
```
```html
    <!-- viewComponent.html -->
    <div cmd="drag">
        {{ now | date "YYYY-MM-DD" }}
    </div>
```
```js
    // viewComponent.js
    var temp = require("viewComponent.html");
    var dateTransform = require("dateTransform");
    module.exports = Elf.Component("view", {
        constructor : function () {
            this.now = new Date();
        },
        render : Elf.redactElement(temp, dateTransform)
    });
```
* 上面的代码最终将日期输出为`xxxx-xx-xx`格式。
* 管道与指令一样，都是为了将功能操作与业务逻辑分离，使得相同的功能能得以重用。

## 事件处理

***

* `Elf.js`的事件绑定与原生`HTML`一样。
```html
    <!-- viewComponent.html -->
    <button onclick="onClick($event);">
        点击试试
    </button>
```
```js
    // viewComponent.js
    var temp = require("viewComponent.html");
    module.exports = Elf.Component("view", {
        render : Elf.redactElement(temp),
        onClick : function (event) {
            alert("点击被触发了!");
        }
    });
```
* `Elf.js`将会自动管理事件的绑定与移除，即使在循环中也不必担心作用域的问题。也不必担心性能问题。
* `Elf.js`提供了一套与原生一样的冒泡机制，`Component`亦可作为触发事件的对象。

## 组件通讯

***

* 因为`Elf.js`实现的事件机制与原生相同，并且可作用与`Component`，所以`Elf.js`不需要额外的状态管理手段。子组件的事件通过这种机制会冒泡到`Individual`，你只需在`Individual`处处理业务逻辑即可。又因为`Elf.js`是自动响应的，你也不需要关心数据变化后的呈现。她会自动分析新的数据与之前的数据，将更新呈现在页面上。
* `Elf.js`并不提供`双向绑定`，亦不推崇`单向数据流`。原始的事件机制就是最好的手段，她早已深入每一个前端程序员心中。
* 这里我们使用一个完整的示例 [elfjs-calendar](https://github.com/kind-n/elfjs-calendar) 。
* 在`sldier.js`与`calendar.js`里分别抛出了日历操作事件，在`main.js`业务逻辑。

# 进阶

> 正如上面的教程，`Elf.js`核心只提供了`Component`、`Directive`和`Transform`三个对象。模板中只提供了两个控制流程的属性（`e-for`和`e-if`）和一个文本输出`{{ }}`。但`Elf.js`在背后所做的远远不止于此。她有着高效的`虚拟DOM`和原生一样的`事件机制`，还能自动响应数据变化。如果你想深入了解其原理（其实现在主流框架的原理都是相近的）。`Elf.js`为一个极简的框架，将会是一个最好最优的选择。

## 深入响应式原理

***

受 [zone.js](https://github.com/angular/zone.js) 启发。数据的改变的时机无外乎用户操作（触发事件）和异步函数（`Ajax`和`setTimeout`等）。`Elf.js`封装了事件监听和常用的异步操作。使之能够得到监控，在这些异步操作结束后，`Elf.js`将会去计算数据变化，然后以最优的方式更新`DOM`。

## 集成第三方类库

***

由于`Elf.js`封装了原生的事件，但并没有像 [zone.js](https://github.com/angular/zone.js) 一样侵入。所以通过`Elf.js`创建的`DOM`不再触发用原生方法绑定的事件。因此第三方类库的监听可能无法触发其绑定的事件。通过引入`shims_for_Lib.js`可以让`Elf.js`接管`Window`和`Node`的事件监听。从而让第三方类库完美运行，亦可自动响应数据变化。

## 使用扩展语言

***

`Elf.js`无缝支持`JSX`（`elf.d.ts`中可以找到`JSX`定义）。但`Elf.js`更推荐使用模板。相较于`JSX`，模板有着良好的结构，视图与逻辑分离，更好的与UI合作。同时，使用`elf-loader.js`加载模板，会有`source map`，弥补了模板调试难的短板。

## 生产环境部署

***

如同之前的开发一样，我们使用`node`开发，`AMD`和`CommonJS`的风格都能支持，在开发阶段无需编译、打包，并有`source map`输出，拥有非常好的开发体验。在使用打包工具（如：[webpack](http://webpack.github.io/)）打包后不再输出`source map`，在没有察觉的情况下就已经提升了性能。打包过程中亦无需其它`loader`。当然，若想追求极致性能可以使用`loader`将模板预编译为 JavaScript 。