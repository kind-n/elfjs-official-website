var Link = require("../depends/link");
var I18n = require("../depends/i18n");

Link.state("/home.html", "/fore/views/home/home");
Link.state("/demo.html", "/fore/views/demo/demo");
Link.state("/docs.html", "/fore/views/docs/docs");
Link.state("/ours.html", "/fore/views/ours/ours");

I18n.state("zh-CN"     , "/fore/assets/langs/zh-CN.json");
I18n.state("en"        , "/fore/assets/langs/en.json");

module.exports = Elf.Promise.all([
    Link.start(),
    I18n.start()
]).then(function () {
    return Elf.render(Elf.createElement(Link.RouterView), document.querySelector("section"), true);
});