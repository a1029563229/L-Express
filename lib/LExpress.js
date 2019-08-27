const http = require('http');

function LExpress() {}

function createLExpress() {
    return new LExpress;
}

LExpress.prototype.listen = function(port, host, callback) {
    http.createServer((req, res) => {
        this.use(req, res);
    }).listen({
        port,
        host
    }, callback);
}

LExpress.prototype.use = function(req, res) {
    console.log(req);
    res.end('Hello World');
}

LExpress.prototype.get = function(req, res) {

}

module.exports = createLExpress;