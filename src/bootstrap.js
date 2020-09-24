import 'Images/favicon.ico';
import 'Styles/main.less';
import http from 'Utils/http';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// set http default options
http.settings({
    proxyPath: __DEV__ && '/proxy',     // 代理根路径
    isDev: __DEV__                      // 显示请求,响应日志
});

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);