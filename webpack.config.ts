import * as path from 'path';
import * as webpack from 'webpack';

import WebpackCopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";



const config: webpack.Configuration = {
    mode: 'production',
    entry: [
        "./scripts/main.ts",
        "./styles/theme.scss"
    ],
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        path: path.join(__dirname, './build/static/'),
        publicPath: '../',
        filename: 'scripts/theme.min.js',
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [ '...', new CssMinimizerPlugin() ]
    },
    module: {
        rules: [
            {
                test: /\.[t|j]sx?$/,
                use: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new WebpackCopyPlugin({
            patterns: [
                {
                    from: "./templates/",
                    to ({ absoluteFilename }) {
                        const jinja = absoluteFilename.endsWith('theme_variables.jinja');
                        return `../[name].${jinja ? 'jinja' : 'html'}`;
                    }
                },
                {
                    from: "./theme.conf",
                    to: "../theme.conf"
                },
                {
                    from: "./theme_init.py",
                    to: "../__init__.py"
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/theme.css'
        })
    ]
}

// Use `--mode ['development' | 'production']` to control source maps generation
// Use `--env root_path=...` to append custom string to root public path
module.exports = (env, argv) => {
    if (argv.mode == 'development') config.devtool = 'inline-source-map';
    if (!!env.root_path) config.output.publicPath = `${env.root_path}${config.output.publicPath}`
    return config;
};
