var Elf = require("elfjs");

module.exports = Elf.Component("foot", {
    render : Elf.redactElement(require("./foot.html"))
});