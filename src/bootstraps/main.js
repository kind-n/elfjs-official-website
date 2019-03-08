var Elf    = require("elfjs");
var marked = require("marked");
var hlight = require("DlHighlight");
var Layout = require("../shareds/layout-default/view");

require("elfjs-loader");
require("elfjs-router");
require("../dependencies/locale");

/**
 * 
 * @param {string} text 
 */
function markedDocument (text) {
    return {
        marked : marked(text, {
            highlight : function (code, lang) {
                return new hlight({ lang : lang }).doItNow(code);
            }
        }),
        hashes : text.split("\n")
            .filter(function (item) {
                return item.charAt(0) === "#";
            })
            .reduce(function (init, item) {
                var expr = item.match(/^(#+)(.*)/);
                var name = expr[2].trim();
                var hash = expr[2].trim().replace(/\s+/g, "-");
                if (expr) {
                    switch (expr[1].length) {
                        case 1:
                            init.push({
                                name : name,
                                hash : hash,
                                children : []
                            });
                            break;
                        case 2:
                            if (init.length > 0) {
                                init[init.length - 1].children.push({
                                    name : name,
                                    hash : hash
                                });
                            }
                            break;
                        default:
                            break;
                    }
                }
                return init;
            }, [])
    }
}
Elf.router.register([
    {
        path : "/home.html",
        component : function () { return Elf.require("/views/home/view"); }
    },
    {
        path : "/demo.html",
        component : function () { return Elf.require("/views/demo/view"); }
    },
    {
        path : "/docs.html",
        component : function () { return Elf.require("/views/docs/view"); }
    },
    {
        path : "/ours.html",
        component : function () { return Elf.require("/views/ours/view"); }
    },
    {
        path : "**",
        component : function () { return Elf.require("/views/_404/view"); }
    }
]);

Elf.locale.register({
    "zh-CN" : function (exports, language) {
        return exports[language] || (Elf.require("/languages/zh-CN.json").then(function (response) {
            exports[language] = response;
        }), {});
    },
    "en-US" : function (exports, language) {
        return exports[language] || (Elf.require("/languages/en-US.json").then(function (response) {
            exports[language] = response;
        }), {});
    },
    "DEMO-MD" : function (exports, language) {
        return exports[language  + "/" + "DEMO-MD"] || (Elf.require("/documents/" + language + "/demo.md").then(function (response) {
            return exports[language  + "/" + "DEMO-MD"] = markedDocument(response);
        }), {});
    },
    "DOCS-MD" : function (exports, language) {
        return exports[language  + "/" + "DOCS-MD"] || (Elf.require("/documents/" + language + "/docs.md").then(function (response) {
            return exports[language  + "/" + "DOCS-MD"] = markedDocument(response);
        }), {});
    }
});

Elf.locale.language = (function () {
    var languages = ["zh-CN", "en-US"];
    if (typeof sessionStorage !== "undefined") {
        if (languages.indexOf(sessionStorage.getItem("lang")) >= 0) {
            return sessionStorage.getItem("lang");
        }
    }
    if (languages.indexOf(navigator.language) >= 0) {
        return navigator.language;
    }
    for (var i = 0; i < navigator.languages.length; i++) {
        if (languages.indexOf(navigator.languages[i]) >= 0) {
            return navigator.languages[i];
        }
    }
    return languages[0];
} ());

module.exports = Elf.render(Elf.createElement(Layout), document.querySelector(".global-container"), true);