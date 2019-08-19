var fs = require('fs');
var path = require('path');
var app = require('express')();
// var routes = require('./utils');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

var config = {
    headers: {
        'Mock-Data': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    dataPath: '/data',
    filePath: '/files'
};

function convertPathToRegEx(path) {
    var path = apiPath.replace(/:[\w-\.]+/g, '[\\w-\.]\+')                  // : 开头的字符串替换为 \w- 正则     
        .replace(/\//g, '\\/')                                // / 替换为 \/ 正则
        .replace(/\./g, '\\.')                                // . 替换为 \. 正则
        .replace(/\*{2,}/g, '\.\+')                           // 多个 * 替换为 . 正则     
        .replace(/\*/g, '[\\w-]\+');                          // 单个 * 替换为 \w- 正则     
    
    console.log('path:', path);
    
    return eval('/^' + path + '$/');                                        // 将字符串转化为正则
}

// 匹配3种情况 :xxx, xxx*, 正则匹配
function compareMockData(reqURL, reqMethod, item = {}) {
    var { url, method } = item;

    if (method && method.toLowerCase() !== reqMethod.toLowerCase()) {
        return false;
    }

    reqURL = reqURL.replace(/^\//, '')
        .replace(/\/$/, '');
    
    url = url.replace(/^\//, '')
        .replace(/\/$/, '');

    var reg = convertPathToRegEx(url);
    console.log('reg: ', reg);

    if (reqURL.toLowerCase() === url.toLowerCase() 
        || reg.test(reqURL)) {
        return true;
    }

    return false;
}

function getMatchingData(filePath, url, method) {
    let mockData = require(filePath) || [];

    if (typeof mockData === 'object' && !Array.isArray(mockData)) {
        mockData = [mockData];
    }

    return mockData.find((data) => {
        return compareMockData(url, method, data);
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
                let matchingData = getMatchingData(filePath, url, method);
                // 如果找到了则返回, 未找到继续递归查找.
                if (matchingData) {
                    return matchingData;
                }
            } else if (fileStat.isDirectory()) {
                // 继续递归
                return searchMatchingData(url, method, filePath);
            }
        }
    }    
}

app.use(function(req, res, next) {
    var mockDataPath = path.join(__dirname, config.dataPath);
    // 从 mock 数据源中找到匹配的数据
    var mockData = searchMatchingData(req.path, req.method, mockDataPath);

    if (mockData) {
        var { delay = 0, status = 200, headers = {}, data } = mockData.response || {};

        setTimeout(function() {
            if (headers) {
                res.set(Object.assign({}, config.headers, headers));
            }
            res.status(status);

            if (typeof data === 'string') {
                // 发送文件
                res.sendFile(data, {
                    root: path.join(__dirname, config.filePath)
                    // headers: Object.assign({}, config.headers, headers)
                }, function(err) {
                    if (err) {
                        next(err);
                    } else {
                        console.log('Sent:', data);
                    }
                });
            } else {
                res.send(data);
            }
        }, delay);
    } else {
        next();
    }
});

app.use(function(err, req, res, next) {
    console.log(req.url, 404);
    res.status(404);
    res.send(err.message);
});

var server = app.listen(mock, function() {
    console.info('Mock Server listening on port ' + mock);
});

