/// <reference path="../node_modules/elfjs/lib/elf.d.ts" />

"use strict";

Elf.config({
    module: "commonjs"
});

Elf.require("/fore/views/main").catch(console.error.bind(console));