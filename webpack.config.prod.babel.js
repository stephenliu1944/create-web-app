import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
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
    var useSourceMap = !!sourceMap;
    var sourceMapType = typeof sourceMap === 'string' ? sourceMap : 'source-map';

    return webpackMerge(baseConfig(config), {
        mode: 'production',
        devtool: useSourceMap && sourceMapType,
        optimization: {
            minimizer: [
                new TerserPlugin({
                    sourceMap: useSourceMap     // 是否支持sourceMap, 不是生成sourceMap
                }),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        module: {
            rules: [{
                /**
                 * eslint代码规范校验
                 */
                test: /\.(js)$/,
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
                ...defineConfig(globals, false)
            })
        ]
    });
});
