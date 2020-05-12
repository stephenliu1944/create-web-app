import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const BUILD = 'build';
const ASSETS = 'assets';

export default function(config) {
    const { name = '', title, basePath } = config;
    const PROJECT_NAME = name ? name.replace(/^\/*/, '/').replace(/\/*$/, '') : '';          // dev 环境没有 name
    const BASE_PATH = basePath ? basePath.replace(/^\/*/, '').replace(/\/*$/, '/') : '';
    const BUILD_PATH = BUILD + PROJECT_NAME;             
    const ASSETS_PATH = BASE_PATH + ASSETS;             
    const FILE_HASH = process.env.NODE_ENV === 'production' ? '.[contenthash:8]' : '';

    return {
        entry: {
            main: ['./src/index.jsx']
        },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, BUILD_PATH),
            filename: `${ASSETS_PATH}/js/[name]${FILE_HASH}.js`,
            chunkFilename: `${ASSETS_PATH}/js/[name].chunk${FILE_HASH}.js`
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.less', '.scss'],
            alias: {
                Components: path.resolve(__dirname, 'src/components/'),
                Config: path.resolve(__dirname, 'src/config/'),
                Constants: path.resolve(__dirname, 'src/constants/'),
                Containers: path.resolve(__dirname, 'src/containers/'),
                Fonts: path.resolve(__dirname, 'src/fonts/'),
                Images: path.resolve(__dirname, 'src/images/'),
                Layouts: path.resolve(__dirname, 'src/layouts/'),
                Routes: path.resolve(__dirname, 'src/routes/'),
                Services: path.resolve(__dirname, 'src/services/'),
                Styles: path.resolve(__dirname, 'src/styles/'),
                Utils: path.resolve(__dirname, 'src/utils/')
            }
        },
        optimization: {
            splitChunks: {
                minSize: 10,
                minChunks: 1,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            noEmitOnErrors: true
        },
        module: {
            // TODO: oneOf[]
            rules: [{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            }, {
                /**
                 * 主项目的css
                 */
                test: /\.(css|less|scss)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]__[hash:base64:5]',
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    'postcss-loader'
                    // 'less-loader'
                    // 'sass-loader'
                ]
            }, {
                /**
                 * 第三方组件的css.
                 */
                test: /\.css$/,
                include: path.resolve(__dirname, 'node_modules'),
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                /**
                 * 字体加载器
                 */
                test: /\.(woff|eot|ttf|svg)$/,
                include: path.resolve(__dirname, 'src/fonts'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${ASSETS_PATH}/fonts/[name]${FILE_HASH}.[ext]`
                    }
                }]
            }, {
                /**
                 * 图片加载器
                 */
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: path.resolve(__dirname, 'src/fonts'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${ASSETS_PATH}/images/[name]${FILE_HASH}.[ext]`
                    }
                }]
            }, {
                test: /\.ico$/,
                include: path.resolve(__dirname, 'src/images'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${ASSETS_PATH}/images/[name].[ext]`
                    }
                }]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${ASSETS_PATH}/css/[name]${FILE_HASH}.css`,
                chunkFilename: `${ASSETS_PATH}/css/[name].chunk${FILE_HASH}.css`   // chunk css file
            }),
            // index.html 模板插件
            new HtmlWebpackPlugin({                             
                title: title,
                faviconPath: ASSETS_PATH,
                filename: BASE_PATH + 'index.html',
                template: './src/template.ejs'
            }),
            // style规范校验
            new StyleLintPlugin({
                context: 'src',
                files: '**/*.(c|sc|sa|le)ss',
                fix: true,
                cache: true
            }),
            // 文件大小写检测
            new CaseSensitivePathsPlugin()                      
        ]
    };
}