/**
 *
 * @description Simple load helper for development
 *
 */
"use strict";

!(function (Elf) {
var current = document.currentScript || (function (scripts) {
    var i = 0, l = scripts.length;
    for (; i < l; i++) {
        if (scripts[i].readyState === "interactive") {
            return scripts[i];
        }
    }
    return scripts[l - 1];
} (document.getElementsByTagName("script")));
var extname = current.getAttribute("data-defaultExtension") || "js";
var ingress = current.getAttribute("data-main");
var baseURL = dirname(location.href);
var libsURL = dirname(current.src);
Elf.config({
    baseURL: baseURL,
    mapping: {
        // Inserting the <script> tag in the HTML file can speed up the load.
        babel: libsURL + "libs/compiler/babel.js",
        less : libsURL + "libs/compiler/style.less.js",
        sass : libsURL + "libs/compiler/style.sass.js",
        ts   : libsURL + "libs/compiler/typescript.js"
    },
    defaultExtension: extname
});
if (ingress) {
    Elf.require(ingress);
}
function dirname (v) {
    return v.replace(/[?#].*$/, "").replace(/[^\/]+$/, "");
}
} (Elf));