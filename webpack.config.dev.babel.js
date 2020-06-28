import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import proxyConfig from '@easytool/proxy-config';
import defineConfig from '@easytool/define-config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import { devEnvironments } from './package.json';

const { servers, proxies, globals } = devEnvironments;

export default webpackMerge(baseConfig(), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        host: '0.0.0.0',
        port: servers.local,
        https: false,
        inline: true,
        compress: true,             // 开起 gzip 压缩
        disableHostCheck: true,
        historyApiFallback: true,   // browserHistory路由
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            ...proxyConfig(proxies)
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
        // 清除编译目录
        new CleanWebpackPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            ...defineConfig(globals),
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
