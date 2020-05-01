import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import defineConfig from '@easytool/define-config';
import baseConfig from './webpack.config.base';
import { devEnvironments, parcels } from './package.json';

const { globals } = devEnvironments;
const ParcelList = Array.isArray(parcels) ? parcels : [parcels];

function isEnabled(parcel = {}) {
    return parcel.enabled || parcel.enabled === undefined;
}

export default ParcelList.filter(isEnabled).map(config => {
    var { sourceMap } = config;

    return webpackMerge(baseConfig(config), {
        mode: 'production',
        devtool: typeof sourceMap === 'string' ? sourceMap : sourceMap && 'source-map',
        optimization: {
            // 代码压缩混淆
            minimizer: [new UglifyJsPlugin({
                extractComments: true,
                sourceMap: true             // 是否支持sourceMap, 不是开起sourceMap
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
                ...defineConfig(globals, false),
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });
});
