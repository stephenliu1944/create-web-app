import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { settings } from 'http-proxy-settings';
import { define } from '@beancommons/define';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import pkg from './package.json';

const { servers, proxies, globals } = pkg.devEnvironments;

export default webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: servers.local,
        disableHostCheck: true,
        compress: true,             // 开起 gzip 压缩
        inline: true,
        historyApiFallback: true,   // browserHistory路由
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            ...settings(proxies)
        }
    },
    module: {
        rules: [{
        /**
         * eslint代码规范校验
         */
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    configFile: '.eslintrc.json'
                }
            }]
        }]
    },
    plugins: [
        // check package size
        // new BundleAnalyzerPlugin(),
        // set global variable
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env.NODE_ENV': JSON.stringify('development'),
            ...define(globals)
        })
    ]
});
