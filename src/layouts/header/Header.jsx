/**
 * created by caoyan in 2017/10/16
 */
import styles from './header.scss';
import React, { Component } from 'react';
/**
 * @desc 页面顶部组件
 */
export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.header}>
                <h1>Header</h1>
            </div>
        );
    }
}
