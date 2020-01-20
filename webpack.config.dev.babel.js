import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { settings } from '@easytool/proxy-config';
import define from '@easytool/define-config';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import { devEnvironments } from './package.json';

const { servers, proxies, globals, build } = devEnvironments;

export default webpackMerge(baseConfig(build), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: servers.local,
        https: build.https,
        inline: true,
        compress: true,             // 开起 gzip 压缩
        disableHostCheck: true,
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
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            ...define(globals),
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
