var Elf  = require("elfjs");

module.exports = Elf.Component("global-footer", {
    render : Elf.redactElement(require("./temp.html"))
});