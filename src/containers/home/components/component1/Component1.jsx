import styles from './component1.scss';
import React, { Component } from 'react';

export default class Component1 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var { users = [] } = this.props;

        return (
            <div className={styles.component1}>
                <h1>我是子组件</h1>
                {/* 数据展示示例, 熟悉后请删除 */}
                <ul>
                    {
                        users.map((user) => {
                            return (
                                <li key={user.id}>
                                    id: {user.id}, name: {user.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}