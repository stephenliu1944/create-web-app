/**
 * http请求全局配置
 */
export default {
    isDev: __DEV__,                     // 显示 请求,响应 的日志
    proxyPath: __DEV__,                 // 代理根路径
    // validateStatus(status: number): boolean {            // 默认有效的状态码
    //     return status >= 200 && status < 500;
    // },
    // beforeRequest(resolve, reject, options) {},          // 拦截请求
    afterResponse(resolve: Function, reject: Function, response: {data: object, status: number}, options: object) {     // 拦截响应
        let { data, status } = response;

        switch (status) {
            case 200:   // continue to process.
                resolve(data);
                break;
            case 401:   // need log in
                reject(response);
                // setTimeout(() => {
                //     location.href = `http://sso.xxx.com/login?callback=${encodeURIComponent(location.href)}`;
                // }, 0);
                break;
            default:   // throw a error.
                reject(response);
                break;
        }
    }
    // onError(config, request, response, message, stack) {}    // 拦截错误
};

// 更多配置参考: https://www.npmjs.com/package/@easytool/http