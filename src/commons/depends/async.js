module.exports = Elf.Transform("async", {
    transform : function (value) {
        if (value instanceof Elf.Promise) {
            value = value.status === "resolved"
                  ? value.result
                  : "";
        }
        return value;
    }
});