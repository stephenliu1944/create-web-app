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

function convertPathToRegEx(path) {
    var path = apiPath.replace(/:[\w-\.]+/g, '[\\w-\.]\+')                  // 把 : 开头的字符串替换为 \w- 正则     
                      .replace(/\//g, '\\/')                                 // 将 / 替换为 \/ 正则
                      .replace(/\./g, '\\.')                                 // 将 . 替换为 \. 正则
                      .replace(/\*{2,}/, '\\.\+')                           // 将 * 替换为 \w- 正则     
                      .replace(/\*/, '[\\w-]\+');                           // 将 * 替换为 \w- 正则     
        
    return eval('/^' + path + '$/');                           // 将字符串转化为正则
}

function comparePathSyntax(reqURL, apiPath) {
    if (apiPath.indexOf(':') === -1) {                // 配置不是restful url
        return false;
    }

    var path = apiPath.replace(/:\w+/g, '\\w\+')        // 把:开头的字符串替换为\w正则
        .replace(/\//g, '\\/')                      // 将/替换为\/正则
        .replace(/\./g, '\\.');                         // 将/替换为\/正则
    var regex = eval('/^' + path + '$/');           // 将字符串转化为正则
    return regex.test(reqURL);
}

// 匹配3种情况 :xxx, xxx*, 正则匹配
function compareURL(reqURL, reqMethod, item = {}) {
    var { url, method } = item;

    if (method && method.toLowerCase() !== reqMethod.toLowerCase()) {
        return false;
    }

    reqURL = reqURL.replace(/^\//, '')
                   .replace(/\/$/, '');
    
    url = url.replace(/^\//, '')
             .replace(/\/$/, '');

    if (reqURL.toLowerCase() === url.toLowerCase()) {
        return true;
    }

    if () {

    }
/*                     
    "url": "/demo/add",
    "method": "post",
    "response": {
        "delay": 3000,
        "status": 200, 
        "headers": {
            
        },
        "data": {
            "statusCode": 1
*/
}

function handleFile(filePath, url, method) {
    let mockData = require(filePath) || [];

    if (typeof mockData === 'object') {
        mockData = [mockData];
    }

    return mockData.find((item) => {
        return compareURL(url, method, item);
    });
}

function searchMatchingData(url, method, dataPath) {
    var files = fs.readdirSync(dataPath);
    
    if (files && files.length > 0) {
        // 文件名排个序
        files.sort();
        for (let i = 0; i < files.length; i++) {
            let filename = files[i];
            let filePath = path.join(dataPath, filename);
            let fileStat = fs.statSync(filePath);
            
            if (fileStat.isFile()) {
                let matchingData = handleFile(filePath, url, method);
                // 如果找到了则返回, 未找到继续递归查找.
                if (matchingData) {
                    return matchingData;
                }
            } else if (fileStat.isDirectory()) {
                // 继续递归
                return searchMatchingData(url, method, filePath);
            }
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
        });
    }    
}

app.use(function(req, res, next) {
    var mockDataPath = path.join(__dirname, config.dataPath);
    // 从 mock 数据源中找到匹配的数据
    var data = searchMatchingData(req.path, req.method, mockDataPath);

    if (data) {
        /*                     
            "url": "/demo/add",
            "method": "post",
            "response": {
                "delay": 3000,
                "status": 200, 
                "headers": {
                    
                },
                "data": {
                    "statusCode": 1000,
                    "message": "请求成功",
                    "success": true,
                    "data": {
                        "id": "@integer(0, 10000)"
                    }
                }
            } 
        */
        var { url, mockjs, method, response: { delay, header, body } } = mockItem;
            
        // 根据data配置返回response
    } else {
        next();
    }
});

app.use(function(err, req, res) {
    console.log(req.url, 404);
    res.status(404);
    res.send(err.message);
});

var server = app.listen(mock, function() {
    console.info('Mock Server listening on port ' + mock);
});

