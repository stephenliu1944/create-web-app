import http, { prepare } from '@easytool/http';
import { HttpMethod } from 'Constants/common';

/**
 * 公共接口
 */
// 通过 post data 传参
export function addUser(user) {
    return http({
        url: '/user',
        method: HttpMethod.POST,
        data: {
            user
        }
    });
}
// 返回一个预请求对象
export function uploadURL(user) {
    return prepare({
        url: '/upload',
        params: {
            user
        }
    });
}

