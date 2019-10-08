import styles from './layout.css';
import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
/**
 * @desc 页面整体框架组件
 */
export default class Layout extends Component {
 
    render() {
        return (
            <div className={styles.layout}>
                <Header />
                <div className={styles.content}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
