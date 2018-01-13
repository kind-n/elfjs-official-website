var Elf      = require("elfjs");
var global   = require("./commons/global");
var helper   = require("./commons/helper");
var Language = void 0;
var Mappings = [];

exports.I18nTransform = Elf.Transform("i18n", {
    transform : function (value) {
        return helper.eachProps(Language, value);
    }
});
exports.state = state;
exports.usage = usage;
exports.start = start;

function state (name, path) {
    Mappings.push({ name: name, path: path });
}
function usage (name) {
    var number = 0;
    for (var i = 0; i < Mappings.length; i++) {
        var ns = Mappings[i];
        if (ns.name === name) {
            number = i;
            break;
        }
    }
    if (Mappings.length <= 0) {
        return Elf.Promise.reject("Not Installed Language.");
    } else {
        global.language = Mappings[number].name;
        return Elf.require(
            Mappings[number].path
        ).then(function (response) {
            Language = response;
        });
    }
}
function start () {
    return usage(global.language);
}