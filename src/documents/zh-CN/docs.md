# 公共方法

## assign

拷贝一个或多个源对象到目标对象。与 [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 相同。

* __语法__
```js
Elf.assign(target, ...sources);
```
* __参数__
    * __target__ 目标对象。
    * __sources__ 一个或多个源对象。

## createClass

创建一个类。

* __语法__
```js
Elf.createClass(proto);
```
* __参数__
    * __proto__ 一个对象，应该是新创建的类的原型。
* __示例__
```js
var MyClass = Elf.createClass({
    constructor : function () {
        // do some thing
    },
    myMethod : function () {
        // do some thing
    }
});
```

## requireAnimationFrame

包装 [window.requireAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) 函数。

* __语法__
```js
Elf.requireAnimationFrame(callback);
```
* __参数__
    * __callback__ 在每次需要重新绘制动画时，会调用这个参数所指定的函数。
* __返回值__
    * 一个 [Disposable](#Disposable) 对象，用来取消操作。

## setInterval

包装 [window.setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) 函数。

* __语法__
```js
Elf.setInterval(callback, delay [, param1, param2, ...]);
```
* __参数__
    * __callback__ 想要重复调用的函数。
    * __delay__ 每次延迟的毫秒数。
* __返回值__
    * 一个 [Disposable](#Disposable) 对象，用来取消操作。

## setTimeout

包装 [window.setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) 函数。

* __语法__
```js
Elf.setTimeout(callback, delay [, param1, param2, ...]);
```
* __参数__
    * __callback__ 在`delay`毫秒后调用的函数。
    * __delay__ 延迟的毫秒数。
* __返回值__
    * 一个 [Disposable](#Disposable) 对象，用来取消操作。

## Promise

用于一个异步操作的最终完成（或失败）及其结果值的表示。与 [window.Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 略有不同。

* __语法__

```js
new Elf.Promise( /* executor */ function (resolve, reject) { ... });
```
* __参数__
    * __executor__ 一个带有`resolve`和`reject`两个参数的函数。`resolve`和`reject`函数被调用时，分别将`promise`的状态改为`resolve(完成)`或`reject(失败)`。`executor`函数可以返回一个函数。那么该函数将在`promise`的`dispose`函数被调用时调用。
* __静态方法__
    * __Elf.Promise.all(iterable)__ 同 [window.Promise.all(iterable)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)。但参数 iterable 不支持类数组、Generator等。
    * __Elf.Promise.race(iterable)__ 同 [window.Promise.race(iterable)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)。但参数 iterable 不支持类数组、Generator等。
    * __Elf.Promise.reject(reason)__ 同 [window.Promise.reject(reason)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)。
    * __Elf.Promise.resolve(value)__ 同 [window.Promise.resolve(value)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)。
    * __Elf.Promise.ajax(request)__ 发起一个 [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 或 [JSONP](https://en.wikipedia.org/wiki/JSONP) 请求。需要传入一个 [Request](#Request) 对象。返回一个 [Elf.Promise](#Promise)<[Response](#Response)> 对象。
* __原型属性__
    * __status__ 提供同步访问`promise`的状态。
    * __result__ 提供同步访问`promise`的结果。
* __原型方法__
    * __Elf.Promise.prototype.catch(onRejected)__ 同 [window.Promise.prototype.catch(onRejected)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)。
    * __Elf.Promise.prototype.then(onResolved, onRejected)__ 同 [window.Promise.prototype.then(onResolved, onRejected)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)。
    * __Elf.Promise.prototype.dispose()__ 尝试取消`promise`操作。该函数并不能终止`executor`的执行，仅执行`executor`函数返回的函数。


# 构建方法

## Component

定义一个组件类。

* __语法__
```js
Elf.Component(name, proto);
```
* __参数__
    * __name__ 组件别名，它将作为`HTML Tag`在模板中使用。
    * __proto__ 一个对象，应该是新创建的类的原型。必须实现`render`函数。
* __返回值__
    * 一个组件类。
* __示例__
```js
module.exports = Elf.Component("foo", {
    render : Elf.redactElement(require("./foo.html"))
});
```
* [完整示例](/demo.html)

## Directive

定义一个指令类。指令是增强元素功能的有效方法。

* __语法__
```js
    Elf.Directive(name, proto);
```
* __参数__
    * __name__ 指令别名，它将作为`cmd`在模板中使用。
    * __proto__ 一个对象，应该是新创建的类的原型。
* __返回值__
    * 一个指令类。
* __示例__
```js
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
* [完整示例](/demo.html)

## Transform

定义一个转换类。

* __语法__
```js
Elf.Transform(name, proto);
```
* __参数__
    * __name__ 别名，它将作为`pipe`在模板中使用。
    * __proto__ 一个对象，应该是新创建的类的原型。必须实现`transform`函数。
* __返回值__
    * 一个转换类。
* __示例__
```js
module.exports = Elf.Transform("date", {
    transform : function (value, formatExpr) {
        return moment(value).format(formatExpr);
    }
});
```
* [完整示例](/demo.html)

## createEvent

创建一个 [Event](#Event) 对象。

* __语法__
```js
Elf.createEvent(type [, bubbles, detail]);
```
* __参数__
    * __type__ 表示监听事件类型的字符串。
    * __bubbles__ 指示事件是否可以冒泡。
    * __detail__ 事件携带的值，它将在冒泡过程中一直被保留。
* __返回值__
    * 一个 [Event](#Event) 对象。
* __示例__
```js
var event = Elf.createEvent("custom", true, {});
```

## attachEvent

附加事件监听（冒泡阶段）。

* __语法__
```js
Elf.attachEvent(node, type, listener);
```
* __参数__
    * __node__ 一个 [Component](#Component) 实例或者 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)。
    * __type__ 表示监听事件类型的字符串。
    * __listener__ 一个实现了 [EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) 接口的对象或者一个函数。当监听事件类型被触发时，会接收到一个事件通知（ [Event](#Event) 对象）。
* __示例__
    * 参见：[Directive](#Directive)

## detachEvent

移除事件监听（冒泡阶段）。

* __语法__
```js
Elf.detachEvent(node, type, listener);
```
* __参数__
    * __node__ 一个 [Component](#Component) 实例或者 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)。
    * __type__ 表示监听事件类型的字符串。
    * __listener__ 通过 [Elf.attachEvent](#attachEvent) 附加的`listener`。
* __示例__
    * 参见：[Directive](#Directive)

## dispatchEvent

向一个指定的事件目标派发一个事件。

* __语法__
```js
Elf.dispatchEvent(node, event);
```
* __参数__
    * __node__ 一个 [Component](#Component) 实例或者 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)。
    * __event__ 一个 [Event](#Event) 对象。

## createElement

创建虚拟元素。

* __语法__
```js
Elf.createElement(type [, props, child1, child2, ...]);
```
* __参数__
    * __type__ 一个`HTML Tag`字符串或者一个 [Component](#Component) 类。
    * __props__ 一个对象，用来表示元素的属性。
    * __...children__ 子元素。一个或多个虚拟元素或者字符串。
* __示例__
```js
var element = Elf.createElement("div", { width: "300px" }, "This is a div.");
```

## redactElement

模板解析。

* __语法__
```js
Elf.redactElement(temp [, depend1, depend2, ...]);
```
* __参数__
    * __temp__ 模板字符串。
    * __...depends__ 一个或多个依赖项（ [Component](#Component) / [Directive](#Directive) / [Transform](#Transform) ）。
* __返回值__
    * 一个返回虚拟元素的函数。
* __示例__
    * 参见：[Component](#Component)

## depend

设置全局依赖项。

* __语法__
```js
Elf.depend([depend1, depend2, ...]);
```
* __参数__
    * __...depends__ 一个或多个依赖项（ [Component](#Component) / [Directive](#Directive) / [Transform](#Transform) ）。
* __示例__
    * 参见：[完整示例](/demo.html)

## render

通过虚拟元素创建真实元素，并添加到`DOM`树中。

* __语法__
```js
Elf.render(element, container [, duplex]);
```
* __参数__
    * __element__ 一个虚拟元素。
    * __container__ 提供一个在页面已经存在的 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) 元素作为新创建的元素的挂载目标。
    * __duplex__ 指示新创建的 [Individual](#Individual) 是否自动更新。
* __返回值__
    * 一个 [Individual](#Individual) 对象。
* __示例__
    * 参见：[完整示例](/demo.html)

## forceUpdate

强制更新所有`duplex`为`true`的 [Individual](#Individual)。

* __语法__
```js
Elf.forceUpdate();
```
* __建议__
    * 除非确认 [Individual](#Individual) 不需要更新，建议参数`duplex`始终传入`true`值。`forceUpdate`主要用于第三方类库触发页面更新。

# 模板语法

## 文本

使用`{{ }}`进行文本插值。

* __语法__
```html
<div>Text: {{ text }}</div>
```

在真实元素创建时，`text`将会被替换成对应 [Component](#Component) 实例的属性值。在`text`值修改后，在特定时机元素会自动更新到最新的值。

## JavaScript 表达式

`Elf.js`提供了完整的`JavaScript`表达式支持。

* __语法__
```html
    <div>Text: {{ text.toLowerCase() }}</div>
    <div>Number: {{ number + 1 }}</div>
    <div>{{ ok ? "Yes" : "No" }}</div>
```

这些表达式会在对应 [Component](#Component) 实例作用域下直接作为`JavaScript`被解析。表达式的返回值将作为输出文本。


## 条件输出

`Elf.js`提供在模板中根据条件输出`Element`的支持。

* __语法__
```html
    <div e-if="number > 0">{{ text }}</div>
```

通过`e-if`属性可以在条件满足时才创建`Element`，它的值是一个`boolean`表达式。

## 循环输出

`Elf.js`提供在模板中遍历数组或对象，循环输出`Element`的支持。

* __语法__
```html
    <div e-for="item in values">{{ item }}</div>
```

通过`e-for`属性可以遍历数组或对象，循环输出`Element`。变量名与遍历的对象用`in`或`of`分割。

## 原始 HTML

`{{ }}`语法会将数据解析成普通文本，而非`HTML`代码。若需输出真正的`HTML`，需要使用`innerHTML`属性。

* __语法__
```html
    <div innerHTML="{{ html }}"></div>
```

通过这种方式创建的元素，没有对应的虚拟元素。`Elf.js`无法控制，仅作为属性处理，与元素其他属性相同。

## 管道

在文本将要输出时，可以通过 [Transform](#Transform) 类将其转换成需要的格式。

* __语法__
```html
    <div>Date: {{ value | date "YYYY-MM-DD" 8 }}</div>
```

管道与表达式之间用`|`分割。若管道需要传入其他参数，则参数与管道名之间用`空格`分割。多个管道之间用`|`分割。

## 事件

以`on`开头的属性将会被解析为事件。模板内置了一个`event`对象，用以接收事件通知。

* __语法__
```html
    <div onclick="onClick(event);"></div>
```

`onClick`函数是对应 [Component](#Component) 实例的函数。

## 指令

将元素的功能采用 [Directive](#Directive) 实现，可以大大减少代码量。在模板中使用非常简洁。

* __语法__
```html
    <div cmd="drag"></div>
```

`cmd`是一个 [Directive](#Directive) 类的数组。在模板内允许使用字符串语法。多个指令之间用`空格`或`逗号`隔开。

# 生命周期

## onInitial

在 [Component](#Component) 或 [Directive](#Directive) 已经创建后触发。[Directive](#Directive) 会接收到对应的实例和对应的实例的属性。此时真实元素已经添加到`DOM`树中。

## onRenewal
在 [Component](#Component) 或 [Directive](#Directive) 已经更新后触发。[Directive](#Directive) 会接收到对应的实例和对应的实例的属性。此时真实元素已经完成更新。

## onDispose

在 [Component](#Component) 或 [Directive](#Directive) 将要销毁时触发。[Directive](#Directive) 会接收到对应的实例和对应的实例的属性。此时真实元素还未从`DOM`树中移除。

# 特殊属性

## key

该特殊属性用于子元素集更新时的排列算法，为拥有相同父元素的子元素设置唯一的`key`，可以有效提高真实元素的复用性，从而提高性能。

## ref

该特殊属性用于真实元素的访问，引用的元素将会注册在父组件的`refs`对象上。

# 接口

## Event

包装 [window.Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event) 对象。`Elf.js`提供了一套类似原生的事件机制，[Component](#Component) 和 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) 都可以作为事件的`target`。它们都具有冒泡能力，且互相独立。[Component](#Component) 的事件在冒泡传递时只会触发其父级 [Component](#Component) 的事件监听，[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) 的事件在冒泡传递时只会触发其父级 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) 的事件监听。

* __属性__
    * __detail__ 用于事件在冒泡时携带数据。
* __方法__
    * __preventRefresh__ 阻止自动更新。

## Request

请求上下文。

* __属性__
    * __url__ 一个字符串，表示将要发起的请求的资源路径。
    * __body__ 一个序列化的字符串，表示将要发起的请求的主体。
    * __method__ 一个字符串，表示将要发起的请求的方法。
    * __timeout__ 一个数字，表示请求的超时时间。
    * __headers__ 一个`Object`，表示将要发起的请求的头。
    * __responseType__ 一个字符串，表示相应的数据类型。
    * __withCredentials__ 一个`Boolean`值，表示请求是否跨域。
    * __jsonp__ 指示是否采用 [JSONP](https://en.wikipedia.org/wiki/JSONP) 方式。

## Response

响应结果。

* __属性__
    * __status__ 表示响应的 [HTTP Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。
    * __headers__ 一个`Object`，表示响应的头。
* __方法__
    * __data__ 得到相应主体的原始数据。
    * __text__ 得到文本形式的响应主体。
    * __json__ 得到对象形式的响应主体。

## Individual

独立的个体。一个好的`Individual`是不直接依赖其他`Individual`的，亦不暴露任何接口，它是一个有着完整业务逻辑的模块。

* __属性__
    * __refs__ 提供真实元素的访问。
    * __drawn__ 只读属性，表示`Individual`是否渲染完成。
    * __duplex__ 只读属性，表示`Individual`是否自动更新。
* __方法__
    * __forceUpdate__ 强制更新`Individual`，忽略`duplex`。不建议使用此函数，建议将`duplex`传入`true`自动更新。
    * __dispose__ 销毁`Individual`。

## Disposable

提供一种用于销毁资源的机制。

* __方法__
    * __dispose__ 抽象方法，用于销毁资源。