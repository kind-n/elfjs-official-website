var path    = require("path");
var Service = require("node-windows").Service

var svc     = new Service({
    name        : "elfjs-official-website",
    description : "Elfjs Official Website",
    script      : path.resolve("./service-startup.js")
});

svc.on("uninstall", function () {
    console.log("Uninstall complete.");
    console.log("The service exists:", svc.exists);
});

svc.uninstall();