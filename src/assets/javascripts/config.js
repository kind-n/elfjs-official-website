"use strict";

window.history.scrollRestoration = "manual";

window.marked.Renderer.prototype.heading = function (text, level, raw) {
    return "<h" + level + ' id="' + this.options.headerPrefix + raw.trim().replace(/\s+/g, "-") + '">' + text + "</h" + level + ">\n";
};

Elf.set("marked"      , window.marked);
Elf.set("DlHighlight" , window.DlHighlight);