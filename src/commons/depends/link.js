var Mappings = [];
var Viewport = void 0;

module.exports.RouterLink = Elf.Component("router-link", {
    render      : function () {
        return Elf.createElement("a", Elf.assign({ ref: "link" }, this.props), this.props.children);
    },
    onInitial   : function () {
        Elf.attachEvent(this.refs.link, "click", this);
    },
    onDispose   : function () {
        Elf.detachEvent(this.refs.link, "click", this);
    },
    handleEvent : function (event) {
        event.stopPropagation();
        event.preventDefault();
        forth(this.props.href);
    }
});
module.exports.RouterView = Elf.Component("router-view", {
    render      : function () {
        return typeof Viewport === "function" ? Elf.createElement(Viewport) : null;
    }
});

module.exports.state = state;
module.exports.forth = forth;
module.exports.start = start;

function glob (expr) {
    return new RegExp("^" + expr.replace(".", "\\.").replace("**", ".*") + "$", "i");
}
function done (path) {
    for (var i = 0; i < Mappings.length; i++) {
        var ns = Mappings[i];
        if (ns.path.test(path)) {
            return Elf.require(ns.temp).then(function (response) {
                Viewport = response;
            });
        }
    }
    return Elf.Promise.reject("No match router '" + path + "'.");
}
function state (path, temp) {
    Mappings.push({ path: glob(path), temp: temp });
}
function forth (path) {
    if (location.pathname !== path) {
        if (window.history &&
            window.history.pushState) {
            window.history.pushState(null, null, path);
            done(path);
        } else {
            location.href = path;
        }
    }
}
function start () {
    return Elf.attachEvent(window, "popstate", function () { done(location.pathname); }), done(location.pathname);
}