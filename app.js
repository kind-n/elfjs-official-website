"use strict";

const fs   = require("fs");
const http = require("http");
const path = require("path");
const zlib = require("zlib");


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
    }
};

const URL_ROBOTS  = /^\/robots\.txt/i;
const URL_SITEMAP = /^\/sitemap\.xml/i;
const URL_FAVICON = /^\/favicon\.ico/i;

const URL_BACK    = /^\/api\//i;
const URL_FORE    = /^\/fore\//i;
const URL_VIEW    = /^\/[^\/]+\.html/i;

const URL_TRIM    = /[\?#].*$/;

http.createServer(function (req, res) {

    const url = req.url.replace(URL_TRIM, "");

    if (url === "/") {
        return main(req, res);
    }

    if (URL_ROBOTS.test(url)) {
        return robots(req, res);
    }

    if (URL_SITEMAP.test(url)) {
        return sitemap(req, res);
    }
    
    if (URL_FAVICON.test(url)) {
        return favicon(req, res);
    }

    if (URL_BACK.test(url)) {
        return back(req, res);
    }

    if (URL_FORE.test(url)) {
        return fore(req, res);
    }

    if (URL_VIEW.test(url)) {
        return view(req, res);
    }

    res.statusCode = 404;
    res.end("Not Found");


}).listen(8080);

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function main (req, res) {
    res.writeHead(301, {
        Location: "/home.html"
    });
    res.end();
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function robots (req, res) {
    res.statusCode = 404;
    res.end();
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function sitemap (req, res) {
    res.statusCode = 404;
    res.end();
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function favicon (req, res) {
    res.statusCode = 404;
    res.end();
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function back (req, res) {
    res.statusCode = 404;
    res.end();
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function fore (req, res) {
    const url = path.join(__dirname, req.url.replace(URL_TRIM, ""));
    const ext = path.extname(url).toLowerCase();
    if (fs.existsSync(url) &&
        fs.statSync(url).isFile()) {
        
        var mime = MIME_TYPE[ext] || TEXT_TYPE;
        res.setHeader("Content-Type", mime.type);
        if (mime.gzip) {
            res.setHeader("Content-Encoding", "gzip");
            fs.createReadStream(url).pipe(zlib.createGzip()).pipe(res);
        } else {
            fs.createReadStream(url).pipe(res);
        }
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res
 */
function view (req, res) {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.setHeader("Content-Encoding", "gzip");
    fs.createReadStream(
        path.join(__dirname, "./main.html")
    ).pipe(zlib.createGzip()).pipe(res);
}