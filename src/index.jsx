import 'Images/favicon.ico';
import 'Styles/main.css';
import http from '@easytool/http';
import React from 'react';
import { render } from 'react-dom';
import Root from 'Routes/Root';

// set http default options
http.settings({
    proxyPath: __DEV__ && '/proxy',
    isDev: __DEV__
});

render(
    <Root />,
    document.getElementById('app')
);