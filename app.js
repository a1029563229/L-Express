const express = require('./lib/LExpress');
const queryParser = require('./middleWare/queryParser');

const app = express();

app.use(queryParser());
app.get('/', (req, res) => {
    console.log(req.queryParams);
    res.end('Dove');
});

module.exports = app;