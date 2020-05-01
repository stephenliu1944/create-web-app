import React, { Component } from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import MainLayout from 'Layouts/mainLayout/MainLayout';
import Home from 'Containers/home/Home';
import Error from 'Containers/error/Error';

export default class Root extends Component {
    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/" component={MainLayout}>
                    <IndexRedirect to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="*" component={Error} />
                </Route>
            </Router>
        );
    }
}