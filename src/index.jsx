import 'images/favicon.ico';
import 'styles/main.scss';
import { settings, proxyHost } from '@beancommons/http';
import React from 'react';
import { render } from 'react-dom';
import Root from './routes/Root';

// 设置全局 http 默认选项。
settings({
    baseURL: __DEV__ && __DOMAIN__,
    proxyPath: __DEV__ && proxyHost,
    isDev: __DEV__
});

render(
    <Root />,
    document.getElementById('app')
);