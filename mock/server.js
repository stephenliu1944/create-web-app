var fs = require('fs');
var path = require('path');
var app = require('express')();
var settings = require('./settings');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

// 将路径语法转为正则表达式, 支持以下语法:
// :id, 匹配任意数字, 英文, 下划线, 中横线, 句号, 如: '/user/:name', matches /user/michael and /user/ryan
// *,   匹配任意数字, 英文, 下划线, 中横线, 如: '/files/*.*', matches /files/hello.jpg and /files/hello.html
// **,  匹配任意数字, 英文, 下划线, 中横线, 句号, 斜杠, 如: '/**/*.jpg', matches /files/hello.jpg and /files/path/to/file.jpg
function convertPathSyntaxToReg(pathSyntax) {
    var reg = pathSyntax.replace(/\//g, '\\/')  // / 替换为 \/ 
        .replace(/\./g, '\\.')                  // . 替换为 \. 
        .replace(/\*{2,}/g, '[\\w-\.\/]\+')     // 1个以上的 * 替换为 "\w-\.\/", 可跨层级.           
        .replace(/\*/g, '[\\w-]\+')             // 1个 * 替换为 "\w-", 不可跨层级.      
        .replace(/:[\w-\.]+/g, '[\\w-\.]\+');   // : 开头的字符串替换为 "\w-\.", 不可跨层级.      
    
    return eval('/^' + reg + '$/');             // 字符串转化为正则表达式
}

function isMatchingData(reqURL, reqMethod, item = {}) {
    var { baseURL, url, method } = item;

    // TODO: 对比 baseURL

    if (method && method.toLowerCase() !== reqMethod.toLowerCase()) {
        return false;
    }

    // 移除开头和末尾的 "/"
    reqURL = reqURL.replace(/^\//, '')
        .replace(/\/$/, '');
    // 移除开头和末尾的 "/"
    url = url.replace(/^\//, '')
        .replace(/\/$/, '');

    var reg = convertPathSyntaxToReg(url);

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

