import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import define from '@easytool/define';
import baseConfig from './webpack.config.base';
import { devEnvironments, parcels } from './package.json';

const { globals } = devEnvironments;
const parcelList = Array.isArray(parcels) ? parcels : [parcels];

function isEnabled(parcel = {}) {
    return parcel.enabled || parcel.enabled === undefined;
}

export default parcelList.filter(isEnabled).map((parcel, index) => {
    return webpackMerge(baseConfig(parcel, index === 0), {
        mode: 'production',
        optimization: {
            // 代码压缩混淆
            minimizer: [new UglifyJsPlugin({
                extractComments: true,
                sourceMap: true
            })]
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
                        configFile: '.eslintrc.prod.json'
                    }
                }]
            }]
        },
        plugins: [
            // 配置全局变量
            new webpack.DefinePlugin({
                ...define(globals, false),
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });
});
