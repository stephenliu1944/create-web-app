import http from '@beancommons/http';
import { HttpMethod } from 'constants/common';

// 通过 url 传参
export function getUserById(id) {
    return http({
        url: `/users/${id}`
    });
}
// 通过 post data传参
export function addUser(user) {
    return http({
        url: '/user',
        method: HttpMethod.POST,
        data: {
            user
        }
    });
}
// 通过 get ?param1=xx&param2=xx 传参
export function getIPInfo(ip) {
    return http({
        url: '/service/getIpInfo.php',
        params: {
            ip
        }
    });
}