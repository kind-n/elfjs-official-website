var Elf          = require("elfjs");
var GlobalHeader = require("../../components/global-header/view");
var GlobalFooter = require("../../components/global-footer/view");

module.exports   = Elf.Component("layout-default", {
    
    render : Elf.redactElement(require("./temp.html"), GlobalHeader, GlobalFooter),

    get pathname () {
        var matched = location.pathname.match(/[^\/\.?#]+/);
        if (matched) {
            return matched[0].toLowerCase();
        }
        return "";
    }
});