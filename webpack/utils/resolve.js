const path = require('path');

const SRC_FOLDER = path.resolve(__dirname, '../../src');

module.exports = {
    extensions: ['.js', '.jsx'],
    alias: {
        MyComponents: path.resolve(SRC_FOLDER, 'components'),
        MyUtils: path.resolve(SRC_FOLDER, 'utils'),
        MyStore: path.resolve(SRC_FOLDER, 'store'),
        MyStyles: path.resolve(SRC_FOLDER, 'css'),
    }
};
