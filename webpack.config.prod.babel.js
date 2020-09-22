import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import defineConfig from '@easytool/define-config';
import baseConfig from './webpack.config.base';
import { name, devEnvironments, parcel } from './package.json';

const { globals } = devEnvironments;
const { format = 'zip' } = parcel;

export default webpackMerge(baseConfig(), {
    mode: 'production',
    devtool: 'hidden-source-map',           // 在本地生成sourceMap, 调试时需要搭配Chrome DevTools关联本地sourceMap.
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true             // 是否支持sourceMap, 不是生成sourceMap
            }),
            new OptimizeCSSAssetsPlugin()
        ]
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
            ...defineConfig(globals, false)             // 'false'表示所有自定义全局变量的值设为 false
        })
    ].concat(process.env.NODE_ENV === 'package' ? [
        new FileManagerPlugin({
            onStart: [{
                delete: ['./dist']
            }],
            onEnd: [{
                copy: [{ 
                    source: './build', 
                    destination: `./dist/${name}`
                }],
                archive: [{ 
                    source: './dist', 
                    destination: `./dist/${name}.${format}`,
                    format: format
                }]
            }]
        })
    ] : [])
});