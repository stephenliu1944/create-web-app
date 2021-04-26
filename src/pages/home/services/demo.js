import http from 'Utils/http';
import { API } from 'Constants/common';

/**
 * Home 私有接口
 */
// 通过 url 传参
export function getUser(id) {
    return http({
        url: `${API}/user/${id}`
    });
}