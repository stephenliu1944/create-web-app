import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from 'Components/loading/Loading';
import MainLayout from 'Layouts/mainLayout/MainLayout';
import ErrorBoundary from 'Components/errorBoundary/ErrorBoundary';

export default function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <Switch>
                    {/* 主布局 */}
                    <Route path="/" component={MainLayout} />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    );
}