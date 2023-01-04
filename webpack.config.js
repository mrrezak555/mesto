const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
    entry: {
        main: './src/pages/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    }, 'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}