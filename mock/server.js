// server.js
var path = require('path');
var jsonServer = require('json-server');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data/db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
    res.jsonp({
        body: res.locals.data
    });
};

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
  
// Use default router
server.use(router);
server.listen(mock, () => {
    console.log('Mock Server is running');
});