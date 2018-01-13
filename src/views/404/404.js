var Elf = require("elfjs");

module.exports = Elf.Component("404", {
    render : Elf.redactElement(require("./404.html"))
});