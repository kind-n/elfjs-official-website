var I18n  = require("../commons/depends/i18n");
var Link  = require("../commons/depends/link");
var Async = require("../commons/depends/async");


I18n.state("zh-CN"     , "/languages/zh-CN.json");
I18n.state("en-US"     , "/languages/en-US.json");

Link.state("/home.html", "/views/home/home");
Link.state("/demo.html", "/views/demo/demo");
Link.state("/docs.html", "/views/docs/docs");
Link.state("/ours.html", "/views/ours/ours");
Link.state("**",         "/views/404/404");

Elf.depend([
    I18n.I18nTransform,
    Link.RouterLink,
    Link.RouterView,
    Async
]);

module.exports = Elf.Promise.all([
    I18n.start(),
    Link.start()
]).then(function () {
    return Elf.render(Elf.createElement(Link.RouterView), document.querySelector("section"), true);
});