import 'Images/favicon.ico';
import 'Styles/main.css';
import http from '@easytool/http';
import React from 'react';
import { render } from 'react-dom';
import Root from 'Routes/Root';

// set http default options
http.settings({
    proxyPath: __DEV__ && '/proxy',     // 代理根路径
    isDev: __DEV__                      // 显示请求,响应日志
});

render(
    <Root />,
    document.getElementById('app')
);