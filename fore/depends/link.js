var Mappings = [];
var Viewport = void 0;

var RouterLink = Elf.Component("router-link")(
    Elf.createClass({
        render : function () {
            return Elf.createElement("a", Elf.assign({ ref: "link" }, this.props), this.props.children);
        },
        onInitial : function () {
            Elf.attachEvent(this.refs.link, "click", this);
        },
        onDispose : function () {
            Elf.detachEvent(this.refs.link, "click", this);
        },
        handleEvent : function (event) {
            event.stopPropagation();
            event.preventDefault();
            forth(this.props.href);
        }
    })
);
var RouterView = Elf.Component("router-view")(
    Elf.createClass({
        render : function () {
            return typeof Viewport === "function" ? Elf.createElement(Viewport) : null;
        }
    })
);

module.exports.RouterLink = RouterLink;
module.exports.RouterView = RouterView;
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
    Elf.depend(RouterLink, RouterView);
    Elf.attachEvent(window, "popstate", function () { done(location.pathname); });
    return done(location.pathname);
}