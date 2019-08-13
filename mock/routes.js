var fs = require('fs');
var path = require('path');
var mockjs = require('mockjs');
var router = require('express').Router();

/**
 *
 * @param {*配置信息} conf
 * urlPattern 需要进行mock 的url前缀, 类型为：string
 * dataPath mock数据的data目录
 * shouldSkipNotFound 是否忽略没有找到mock文件？ true 的话就会交给后面的中间件接着处理，例如再代理到真实后端api之类的。
 * headers 额外添加的header 必须为对象
 *
 */
/**
 * mock 的规则是：
 * 将某个url下的所有路径映射为 dataPath 下的所有路径
 * 匹配规则是：
 * 例如 GET /user
 * 按照：
 *      /user-get.js
 *      /user.js
 *      /user-get.json
 *      /user.json
 *      /user/index-get.js
 *      /user/index.js
 *      /user/index-get.json
 *      /user/index.json
 * 的顺序进行匹配
 *
 * 其中，json 可以使用 mockjs 的规则生成随机数据
 * 具体规则参考：http://mockjs.com/
 *
 * 定制具体的接口：
 * 以上面的为例：
 * 我们可以自己写一个  /user-get.js
 * 就可以获得该url请求的全部控制权了，你可以随意的在里面设置具体的响应头，返回的内容，返回的时间，例如delay，或者超时，或者500错误之类的。
 * 甚至可以二次 mock
 * 例如：php中经常有这样的url 格式：  /index.php?module=user&action=getInfo&id=3
 * 我们只需要在 data目录中写一个 index.php.js 就可以在里面 将参数 module=user action=getInfo 重新拼装成路径格式的 地址，然后调用 res.mock(filename) 就可以重新mock啦
 *
 *
 */

function checkRESTfulPath(reqPath, apiPath) {
    if (apiPath.indexOf(':') === -1) {                // 配置不是restful url
        return false;
    }

    var path = apiPath.replace(/:\w+/g, '\\w\+')    // 把:开头的字符串替换为\w正则
        .replace(/\//g, '\\/')         // 将/替换为\/正则
        .replace(/\./g, '\\.');         // 将/替换为\/正则
    var regex = eval('/^' + path + '$/');           // 将字符串转化为正则
    return regex.test(reqPath);
}

function mockFactory(conf) {
    var dataPath = conf.dataPath;
    var urlPattern = conf.urlPattern;
    var skipNotFound = conf.skipNotFound;

    if (!dataPath && typeof dataPath !== 'string') {
        throw new Error('please specify the data path(String).');
    }
    if (!urlPattern && typeof urlPattern !== 'string') {
        throw new Error('please specify the url pattern(String).');
    }

    // 拦截urlPattern URL
    router.use(urlPattern, function(req, res, next) {
        if (conf.headers && typeof conf.headers === 'object') {
            res.set(conf.headers);
        }

        var moduleName = req.path.replace(/^\//, '')      // 移除首部的/, 如果存在.
            .replace(/^api\//, '')   // 移除首部的api/, 如果存在. 默认api表示接口调用,不是接口模块名.
            .replace(/^v(\d+\.*\d*)\//, '')
            .split('/')[0]           // 获取第一级url接口模块名
            .split('.')[0];          // 去掉.xxx后缀

        var mockFilePath = path.join(__dirname, dataPath + '/' + moduleName + '.json');

        if (fs.existsSync(mockFilePath)) {
            // TODO: 可以第一次加载文件后将文件缓存, 并且监听文件变化
            fs.readFile(mockFilePath, 'utf8', function(error, data) {
                if (error) {
                    next(new Error(error, 500));
                }
                // 如果有jsonp参数，则该请求为jsonp方法，应该调用res.jsonp，不过并没有排除方法不为GET时，又传了 jsonp参数的情况
                var delay, mockData;
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
                }
            });
        } else {
            next(new Error('File not found in ' + mockFilePath, 404));
        }
    });

    return router;
}

module.exports = mockFactory;
