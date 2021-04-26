import styles from './errorBoundary.less';
import React, { Component } from 'react';

interface Props {
    children: JSX.Element[] | JSX.Element
}

interface State {
    hasError: boolean,
    errorMsg: string | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: null
        };
    }

    static getDerivedStateFromError(error: { message: string }) {
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