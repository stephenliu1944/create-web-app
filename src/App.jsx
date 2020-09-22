import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/mainLayout/MainLayout';

export default function App() {
    return (
        <Switch>
            {/* 主布局 */}
            <Route path="/" component={MainLayout} />
        </Switch>
    );
}