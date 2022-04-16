const path = require('path');

const MCEP = require('./utils/mini_css_extract_plugin');

const myResolve = require('./utils/resolve');
const myRules = require('./utils/rules');

const DIST_FOLDER = path.resolve(__dirname, '../dist');

module.exports = {
    mode: 'development',
    resolve: myResolve,
    plugins: [
        MCEP.plugin,
    ],
    module: {
        rules: myRules,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: DIST_FOLDER,
        }
    },
};
