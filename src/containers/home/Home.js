import styles from './home.css';
import catPNG from './images/cat.png';
import Component1 from './components/component1/Component1';
import { getIPInfo } from 'services/demo';

export default function Home() {
    /** 
     * 接口请求示例, 熟悉后请删除
     */
    getIPInfo('210.75.225.254').then(({ data }) => {
        
    }, (error) => {
        console.error(error);
    });

    return `
        <div class=${styles.home}>
            <h1>Home</h1>
            <h1>我是容器组件</h1>
            <img src=${catPNG} /> 
            ${Component1()}
        </div>
    `;
}