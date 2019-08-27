const http = require('http');

function LExpress() {
    this.stacks = [];
}

function createLExpress() {
    return new LExpress;
}

LExpress.prototype.listen = function(port, host, callback) {
    http.createServer((req, res) => {
        this.run(req, res);
    }).listen({
        port,
        host
    }, callback);
}

LExpress.prototype.use = function(maybeRoute, maybeFn) {
    let fn, route;
    if (typeof maybeRoute === 'function') {
        fn = maybeRoute;
        route = '*';
    } else {
        fn = maybeFn;
    }
    this.stacks.push({
        method: '*',
        route,
        fn
    });
}

LExpress.prototype.get = function(route, fn) {
    this.stacks.push({
        method: 'GET',
        route,
        fn
    });
}

LExpress.prototype.run = function(req, res) {
    const fnStacks = this.getUsefulStacks(req);
    let stackIndex = -1;
    const next = () => {
        stackIndex++;
        const stackFn = fnStacks[stackIndex];
        if (stackFn) {
            stackFn(req, res, next);
        }
    }
    next();
}

LExpress.prototype.getUsefulStacks = function(req) {
    const method = req.method;
    const route = req.url.split('?')[0];
    const stacks = [];
    for (let i = 0; i < this.stacks.length; i++) {
        const stack = this.stacks[i];
        const fn = stack.fn;
        if (stack.method === '*' && stack.route === '*') {
            stacks.push(fn);
            continue;
        }

        if (stack.method === '*' && stack.route === route) {
            stacks.push(fn);
            continue;
        }

        if (stack.route === '*' && stack.method === method) {
            stacks.push(fn);
            continue;
        }

        if (stack.method === method && stack.route === route) {
            stacks.push(fn);
            continue;
        }
    }

    return stacks;
}

module.exports = createLExpress;