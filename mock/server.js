var fs = require('fs');
var path = require('path');
var app = require('express')();
var settings = require('./settings');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

/** 
 * 将路径语法转为正则表达式, 支持以下语法
 * :id,
 * *,
 * **,
 */
function convertPathSyntaxToReg(pathSyntax) {
    var reg = pathSyntax.replace(/:[\w-\.]+/g, '[\\w-\.]\+')  // : 开头的字符串替换为 \w-\. 正则     
        .replace(/\*{2,}/g, '\.\+')           // 多个 * 替换为 . 正则     
        .replace(/\*/g, '[\\w-\.]\+')         // 单个 * 替换为 \w-\. 正则     
        .replace(/\//g, '\\/')                // / 替换为 \/ 正则
        .replace(/\./g, '\\.');               // . 替换为 \. 正则
    
    console.log('reg:', reg);
    
    return eval('/^' + reg + '$/');                           // 将字符串转化为正则
}

// url: '/hello/:name', matches /hello/michael and /hello/ryan
// url: '/files/*.*',   matches /files/hello.jpg and /files/hello.html
// url: '/**/*.jpg',    matches /files/hello.jpg and /files/path/to/file.jpg
function isMatchingData(reqURL, reqMethod, item = {}) {
    var { url, method } = item;

    if (method && method.toLowerCase() !== reqMethod.toLowerCase()) {
        return false;
    }

    reqURL = reqURL.replace(/^\//, '')
        .replace(/\/$/, '');
    
    url = url.replace(/^\//, '')
        .replace(/\/$/, '');

    var reg = convertPathSyntaxToReg(url);
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
        return isMatchingData(url, method, data);
    });
}

function searchMatchingData(url, method, dataPath) {
    var files = fs.readdirSync(dataPath);
    
    if (files && files.length > 0) {
        // 文件名排个序
        files.sort();
        // 遍历所有 mock 数据
        for (let i = 0; i < files.length; i++) {
            let filename = files[i];
            let filePath = path.join(dataPath, filename);
            let fileStat = fs.statSync(filePath);
            
            // 是文件则对比请求与文件中的 mock 数据是否匹配
            if (fileStat.isFile()) {
                let matchingData = getMatchingData(filePath, url, method);
                // 如果找到了则返回, 未找到继续递归查找.
                if (matchingData) {
                    return matchingData;
                }
            // 是目录则继续递归
            } else if (fileStat.isDirectory()) {
                return searchMatchingData(url, method, filePath);
            }
        }
    }    
}

app.use(function(req, res, next) {
    var mockDataPath = path.join(__dirname, settings.dataPath);
    // 从 mock 数据源中找到匹配的数据
    var mockData = searchMatchingData(req.path, req.method, mockDataPath);

    if (mockData) {
        var { delay = 0, status = 200, headers = {}, body } = mockData.response || {};

        setTimeout(function() {
            if (headers) {
                res.set(Object.assign({}, settings.headers, headers));
            }
            res.status(status);

            // body 类型为 string 并且以 .xxx 结尾( 1 <= x <= 5), 代表是文件路径.
            if (/\.\w{1,5}$/.test(body)) {
                // 发送文件
                res.sendFile(body, {
                    root: path.join(__dirname, settings.filePath)
                }, function(err) {
                    err && next(err);
                });
            } else {
                res.send(body);
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

