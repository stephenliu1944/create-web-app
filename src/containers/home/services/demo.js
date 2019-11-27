import http from '@easytool/http';

/**
 * Home 私有接口
 */
// 通过 url 传参
export function getIPInfo(ip) {
    return http({
        url: `/json/${ip}`
    });
}
// 通过 url params 传参
export function getIPInfoByFields(fields) {
    return http({
        url: '/json/24.48.0.1',
        params: {
            fields
        }
    });
}