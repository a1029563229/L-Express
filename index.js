const app = require('./app');

const HOST = '0.0.0.0';
const PORT = 3600;

app.listen(PORT, HOST, () => {
    console.log(`server is listening in http://${HOST}:${PORT}`);
});