import styles from './error.scss';
import React, { Component } from 'react';

export default class Error extends Component {

    render() {
        return (
            <div className={styles.error}>
                错误页面
            </div>
        );
    }
}