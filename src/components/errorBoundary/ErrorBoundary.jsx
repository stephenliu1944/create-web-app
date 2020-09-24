import styles from './errorBoundary.less';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // componentDidCatch (error, errorInfo) {
    //     // 可以将错误日志上报给服务器
    //     logErrorToMyService(error, errorInfo);
    // }

    render() {
        let { hasError } = this.state;

        if (hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <p className={styles.errorBoundary}>页面加载出错</p>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
};