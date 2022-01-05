const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { content: './src/content/index.ts', popup: './src/popup/index.tsx' },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.tsx', '.ts'],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './src/popup/index.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './manifest.json' },
      ],
    }),
  ],
  output: { filename: '[name].js', path: path.resolve(__dirname, '../dist') }, // chrome will look for files under dist/* folder
};
