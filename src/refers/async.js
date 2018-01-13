var Elf    = require("elfjs");
var helper = require("./commons/helper");

module.exports = Elf.Transform("async", {
    transform : function (value, props) {
        if (value instanceof Elf.Promise) {
            value = value.status === "resolved"
                  ? value.result
                  : "";
        }
        return helper.eachProps(value, props);
    }
});