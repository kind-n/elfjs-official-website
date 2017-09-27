module.exports = Elf.Component("docs", {
    render : Elf.redactElement(
        require("./docs.html"),
        require("../../modules/menu/menu")
    )
});