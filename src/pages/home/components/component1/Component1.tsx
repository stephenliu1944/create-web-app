import styles from './component1.less';
import React from 'react';

/** 
 * 示例代码, 熟悉后请删除
 */
export default function Component1({ data = {} }) {
    
    return (
        <div className={styles.component1}>
            <h1>Subcomponent</h1>
            <ul>
                { data && Object.entries(data).map(([key, value]) => <li key={key}>{key}: {value}</li>) }
            </ul>
        </div>
    );
}