const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.js", //punto de entrada de la aplicación
    output: { //es adónde se va a enviar lo que preparará weback
        path: path.resolve(__dirname, 'dist'), //Resolve permite saber donde se encuentra el directorio para que no haya prob. con el path. usar dist como estándar.
        /* filename: 'main.js', */ //nombre al archivo resultante q se va a unificar
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'], //extensiones de archivos con los q se va a trabajar
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },    
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ]
            },
            {
                test: /\.png/, 
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash].[ext]'
                }
                /* use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application-font-woff",
                        name: "[name].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "./assets/fonts/",
                        esModule: false
                    }
                } */
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html', //el template que se va a usar
            filename: './index.html' //en donde va a quedar el archivo de salida
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new DotEnv(),
    ],
    devServer: {
        //deprecated!
        //contentBase: path.join(__dirname, 'dist')
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3000
    }
}