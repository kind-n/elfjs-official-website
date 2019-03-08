var path    = require("path");
var Service = require("node-windows").Service

var svc     = new Service({
    name        : "elfjs-official-website",
    description : "Elfjs Official Website",
    script      : path.resolve("./service-startup.js")
});

svc.on("install", function () {
    svc.start();
});

svc.install();