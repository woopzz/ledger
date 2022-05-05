const MCEP = require('./mini_css_extract_plugin');

module.exports = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                plugins: ['@babel/plugin-transform-runtime'],
            },
        },
    },
    {
        test: /\.css$/i,
        use: [MCEP.loader, 'css-loader'],
    },
];
