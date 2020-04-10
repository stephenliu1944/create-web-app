import styles from './component1.scss';

export default function Component1() {
    return `
        <div class=${styles.component1}>
            <h3>Component1</h3>
            <h3>我是子组件</h3>
        </div>
    `;
}