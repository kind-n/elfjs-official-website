var menu = require("../../components/menu/menu");
var foot = require("../../components/foot/foot");
var temp = require("./home.html");

module.exports = Elf.Component("home", {
    render : Elf.redactElement(temp, menu, foot)
});