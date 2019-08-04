/* eslint-env node */
/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const webpack = require('webpack');

const build = require('./config/build');

const getWebpackConfig = () => {
    const webpackConfig = {
        context: build.config.dirRoot,
        devtool: build.config.isProduction
            ? 'cheap-source-map'
            : 'inline-source-map',

        entry: [path.join(build.config.dirSrc, 'index.tsx')],

        output: {
            path: build.config.isProduction
                ? build.config.dirOutput
                : undefined,
            filename: build.config.isProduction
                ? '[name].[hash:8].js'
                : 'bundle.js',
            chunkFilename: build.config.isProduction
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
                        build.config.isProduction
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
                // Expose client config
                __ENV__: JSON.stringify(build.clientConfig),
            }),

            build.config.isProduction &&
                new MiniCssExtractPlugin({
                    chunkFilename: '[id].css',
                    filename: '[name].css',
                }),

            new HtmlWebpackPlugin({
                // filename: 'index.html',
                template: `${build.config.dirPublic}/index.html`,
                hash: true,
                inject: true,
                // templateParameters: build.clientConfig,
                minify: build.config.isProduction
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

            build.config.isProduction &&
                new webpack.HotModuleReplacementPlugin(),

            new ForkTsCheckerWebpackPlugin({
                async: !build.config.isProduction,
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
            minimize: build.config.isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parallel: true,
                        cache: true,
                        sourceMap: true,
                    },
                }),
            ],
            splitChunks: {
                chunks: 'all',
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
