var app = require('express')();
var routes = require('./routes');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

app.use(routes({
    headers: {
        'Mock-Data': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    'urlPattern': '/',
    'dataPath': '/data',
    'skipNotFound': false
}));

app.use(function(err, req, res) {
    console.log(req.url, 404);
    res.status(404);
    res.send(err.message);
});

var server = app.listen(mock, function() {
    console.info('Mock Server listening on port ' + PORT);
});

