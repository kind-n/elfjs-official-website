# 介绍

> `Elf.js`是一个简洁的高效的`JavaScript`框架。它不仅高度重视用户的体验，也高度重视开发者的体验。在实现当今主流技术的同时，以贴近原生的形式展现出来。它将最初的 [Web](https://developer.mozilla.org/zh-CN/docs/Web) 设计理念与现代技术完美地结合起来。简单、明朗的风格能够极大的减少学习时间和提高开发效率。

## 安装

* __NPM__

```html
npm install elfjs -g
```

* __文件__

    * `shims_for_IE9.js`提供在`IE9`上运行的补丁。
    * `shims_for_Lib.js`提供了集成第三方库的补丁。
    * 使用支持 [DefinitelyTyped](http://definitelytyped.org/) 的 [IDE](https://code.visualstudio.com/) 可以有效的进行代码提示与类型检查。

# 开始

> `Elf.js`与其它大型框架不同的是，`Elf.js`没有繁琐的语法和大量的自定义属性。若你已经具备 [Web](https://developer.mozilla.org/zh-CN/docs/Web) 中级知识，那么一切将非常容易。

## 创建工程

```html
mkdir MyElfjsProject
elfjs init
npm install
npm run start
```

* 运行上面的命令即可创建一个示例工程。
* 运行成功后即可在浏览器中预览。[http://localhost:8080/](http://localhost:8080/)

## 使用组件

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

* `Elf.js`采用简洁的模板语法来声明 DOM 与数据。
* 上面的代码展示了如何从模板中创建组件和如何将组件渲染到指定节点。
* 更多模板语法参见[模板语法](/docs.html)。

## 使用指令

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

* `Elf.js`提供可增强`HTML`特性的功能。上面的代码展示一个简单的拖动功能。
* 通过`Elf.Directive`方法，我们定义并实现了一个拖动指令。通过`Elf.redactElement`函数注入依赖的指令（已经通过`Elf.depend`方法注册为全局依赖则不必在这里注入了），就可以在模板中通过指令别名使用了。此时的`div`已经具备拖动能力。
* 指令能有效的将功能操作与业务逻辑分离，并高度重用代码。

## 使用管道

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

* 在渲染过程中，往往数据需要转换成某种特定格式，我们可以通过`Transform`来实现。例如下面代码将日期格式化输出。
* 上面的代码最终将日期输出为`xxxx-xx-xx`格式。
* 管道与指令一样，都是为了将功能操作与业务逻辑分离，使得相同的功能能得以重用。

## 事件处理

```html
<!-- viewComponent.html -->
<button onclick="onClick(event);">
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

* `Elf.js`的事件绑定与原生`HTML`一样。
* `Elf.js`将会自动管理事件的绑定与移除，即使在循环中也不必担心作用域的问题。也不必担心性能问题。
* `Elf.js`提供了一套与原生一样的冒泡机制，`Component`亦可作为触发事件的对象。

## 组件通讯

* `Elf.js`并没有`双向绑定`、`单向数据流`的概念。其与原生相同的事件传递机制，即可逐层处理用户操作，或者汇集到顶层集中处理。
* `Elf.js`是自动响应的，开发者不必关心数据变化后的呈现。它会自动对比新旧数据变化，并以最小的代价更新 DOM 。
* 因为这些特性，组件通讯变得非常容易，不需要额外的状态管理手段。

# 进阶

> 正如上面的教程，`Elf.js`核心只提供了`Component`、`Directive`和`Transform`三个对象。模板中只提供了两个控制流程的属性（`e-for`和`e-if`）和一个文本输出（`{{ }}`）。但`Elf.js`在背后所做的远远不止于此。它有着高效的`虚拟DOM`和原生一样的`事件机制`，能够自动响应数据变化。这些功能的原理与目前流行的框架是相近的，如果你想深入了解其原理，`Elf.js`作为一个极简的框架，是一个最好最优的选择。

## 深入响应式原理

受 [zone.js](https://github.com/angular/zone.js) 启发。数据的改变的时机无外乎用户操作（触发事件）和异步函数（`Ajax`和`setTimeout`等）。`Elf.js`封装了事件监听和常用的异步操作。使之能够得到监控，在这些异步操作结束后，`Elf.js`将会去计算数据变化，然后以最优的方式更新`DOM`。

## 集成第三方类库

由于`Elf.js`封装了原生的事件，但并没有像 [zone.js](https://github.com/angular/zone.js) 一样侵入。所以通过`Elf.js`创建的`DOM`不再触发用原生方法绑定的事件。因此第三方类库的监听可能无法触发其绑定的事件。通过引入`shims_for_Lib.js`可以让`Elf.js`接管`Window`和`Node`的事件监听。从而让第三方类库完美运行，亦可自动响应数据变化。

## 使用扩展语法

`Elf.js`无缝支持`JSX`。但`Elf.js`更推荐使用模板。相较于`JSX`，模板有着良好的结构，视图与逻辑分离，更好的与UI合作。同时，使用`elf-loader.js`加载模板，会有`Source Map`，弥补了模板调试难的短板。

## 生产环境部署

如同之前的开发一样，我们使用`node`开发，`AMD`和`CommonJS`的风格都能支持，在开发阶段无需编译、打包，并有`Source Map`输出，拥有非常好的开发体验。在使用打包工具（如：[webpack](http://webpack.github.io/)）打包后不再输出`Source Map`，在没有察觉的情况下就已经提升了性能。