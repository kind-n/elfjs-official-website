/**
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 */
"use strict";

const fs     = require("fs");
const path   = require("path");
const zlib   = require("zlib");
const http   = require("http");
const https  = require("https");
const brotli = require("brotli");
const crypto = require("crypto");

const routers = [];
const sources = {};

const HTTP_SITE_PORT = 80;
const HTTP_SAFE_PORT = 443;
const HTTP_MIME_TYPE = {
    ".js"   : { type: "text/javascript; charset=UTF-8" , mini: true  },
    ".md"   : { type: "text/markdown; charset=UTF-8"   , mini: true  },
    ".css"  : { type: "text/css; charset=UTF-8"        , mini: true  },
    ".html" : { type: "text/html; charset=UTF-8"       , mini: true  },
    ".json" : { type: "application/json; charset=UTF-8", mini: true  },
    ".ico"  : { type: "image/x-icon"                   , mini: false },
    ".png"  : { type: "image/png"                      , mini: false },
    ".xml"  : { type: "text/xml"                       , mini: true  }
};

function use (url, hwd) {
    routers.push({ url: url, hwd: hwd });
}
function hwd (url, headers, res) {
    for (let itm of routers) {
        if (itm.url.test(url)) {
            itm.hwd(url, headers, res);
            return;
        }
    }
    _404(res);
}
function end (url, headers, res) {
    if (fs.existsSync(url)) {
        let remark = fs.statSync(url);
        if (remark.isFile() === false) {
            return _404(res);
        }
        let source = sources[url];
        let coding = headers["accept-encoding"] ? headers["accept-encoding"].split(/[,\s]+/g) : [];
        let charac = remark.mtime;
        if (source && source.since.getTime() === charac.getTime()) {
            if (source.match === headers["if-none-match"] ||
                source.since.toUTCString() === headers["if-modified-since"]) {
                return _304(res, source);
            } else {
                return _200(res, source);
            }
        }
        let mime = HTTP_MIME_TYPE[path.extname(url).toLowerCase()];
        if (mime === void 0) {
            return _404(res);
        }
        let byte = fs.readFileSync(url);
        let code = void 0;
        if (mime.mini) {
            if (coding.indexOf("br") >= 0) {
                byte = new Buffer(brotli.compress(byte));
                code = "br";
            } else
            if (coding.indexOf("gzip") >= 0) {
                byte = zlib.gzipSync(byte);
                code = "gzip";
            } else
            if (coding.indexOf("deflate") >= 0) {
                byte = zlib.deflateSync(byte);
                code = "deflate";
            }
        }
        let etag = crypto.createHash("md5").update(byte).digest("hex").toLowerCase();
        return _200(res, sources[url] = {
            since : charac,
            match : etag,
            code  : code,
            byte  : byte,
            type  : mime.type
        });
    }
    return _404(res);
}
function _200 (res, data) {
    res.statusCode = 200;
    res.setHeader("Etag", data.match);
    res.setHeader("Cache-Control", "max-age=86400");
    res.setHeader("Last-Modified", data.since.toUTCString());
    res.setHeader("Expires", new Date(data.since.getTime() + 315360000000).toUTCString());
    res.setHeader("Content-Length", data.byte.length);
    res.setHeader("Content-Type", data.type);
    if (data.code) {
        res.setHeader("Content-Encoding", data.code);
    }
    res.end(data.byte);
}
function _304 (res, data) {
    res.statusCode = 304;
    res.setHeader("Etag", data.match);
    res.setHeader("Cache-Control", "max-age=86400");
    res.setHeader("Expires", new Date(data.since.getTime() + 315360000000).toUTCString());
    res.end();
}
function _404 (res) {
    res.statusCode = 404;
    res.end("Not Found");
}

use(/^\/$/,
    /**
     * 
     */
    function (url, headers, res) {
        res.writeHead(301, {
            "Location" : "/home.html"
        });
        res.end();
    }
);
use(/^\/static\//i,
    /**
     * 
     */
    function (url, headers, res) {
        end(path.join(__dirname, "node_modules", url.replace(/^\/static\//i, "/")), headers, res);
    }
);
use(/^\/(?:assets|commons|components|documents|languages|views)\//i,
    /**
     * 
     */
    function (url, headers, res) {
        end(path.join(__dirname, "src", url), headers, res);  
    }
);
use (/^\/(?:robots\.txt|sitemap\.xml|favicon\.ico)$/i,
    /**
     * 
     */
    function (url, headers, res) {
        end(path.join(__dirname, url), headers, res);
    }
);
use(/^\/[^\/]*\.html$/i,
    /**
     * 
     */
    function (url, headers, res) {
        end(path.join(__dirname, "src/main.html"), headers, res);
    }
);

https.createServer({
    key  : fs.readFileSync(path.join(__dirname, "214394620830617.key")),
    cert : fs.readFileSync(path.join(__dirname, "214394620830617.pem"))
}, function (req, res) {
    try {
        hwd(req.url.replace(/[?#]+.*$/, ""), req.headers || {}, res);
    } catch (error) {
        try {
            res.statusCode = 500;
            res.end("Server Error");
        } catch (error) {

        }
    }
}).listen(HTTP_SAFE_PORT);

http.createServer(function (req, res) {
    res.writeHead(301, {
        "Location" : "https://www.elfjs.org" + req.url
    });
    res.end();
}).listen(HTTP_SITE_PORT);

/*
http.createServer(function (req, res) {
    hwd(req.url.replace(/[?#]+.*$/, ""), req.headers || {}, res);
}).listen(8080);
*/