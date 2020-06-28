import styles from './footer.css';
import React, { Component } from 'react';

/**
 * @desc 页面底部组件
 */
export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.footer}>
                <h1>Footer</h1>
            </div>
        );
    }
}
