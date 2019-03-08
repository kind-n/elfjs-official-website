var Elf    = require("elfjs");

var body   = (function () {
    var previous = 0;
    var recently = 0;
    return {
        get direction () {
            return this.scrollTop - previous;
        },
        get scrollTop () {
            var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (top !== recently) {
                previous = recently;
                recently = top;
            }
            return top;
        },
        get clientHeight () {
            return document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
        }
    };
} ());

module.exports = Elf.Component("global-marked", {

    render : Elf.redactElement(require("./temp.html")),

    onInitial : function () {
        Elf.attachEvent(window, "resize", this);
        Elf.attachEvent(window, "scroll", this);
    },
    onDispose : function () {
        Elf.detachEvent(window, "resize", this);
        Elf.detachEvent(window, "scroll", this);
    },
    handleEvent : function () {

        var code = this.refs.code;
        var hash = this.refs.hash;

        var top = 0;
        var dir = body.direction;
        var now = body.scrollTop;
        var wit = body.clientHeight;
        var hit = hash.clientHeight;
        var cit = code.clientHeight;
        var hft = hash.offsetTop;
        var cft = code.offsetTop;

        if (wit - cft > hit) {
            top = Math.max(0, now - cft + Math.min(120, wit - hit));
            hash.style.marginTop = top + "px";
        } else {
            if (dir > 0) {
                if (hit + hft < wit + now) {
                    top = wit + now - hit - cft;
                    top = Math.max(0, Math.min(top, cit - hit));
                    hash.style.marginTop = top + "px";
                }
            } else {
                if (now < hft) {
                    top = now - cft;
                    top = Math.max(0, Math.min(top, cit - hit));
                    hash.style.marginTop = top + "px";
                }
            }
        }
    },

    get marked () {
        return Elf.locale.localize(this.props.name).marked || "";
    },
    get hashes () {
        return Elf.locale.localize(this.props.name).hashes || [];
    },

    get topname () {
        if (this.composing) {
            return "";
        }
        if (this.refs.code) {
            var top = body.scrollTop;
            var tag = this.refs.code.firstElementChild;
            while (tag) {
                if ((tag.tagName === "H1"|| tag.tagName === "H2") && tag.offsetTop >= top) {
                    return tag.id;
                }
                tag = tag.nextElementSibling;
            }
        }
        return "";
    }
});