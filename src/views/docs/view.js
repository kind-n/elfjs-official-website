var Elf          = require("elfjs");
var GlobalMarked = require("../../components/global-marked/view");

module.exports = Elf.createClass({
    render: Elf.redactElement(require("./temp.html"), GlobalMarked)
});