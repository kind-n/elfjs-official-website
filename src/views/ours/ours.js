var Elf    = require("elfjs");
var marked = require("marked");
var hlight = require("DlHighlight");
var global = require("../../refers/commons/global");
var menu   = require("../../components/menu/menu");
var foot   = require("../../components/foot/foot");
var temp   = require("./ours.html");

module.exports = Elf.Component("ours", {

    get xhtml() {
        return usage(global.language);
    },

    render : Elf.redactElement(temp, menu, foot)
});

/**
 * 
 * 
 * @param {String} lang 
 * @returns 
 */
function usage (lang) {
    return Elf.require(
            "/documents/" + lang + "/ours.md"
        ).then(function (markdownString) {
            return xhtml(markdownString);
        });
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