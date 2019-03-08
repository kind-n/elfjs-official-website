/**
 * 
 * https://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 2.0.0
 * @license MIT
 * 
 */
"use strict";

! (function (exports) {

    function register (value) {
        localeMappings = value;
    }
    function localize (token) {
        return localeMappings[token](localeDocument, localeLanguage);
    }

    var localeMappings = {};
    var localeDocument = {};
    var localeLanguage = (localStorage && localStorage.getItem("lang")) || navigator.language;

    exports.depend([
        Elf.Transform("i18n", {
            transform : function (props) {
                var i18n = void 0;
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof props === "string" && props !== "") {
                    i18n = props.split(".").reduce(function (init, item) {
                        return init && init[item];
                    }, localize(localeLanguage));
                }
                if (typeof i18n === "undefined") {
                    return props;
                }
                if (typeof i18n === "function") {
                    return i18n.apply(this, args);
                }
                if (typeof i18n === "string") {
                    return i18n.replace(/\{(\d+)\}/g, function (_, i) {
                        return args[parseInt(i)];
                    });
                }
                return null;
            }
        })
    ]);

    exports.locale = {
        register : register,
        localize : localize,
        get language () {
            return localeLanguage;
        },
        set language (value) {
            localeLanguage = value;
            sessionStorage && sessionStorage.setItem("lang", value);
        }
    };
} (
    typeof exports !== "undefined" ? module.exports = require("elfjs") : this.Elf
));