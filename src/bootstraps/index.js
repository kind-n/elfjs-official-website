var Elf   = require("elfjs");
var Async = require("../refers/async");
var Route = require("../refers/link");
var Langs = require("../refers/i18n");


Langs.state("zh-CN"     , "/languages/zh-CN.json");
Langs.state("en-US"     , "/languages/en-US.json");

Route.state("/home.html", "/views/home/home");
Route.state("/demo.html", "/views/demo/demo");
Route.state("/docs.html", "/views/docs/docs");
Route.state("/ours.html", "/views/ours/ours");
Route.state("**",         "/views/404/404");

Elf.depend([
    Langs.I18nTransform,
    Route.RouterLink,
    Route.RouterView,
    Async
]);

module.exports = Elf.Promise.all([
    Langs.start(),
    Route.start()
]).then(function () {
    return Elf.render(Elf.createElement(Route.RouterView), document.querySelector("section"), true);
});