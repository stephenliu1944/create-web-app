import styles from './component1.css';
import React, { Component } from 'react';

/** 
 * 示例代码, 熟悉后请删除
 */
export default class Component1 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var { region = {} } = this.props;

        return (
            <div className={styles.component1}>
                <h1>Subcomponent</h1>
                <ul>
                    { region && Object.entries(region).map(([key, value]) => <li key={key}>{key}: {value}</li>) }
                </ul>
            </div>
        );
    }
}