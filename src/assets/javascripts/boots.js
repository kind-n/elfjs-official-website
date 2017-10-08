/**
 * 
 * @copyright (C) 2017 Wu Hu. All Rights Reserved.
 * 
 */

"use strict";

/////////////////////////////////////////////////

/**
 * Disable scroll restoration.
 */
history.scrollRestoration = "manual";

/**
 * Fixed headings id attribute bug.
 * 
 * @param {String} text
 * @param {Number} level
 * @param {String} raw
 * @returns {String}
 */
window.marked.Renderer.prototype.heading = function (text, level, raw) {
    return "<h" + level + ' id="' + this.options.headerPrefix + raw.trim().replace(/\s+/g, "-") + '">' + text + "</h" + level + ">\n";
};


/////////////////////////////////////////////////

Elf.set("marked"      , window.marked);
Elf.set("DlHighlight" , window.DlHighlight);

Elf.config({ 
    module            : "commonjs"
});

Elf.require("/views/main");