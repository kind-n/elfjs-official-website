var Elf    = require("elfjs");
var global = require("../../refers/commons/global");
var Langs  = require("../../refers/i18n");

module.exports = Elf.Component("menu", {
    render : Elf.redactElement(require("./menu.html")),
    onChangeLanguage: function() {
        Langs.usage(global.language === "zh-CN" ? "en-US" : "zh-CN");
    }
});