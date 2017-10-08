/**
 * 
 * @copyright (C) 2017 Wu Hu. All Rights Reserved.
 * 
 */

"use strict";

/////////////////////////////////////////////////

const fs   = require("fs");
const http = require("http");
const path = require("path");
const zlib = require("zlib");
const list = [];

const TEXT_CHAR = "; charset=UTF-8";
const TEXT_TYPE = {
        type    : "text/plain" + TEXT_CHAR,
        gzip    : true 
};
const MIME_TYPE = {
    ".js"       : {
        type    : "text/javascript"  + TEXT_CHAR,
        gzip    : true
    },
    ".ts"       : {
        type    : "text/typescript"  + TEXT_CHAR,
        gzip    : true
    },
    ".json"     : {
        type    : "application/json" + TEXT_CHAR,
        gzip    : true
    },
    ".html"     : {
        type    : "text/html"        + TEXT_CHAR,
        gzip    : true
    },
    ".scss"     : {
        type    : "text/scss"        + TEXT_CHAR,
        gzip    : true
    },
    ".css"      : {
        type    : "text/css"         + TEXT_CHAR,
        gzip    : true
    },
    ".svg"      : {
        type    : "image/svg+xml",
        gzip    : true
    },
    ".jpg"      : {
        type    : "image/jpeg",
        gzip    : false
    },
    ".png"      : {
        type    : "image/png",
        gzip    : false
    }
};


use(/^\/$/i,
    /**
     * 
     * @param {String} url
     * @param {http.IncomingMessage} req
     * @param {http.OutgoingMessage} res
     */
    function (url, req, res) {
        res.writeHead(301, {
            "Location" : "/home.html"
        });
        res.end();
    }
);

use(/^\/static\//i,
    /**
     * 
     * @param {String} url
     * @param {http.IncomingMessage} req
     * @param {http.OutgoingMessage} res
     */
    function (url, req, res) {
        return _200(path.join(__dirname, "node_modules", url.replace(/^\/static\//i, "/")), req, res);
    }
);

use(/^\/(?:assets|commons|components|documents|languages|views)\//i,
    /**
     * 
     * @param {String} url
     * @param {http.IncomingMessage} req
     * @param {http.OutgoingMessage} res
     */
    function (url, req, res) {
        return _200(path.join(__dirname, "src", url), req, res);  
    }
);

use (/^\/(?:robots\.txt|sitemap\.xml|favicon\.ico)$/i,
    /**
     * 
     * @param {String} url
     * @param {http.IncomingMessage} req
     * @param {http.OutgoingMessage} res
     */
    function (url, req, res) {
        return _200(path.join(__dirname, url), req, res);
    }
);

use(/^\/[^\/]*\.html$/i,

    /**
     * 
     * @param {String} url
     * @param {http.IncomingMessage} req
     * @param {http.OutgoingMessage} res
     */
    function (url, req, res) {
        return _200(path.join(__dirname, "src/main.html"), req, res);
    }
);

/**
 * 
 * 
 */
http.createServer(function (req, res) {

    return hwd(req.url.replace(/[?#]+.*$/, ""), req, res);

}).listen(8080);

/**
 * 
 * 
 * @param {RegExp} regexp 
 * @param {Function} handler 
 */
function use (regexp, handler) {
    list.push({
        path    : regexp,
        handler : handler
    });
}

/**
 * 
 * 
 * @param {String} router 
 * @param {http.IncomingMessage} req 
 * @param {http.OutgoingMessage} res 
 */
function hwd (router, req, res) {
    for (let item of list) {
        if (item.path.test(router)) {
            return item.handler(router, req, res);
        }
    }
    return _404(router, req, res);
}

/**
 * 
 * 
 * @param {String} router 
 * @param {http.IncomingMessage} req 
 * @param {http.OutgoingMessage} res 
 */
function _200 (router, req, res) {
    if (fs.existsSync(router) &&
        fs.statSync(router).isFile()) {
        const mimetype = MIME_TYPE[
            path.extname(router).toLowerCase()] || TEXT_TYPE;
        res.setHeader("Content-Type", mimetype.type);
        if (mimetype.gzip) {
            res.setHeader("Content-Encoding", "gzip");
            fs.createReadStream(router).pipe(zlib.createGzip()).pipe(res);
        } else {
            fs.createReadStream(router).pipe(res);
        }
    } else {
        _404(router, req, res);
    }
}

/**
 * 
 * 
 * @param {String} router 
 * @param {http.IncomingMessage} req 
 * @param {http.OutgoingMessage} res 
 */
function _404 (router, req, res) {
    res.statusCode = 404;
    res.end("Not Found");
}