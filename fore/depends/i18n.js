var Mappings = [];
var Language = void 0;

var I18nTransform = Elf.Transform("i18n",{
    transform : function (value) {
        return value.split(".").reduce(function (init, item) {
            return init && init[item];
        }, Language);
    }
});

module.exports.I18nTransform = I18nTransform;
module.exports.state = state;
module.exports.usage = usage;
module.exports.start = start;

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
    if (Mappings.length > 0) {
        if (window.localStorage) {
            window.localStorage.setItem("lang", Mappings[number].name);
        }
        return Elf.require(Mappings[number].path).then(function (response) {
            Language = response;
        });
    } else {
        return Elf.Promise.reject("Not Installed Language.");
    }
}
function start () {
    Elf.depend(I18nTransform);
    return usage((window.localStorage && window.localStorage.getItem("lang")) || navigator.language);
}