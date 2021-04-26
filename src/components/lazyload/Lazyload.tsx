import React, { Suspense, Component } from 'react';
import Loading from 'Components/loading/Loading';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';

/**
 * @param {function} loader - 函数，返回的是import()函数动态加载的内容
 */
type Loader = () => Promise<object>;
/**
 * @property {number} loading - 路由加载中显示的组件
 * @property {number} error - 路由加载出错显示的组件
 * @property {number} delay - 防止页面闪烁的最小加载延迟
 * @property {number} timeout - 页面加载最长时间，若超过此时间则报错。注意该时间需要大于delay
 */
type Options = {
    loading?: typeof Component;
    error?: typeof Component;
    delay?: number;
    timeout?: number;
}

export default function Lazyload(loader: Loader, options: Options = {}): React.FC {
    let { loading: Spin = Loading, error: Error = ErrorBoundary, delay = 300, timeout = 1000 * 30 } = options;
    let clear = (...ids: number[]) => ids.forEach(i => window.clearTimeout(i));

    let LazyComponent = React.lazy(() => {
        let timeoutId: number = null;
        let delayId: number = null;

        return Promise.race([
            // 超时抛出reject
            new Promise<any>((resolve, reject) => {
                timeoutId = window.setTimeout(() => {
                    clear(timeoutId, delayId);
                    reject('timeout');
                }, timeout);
            }),
            // 设置延迟渲染避免白屏
            new Promise<Function>(resolve => {
                delayId = window.setTimeout(() => {
                    clear(timeoutId, delayId);
                    resolve(loader);
                }, delay);
            })
        ]).then(loader => loader()).catch(err => Promise.reject(new Error(err)));
    });

    return function WrappedComponent(props: object) {
        return (
            <Error>
                <Suspense fallback={<Spin />}>
                    <LazyComponent {...props} />
                </Suspense>
            </Error>
        );
    };
}
