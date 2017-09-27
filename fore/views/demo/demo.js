module.exports = Elf.Component("demo", {
    render : Elf.redactElement(
        require("./demo.html"),
        require("../../modules/menu/menu")
    )
});