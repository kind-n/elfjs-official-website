module.exports = Elf.Component("docs", Elf.redactElement(
    require("./docs.html"),
    require("../../modules/menu/menu")
))(Elf.createClass({}));