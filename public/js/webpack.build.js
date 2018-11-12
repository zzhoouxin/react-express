/**
 * Created by haojunhua on 2016/12/5.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const package = require('./package.json');
var assetsViews = require('./assets-views');



//antd-mobile 配置不用antd-mobile可以去掉
const svgSpriteDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
];


const vendor = require('./manifest.json').name.replace('_', '.');


module.exports = {
    devtool: false,
    entry: {
        "entry": "./index",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/js/dist/",
        filename: 'qianmi-[name]-[chunkhash].js'
    },
    //resolve,解决 antd-mobile 代码查找问题  //antd-mobile 配置不用antd-mobile可以去掉
    resolve: {
        mainFiles: ["index.web", "index"],// 这里哦
        //选取util路径问题
        //方法1：    modules: ['app', 'node_modules', path.join(__dirname, '../node_modules'),__dirname,path.resolve(__dirname,"util")]
        //方法2     alias:{
        //              util:path.resolve(__dirname, 'util')
        //          },
        modules: ['app', 'node_modules', path.join(__dirname, '../node_modules'), __dirname, path.resolve(__dirname, "util")],
        extensions: [
            '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
            '.js',
            '.jsx',
            '.react.js',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    },

    module: {
        loaders: [
            {//antd-mobile 配置不用antd-mobile可以去掉
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: svgSpriteDirs,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true',
                query: {//antd-mobile 配置不用antd-mobile可以去掉
                    plugins: [["import", {
                        libraryName: "antd-mobile",
                        style: true,
                    }]]
                }
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}]
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: true,
            __EMPTY_HOME__: true,
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new HtmlWebpackPlugin({
            title: "",
            env: 'production',
            filename: 'index.html',
            template: './views/index.ejs',
            vendorPath: '/js/dist/' + vendor + '.js',
            inject: true,
            chunks: "index",
            inlineSource: '.css$'
        })
    ]
        .concat([
            new HtmlWebpackInlineSourcePlugin()
        ])
        .concat(assetsViews({
            from: './dist/',
            to: '../../views'
        }))
};

