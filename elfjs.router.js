module.exports = function (server) {
    // Redirect to Home
    server.use("/", function (url) {
        return function (req, res) {
            res.statusCode = 301;
            res.setHeader("Location", "/home.html");
            res.end();
        };
    });
    // One-Page Application
    server.use("/*.html", function () {
        return server.end("index.html");
    });
};