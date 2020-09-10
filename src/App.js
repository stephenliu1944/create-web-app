import 'Images/favicon.ico';
import 'Styles/main.css';
import http from '@easytool/http';
import Home from 'Containers/home/Home';
import MainLayout from './layouts/mainLayout/MainLayout';
import { render } from 'Utils/dom';

// set http default options
http.settings({
    proxyPath: __DEV__ && '/proxy',
    isDev: __DEV__
});

render(
    MainLayout(Home),
    document.getElementById('app')
);