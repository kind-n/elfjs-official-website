module.exports = Elf.Component("home", Elf.redactElement(
    require("./home.html"),
    require("../../modules/menu/menu")
))(Elf.createClass({}));