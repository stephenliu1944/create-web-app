import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from '../layouts/Layout';
import Home from '../containers/home/Home';
import Error from '../containers/error/Error';

export default class Root extends Component {
    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/" component={Layout}>
                    <IndexRoute component={Home} />
                    <Route path="*" component={Error} />
                </Route>
            </Router>
        );
    }
}