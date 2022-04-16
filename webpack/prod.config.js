const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HWP = require('./utils/html_webpack_plugin');
const MCEP = require('./utils/mini_css_extract_plugin');

const myResolve = require('./utils/resolve');
const myRules = require('./utils/rules');

const SRC_FOLDER = path.resolve(__dirname, '../src');
const DIST_FOLDER = path.resolve(__dirname, '../dist');

module.exports = {
    mode: 'production',
    entry: path.resolve(SRC_FOLDER, 'index.js'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: DIST_FOLDER,
    },
    resolve: myResolve,
    plugins: [
        HWP.plugin,
        MCEP.plugin,
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: myRules,
    },
};
