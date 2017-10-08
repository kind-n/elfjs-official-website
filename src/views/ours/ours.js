var menu   = require("../../components/menu/menu");
var foot   = require("../../components/foot/foot");
var temp   = require("./ours.html");

module.exports = Elf.Component("ours", {
    render : Elf.redactElement(temp, menu, foot)
});