const HtmlWebpackPlugin = require('html-webpack-plugin');

const options = {
    filename: 'index.html',
    inject: false,
    templateContent: ({ htmlWebpackPlugin }) => `
      <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy"
                content="default-src 'self'; script-src 'self'; font-src https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com">
            <meta http-equiv="X-Content-Security-Policy"
                content="default-src 'self'; script-src 'self'; font-src https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com">

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
    `,
}

const plugin = new HtmlWebpackPlugin(options);

module.exports = { plugin };
