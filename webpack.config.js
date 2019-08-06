/* eslint-env node */
/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const build = require('./config/build');

const getWebpackConfig = () => {
    const webpackConfig = {
        bail: build.config.envIsProduction,
        context: build.config.dirRoot,
        devtool: build.config.envIsProduction
            ? 'cheap-source-map'
            : 'inline-source-map',

        entry: [path.join(build.config.dirSrc, 'index.tsx')],

        output: {
            publicPath: build.config.clientPublicUrl,
            path: build.config.envIsProduction
                ? build.config.dirOutput
                : undefined,
            filename: build.config.envIsProduction
                ? '[name].[hash:8].js'
                : 'bundle.js',
            chunkFilename: build.config.envIsProduction
                ? '[name].[contenthash:8].chunk.js'
                : '[name].chunk.js',
        },

        resolve: {
            extensions: ['.mjs', '.js', '.ts', '.tsx', 'json'],
            plugins: [PnpWebpackPlugin],
        },

        resolveLoader: {
            plugins: [PnpWebpackPlugin.moduleLoader(module)],
        },

        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.(js|jsx|mjs|ts|tsx)$/,
                    use: require.resolve('babel-loader'),
                    include: build.config.dirSrc,
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [].concat(
                        build.config.envIsProduction
                            ? [
                                  MiniCssExtractPlugin.loader,
                                  {
                                      loader: require.resolve('css-loader'),
                                      options: { importLoaders: 1 },
                                  },
                              ]
                            : [
                                  require.resolve('style-loader'),
                                  require.resolve('postcss-loader'),
                              ],
                        [
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    config: {
                                        path: build.config.dirRoot,
                                    },
                                },
                            },
                        ],
                    ),
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]?[hash]',
                    },
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(build.config.NODE_ENV),
                // Expose client config
                __ENV__: JSON.stringify(build.clientConfig),
            }),

            build.config.envIsProduction &&
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                }),

            new HtmlWebpackPlugin({
                // filename: 'index.html',
                template: `${build.config.dirPublic}/index.html`,
                hash: true,
                inject: true,
                // templateParameters: build.clientConfig,
                minify: build.config.envIsProduction
                    ? {
                          removeComments: true,
                          collapseWhitespace: true,
                          keepClosingSlash: true,
                          minify: true,
                          minifyCSS: true,
                          minifyJS: true,
                          minifyURLs: true,
                      }
                    : undefined,
            }),

            build.config.envIsProduction && new StyleExtHtmlWebpackPlugin(),

            !build.config.envIsProduction &&
                new webpack.HotModuleReplacementPlugin(),

            new ForkTsCheckerWebpackPlugin({
                async: !build.config.envIsProduction,
                // @NOTE Can't enable `useTypescriptIncrementalApi` in production
                // until fix is released - https://github.com/microsoft/TypeScript/pull/32641
                useTypescriptIncrementalApi: false,
            }),
        ].filter(Boolean),

        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },

        optimization: {
            minimize: build.config.envIsProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: { ecma: 8 },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    parallel: true,
                    cache: true,
                    sourceMap: true,
                }),
            ],
            splitChunks: {
                chunks: 'async',
            },
            runtimeChunk: true,
        },

        devServer: {
            contentBase: build.config.dirPublic,
            hot: true,
            host: build.config.clientHost,
            port: build.config.clientPort,
            publicPath: '/',
            historyApiFallback: true,
            watchContentBase: true,
        },
    };

    return webpackConfig;
};

module.exports = getWebpackConfig();
