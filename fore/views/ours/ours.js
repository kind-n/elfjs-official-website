module.exports = Elf.Component("ours", Elf.redactElement(
    require("./ours.html"),
    require("../../modules/menu/menu")
))(Elf.createClass({}));