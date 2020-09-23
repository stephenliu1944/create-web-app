import styles from './mainLayout.css';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'Components/header/Header';
import Footer from 'Components/footer/Footer';
import Home from 'Containers/home/Home';
import Error from 'Containers/error/Error';
/**
 * @desc 页面整体框架组件
 */
export default class MainLayout extends Component {
 
    render() {
        return (
            <div className={styles.mainLayout}>
                <Header />
                <div className={styles.container}>
                    <Switch>
                        <Redirect exact from="/" to="/home" />
                        <Route exact path="/home" component={Home} />
                        <Route path="*" component={Error} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}