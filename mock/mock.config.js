var pkg = require('../package.json');

const { server } = pkg.devEnvironments;
const mock = server.mock;
const port = mock.port || mock;
const proxy = mock.proxy;

module.exports = {
    port: port,
    proxy: proxy
};