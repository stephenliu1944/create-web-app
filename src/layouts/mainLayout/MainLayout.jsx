import styles from './mainLayout.less';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import lazyload from 'Components/lazyload/Lazyload';
import Header from 'Components/header/Header';
import Footer from 'Components/footer/Footer';

const Home = lazyload(() => import(/* webpackPrefetch: true */ 'Containers/home/Home'));
const NotFound = lazyload(() => import(/* webpackPrefetch: true */ 'Containers/notFound/NotFound'));

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
                        <Route exact path="/" component={Home} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}