import path from 'path';
import webpackMerge from 'webpack-merge';
import proxyConfig from '@easytool/proxy-config';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { devEnvironments, parcel } from './package.json';
import baseConfig, { getPublicPath } from './webpack.config.base';

const { server, proxy } = devEnvironments;

export default webpackMerge(baseConfig('development'), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        host: '0.0.0.0',
        port: server.local,
        https: false,
        inline: true,
        compress: true,             // 开起 gzip 压缩
        disableHostCheck: true,
        historyApiFallback: {       // browserHistory路由
            index: getPublicPath(parcel.publicPath)
        },   
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            ...proxyConfig(proxy)
        }
    },
    plugins: [
        // 依赖包大写分析
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin()
    ]
});
