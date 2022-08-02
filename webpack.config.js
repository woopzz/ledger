const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const SRC_FOLDER = path.resolve(__dirname, 'src');
const DIST_FOLDER = path.resolve(__dirname, 'dist');

const DEV_MODE = process.env.NODE_ENV === 'development';
const PROD_MODE = !DEV_MODE;

console.log('dev mode:', DEV_MODE);

function getPlugins() {
    const plugins = [];

    const htmlPlugin = new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: false,
        templateContent: ({ htmlWebpackPlugin }) => `
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
                ${htmlWebpackPlugin.tags.headTags}
            </head>
            <body>
                <div id="root"></div>
                ${htmlWebpackPlugin.tags.bodyTags}
            </body>
            </html>
        `
    });
    plugins.push(htmlPlugin);

    if (PROD_MODE) {
        const mcep = new MiniCssExtractPlugin({
            filename: 'bundle.[contenthash].css'
        });
        plugins.push(mcep);
    }

    return plugins;
}

const getCssLoaders = () => [
    DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader'
];

const config = {
    mode: DEV_MODE ? 'development' : 'production',
    entry: path.resolve(SRC_FOLDER, 'index.tsx'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: DIST_FOLDER,
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: getPlugins(),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: getCssLoaders()
            },
            {
                test: /\.svg$/,
                use: ['file-loader']
            }
        ]
    }
};

PROD_MODE && Object.assign(config, {
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            '...'
        ]
    }
});

DEV_MODE && Object.assign(config, {
    devtool: 'source-map',
    devServer: {
        static: {
            directory: DIST_FOLDER
        }
    }
});

module.exports = config;
