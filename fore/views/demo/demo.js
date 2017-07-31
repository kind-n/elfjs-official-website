module.exports = Elf.Component("demo", Elf.redactElement(
    require("./demo.html"),
    require("../../modules/menu/menu")
))(Elf.createClass({}));