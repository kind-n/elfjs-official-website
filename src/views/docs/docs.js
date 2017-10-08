var marked = require("marked");
var hlight = require("DlHighlight");
var global = require("../../commons/global");
var menu   = require("../../components/menu/menu");
var foot   = require("../../components/foot/foot");
var temp   = require("./docs.html");
var objs   = {};

module.exports = Elf.Component("docs", {

    get xhtml () {
        return usage(global.language).xhtml;
    },

    get heads () {
        return usage(global.language).heads;
    },

    render : Elf.redactElement(temp, menu, foot),

    onInitial : function () {
        Elf.attachEvent(window, "scroll", this);
    },

    onDispose : function () {
        Elf.detachEvent(window, "scroll", this);
    },

    /**
     * 
     * @param {Elf.Event} event
     */
    handleEvent : function (event) {
        event.preventRefresh();
        event.stopPropagation();

        /** @type {HTMLElement} */
        var __code = this.refs.code;
        /** @type {HTMLElement} */
        var __hash = this.refs.hash;

        var top = 0;
        var now = global.scrollTop;
        var dir = global.scrollDir;
        var wit = global.clientHeight;
        var hit = __hash.clientHeight;
        var cit = __code.clientHeight;
        var hft = __hash.offsetTop;
        var cft = __code.offsetTop;

        if (wit - cft > hit) {
            top = Math.max(0, now - cft);
            __hash.style.marginTop = top + "px";
        } else {
            if (dir > 0) {
                if (hit + hft < wit + now) {
                    top = wit + now - hit - cft;
                    top = Math.max(0, Math.min(top, cit - hit));
                    __hash.style.marginTop = top + "px";
                }
            } else {
                if (now < hft) {
                    top = now - cft;
                    top = Math.max(0, Math.min(top, cit - hit));
                    __hash.style.marginTop = top + "px";
                }
            }
        }        
    }
});

/**
 * 
 * 
 * @param {String} lang 
 * @returns 
 */
function usage (lang) {
    return objs[lang] || (
        Elf.require(
            "/documents/" + lang + "/docs.md"
        ).then(function (markdownString) {
            objs[lang] = {
                xhtml : xhtml(markdownString), 
                heads : heads(markdownString)
            };
        }), {});
}

/**
 * 
 * 
 * @param {String} text 
 * @returns 
 */
function xhtml (text) {
    return marked(text, {
        highlight : function (code, lang) {
            return new hlight({ lang : lang }).doItNow(code);
        }
    });
}

/**
 * 
 * 
 * @param {String} text 
 * @returns 
 */
function heads (text) {
    return text.split("\n")
    .filter(function (item) {
        return item.charAt(0) === "#";
    })
    .map(function (item) {
        var expr = item.match(/^(#+)(.*)/);
        return {
            name : expr[2].trim(),
            href : expr[2].trim().replace(/\s+/g, "-"),
            tier : expr[1].length
        };
    });
}