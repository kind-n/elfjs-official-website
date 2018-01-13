module.exports = function (server) {
    server.use("/", function (url) {
        return function (req, res) {
            res.statusCode = 301;
            res.setHeader("Location", "/home.html");
            res.end();
        };
    });
    server.use("/*.html", function (url) {
        return server.end("index.html");
    });
};