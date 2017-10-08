var global = require("../../commons/global");
var I18n   = require("../../commons/depends/i18n");

module.exports = Elf.Component("menu", {

    render : Elf.redactElement(require("./menu.html")),

    onChangeLanguage: function() {
        I18n.usage(global.language === "zh-CN" ? "en-US" : "zh-CN");
    }
});