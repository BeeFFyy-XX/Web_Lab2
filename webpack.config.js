const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');

// Отримуємо всі HTML-файли з src/pages
const htmlFiles = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter(file => file.endsWith('.html'));

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        // Генеруємо HtmlWebpackPlugin для кожного HTML-файлу
        ...htmlFiles.map(file => new HtmlWebpackPlugin({
            template: `./src/pages/${file}`,
            filename: file,
        })),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Директорія для сервера
        open: true, // Автоматично відкривати у браузері
        port: 8080,
    },
    mode: 'development',
};