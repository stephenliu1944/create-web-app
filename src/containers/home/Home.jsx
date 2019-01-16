import styles from './home.scss';
import demoPNG from 'images/cat.png';
import React, { Component } from 'react';
import Component1 from './components/component1/Component1';
import { getIPInfo } from 'services/demo';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }
    // 初始化 state
    state = {
        users: []
    }

    componentDidMount() {
        /** 
         * HTTP Demo 
         */
        // 接口请求示例, 熟悉后请删除
        getIPInfo().then((data) => {
            
        }, (error) => {

        });
    }

    render() {
        var { users = [] } = this.state;

        return (
            <div className={styles.home}>
                首页
                {/* 图片引入示例, 熟悉后请删除 */}
                <img src={demoPNG} />
                {/* 子组件使用以及参数传递示例, 熟悉后请删除 */}
                <Component1 users={users} />
            </div>
        );
    }
}