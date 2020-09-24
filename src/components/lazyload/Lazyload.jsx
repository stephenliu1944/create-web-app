import React from 'react';

/**
 * @param {function} loader - 函数，返回的是import()函数动态加载的内容
 * @param {object} options - 可选配置
 * @property {number} delay - 防止页面闪烁的最小加载延迟
 * @property {number} timeout - 页面加载最长时间，若超过此时间则报错。注意该时间需要大于delay
 * @returns
 */
export default function Lazyload(loader, options = {}) {
    let { delay = 300, timeout = 1000 * 30 } = options;
    let clear = (...ids) => ids.forEach(i => clearTimeout(i));
    
    // 返回一个 LazyComponent 组件
    return React.lazy(() => {
        let timeoutId = null;
        let delayId = null;

        return Promise.race([
            new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    reject('timeout');
                }, timeout);
            }),
            new Promise(resolve => {
                delayId = setTimeout(() => {
                    clear(timeoutId, delayId);
                    resolve(loader);
                }, delay);
            })
        ]).then(loader => loader()).catch(error => Promise.reject(new Error(error)));
    });
}