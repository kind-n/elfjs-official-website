var Elf = require("elfjs");

module.exports = Elf.createClass({
    render: Elf.redactElement(require("./temp.html"))
});