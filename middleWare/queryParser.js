function getParamsFromQuery(query) {
    const paramList = query.split('&');
    const params = {};
    for (let i = 0; i < paramList.length; i++) {
        const param = paramList[i];
        const key = param.split('=')[0];
        const value = param.split('=')[1];
        params[key] = value;
    }
    return params;
}

const queryParser = (config) => {
    return (req, res, next) => {
        const query = req.url.split('?')[1];
        if (!query) {
            return next();
        }
        req.queryParams = getParamsFromQuery(query);
        next();
    }
}

module.exports = queryParser;