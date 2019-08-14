var fs = require('fs');
var path = require('path');
var app = require('express')();
// var routes = require('./routes');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

var config = {
    headers: {
        'Mock-Data': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    'dataPath': '/data',
    'filePath': '/file'
};

function compareURL() {

}

function getMatchData(url, method, dataPath) {
    var files = fs.readdirSync(dataPath);
    
    if (files && files.length > 0) {
        files.sort();
        files.forEach((filename) => {
            let filePath = path.join(dataPath, filename);
            let fileStat = fs.statSync(filePath);
            
            if (fileStat.isFile()) {
                let mockData = require(filePath) || [];

                if (typeof mockData === 'object') {
                    mockData = [mockData];
                }

                let mockItem = mockData.find((item) => {
                    return compareURL(url, method, item);
                });

                if (mockItem) {
                    /*                     
                    "url": "/demo/add",
                    "mockjs": true,
                    "method": "post",
                    "response": {
                        "delay": 3000,
                        "header": {
                            
                        },
                        "body": {
                            "statusCode": 200,
                            "message": "请求成功",
                            "success": true,
                            "data": {
                                "id": "@integer(0, 10000)"
                            }
                        }
                    } 
                    */
                    var { url, mockjs, method, response: { delay, header, body } } = mockItem;

                }
                // 如果有jsonp参数，则该请求为jsonp方法，应该调用res.jsonp，不过并没有排除方法不为GET时，又传了 jsonp参数的情况
                /* var delay, mockData;
                var jsonp = res.app.get('jsonp callback name');
                var sendMethod = req.query[jsonp] ? 'jsonp' : 'send';
                var apiList = JSON.parse(data);

                for (var i = 0; i < apiList.length; i++) {
                    var api = apiList[i];
                    var apiPath = api.url;

                    if (apiPath.indexOf('/') !== 0) {
                        apiPath = '/' + apiPath;
                    }

                    if ((req.path === apiPath || checkRESTfulPath(req.path, apiPath))
                            && req.method.toLowerCase() === api.method.toLowerCase()) {

                        delay = api.delay ? api.delay : 0;
                        if (api.mockjs) {
                            mockData = mockjs.mock(api.result);
                        } else {
                            mockData = api.result;
                        }
                        break;
                    }
                }

                if (mockData) {
                    setTimeout(function() {
                        return res[sendMethod](mockData);
                    }, delay);
                } else {
                    // TODO: 没有找到匹配数据时切换到api接口, 通过 skipNotFound 参数判断是否开启此功能
                    next(new Error('Could not find mock data in ' + mockFilePath, 404));
                } */

            } else if (fileStat.isDirectory()) {
                return getMatchData(url, method, filePath);
            }
        });
    }    
}

app.use(function(req, res, next) {
    // req.path
    // 1. 解析url
    // 2. 与data目录中的文件进行匹配
    // 匹配3种情况, :xxx, xxx*, 正则匹配
    
    getMatchData(req.path, req.method, path.join(__dirname, config.dataPath));

    next();
});

app.use(function(err, req, res) {
    console.log(req.url, 404);
    res.status(404);
    res.send(err.message);
});

var server = app.listen(mock, function() {
    console.info('Mock Server listening on port ' + mock);
});

