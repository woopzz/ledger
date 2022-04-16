const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugin = new MiniCssExtractPlugin({
    filename: 'bundle.[contenthash].css',
});

module.exports = {
    plugin,
    loader: MiniCssExtractPlugin.loader,
};
