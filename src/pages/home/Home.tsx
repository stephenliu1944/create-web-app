import styles from './home.less';
import React, { Component } from 'react';
import catPNG from './images/cat.png';
import { getUser } from './services/demo';
import { downloadFile } from 'Services/demo';
import Component1 from './components/component1/Component1';

interface Props {  
}

interface State {  
    data: object;  
}

export default class Home extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        /** 
         * 请求数据示例, 熟悉后请删除
         */
        getUser(1).then((resp: { data: object }) => {
            this.setState({
                data: resp.data
            });
        });

        /** 
         * 下载文件示例, 熟悉后请删除
         */
        // downloadFile('file').then((blob) => {                    
        //     // IE10-Edge
        //     if ('msSaveOrOpenBlob' in window.navigator) {
        //         window.navigator.msSaveOrOpenBlob(blob, 'sample.txt');
        //     // Other Browser
        //     } else {
        //         var a = document.createElement('a');
        //         a.href = window.URL.createObjectURL(blob);
        //         a.download = 'sample.txt';
        //         document.body.appendChild(a);
        //         a.click();
        //         document.body.removeChild(a);
        //     }
        // });
    }

    render() {
        var { data } = this.state;

        return (
            <div className={styles.home}>
                <h1>Home</h1>
                {/* 图片引入示例, 熟悉后请删除 */}
                <img src={catPNG} />
                {/* 子组件使用以及参数传递示例, 熟悉后请删除 */}
                <Component1 data={data} />
            </div>
        );
    }
}