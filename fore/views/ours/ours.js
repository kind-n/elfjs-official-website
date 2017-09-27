module.exports = Elf.Component("ours", {
    render : Elf.redactElement(
        require("./ours.html"),
        require("../../modules/menu/menu")
    )
});