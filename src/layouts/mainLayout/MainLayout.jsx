import styles from './mainLayout.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'Components/header/Header';
import Footer from 'Components/footer/Footer';
/**
 * @desc 页面整体框架组件
 */
export default class MainLayout extends Component {
 
    render() {
        return (
            <div className={styles.mainLayout}>
                <Header />
                <div className={styles.content}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: PropTypes.any
};