import styles from './errorBoundary.less';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: '页面加载出错'
        };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true, errorMsg: error.message };
    }

    // componentDidCatch (error, errorInfo) {
    //     // 你同样可以将错误日志上报给服务器
    //     logErrorToMyService(error, errorInfo);
    // }

    render() {
        let { hasError, errorMsg } = this.state;

        if (hasError !== false) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <p className={styles.errorBoundary}>{errorMsg}</p>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
};