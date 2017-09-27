module.exports = Elf.Component("home", {
    render : Elf.redactElement(
        require("./home.html"),
        require("../../modules/menu/menu")
    )
});