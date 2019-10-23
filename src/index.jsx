import 'images/favicon.ico';
import 'styles/main.css';
import http from '@easytool/http';
import React from 'react';
import { render } from 'react-dom';
import Root from './routes/Root';

// set http default options
http.settings({
    proxyPath: __DEV__ && '/proxy',
    isDev: __DEV__
});

render(
    <Root />,
    document.getElementById('app')
);