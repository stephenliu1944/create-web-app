import styles from './home.css';
import React, { Component } from 'react';
import catPNG from './images/cat.png';
import { getIPInfo } from './services/demo';
import Component1 from './components/component1/Component1';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: null
        };
    }

    componentDidMount() {
        /** 
         * 接口请求示例, 熟悉后请删除
         */
        getIPInfo('210.75.225.254').then(({ data }) => {
            this.setState({
                region: data
            });
        }, (error) => {
            console.error(error);
        });
    }

    render() {
        var { region } = this.state;

        return (
            <div className={styles.home}>
                <h1>Home</h1>
                {/* 图片引入示例, 熟悉后请删除 */}
                <img src={catPNG} />
                {/* 子组件使用以及参数传递示例, 熟悉后请删除 */}
                <Component1 region={region} />
            </div>
        );
    }
}