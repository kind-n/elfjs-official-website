var Elf  = require("elfjs");

module.exports = Elf.Component("global-header", {
    
    render : Elf.redactElement(require("./temp.html")),
    
    onRouteItemClick : function () {
        this.refs.hwnd.checked = false;
    },
    onChangeLanguage : function (event) {
        this.refs.hwnd.checked = false;
        Elf.locale.language = event.target.getAttribute("data-lang");
    },

    get name () {
        return this.props.name;
    }
});