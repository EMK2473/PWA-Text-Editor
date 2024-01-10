const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', 
          title: "J.A.T.E."
        }),
        new InjectManifest({
          swSrc: './src-sw.js', 
          swDest: 'service-worker.js'
        }),
        new MiniCssExtractPlugin(),
        //  workbox plugins for a service worker and manifest file
        new WebpackPwaManifest({
          name: 'Just Another Text Editor',
          inject: true,
          fingerprints: false,
          short_name: 'J.A.T.E.',
          description: 'A text editor that runs in the browser. Create notes or code snippets with or without an internet connection so you can reliably retrieve them for later use!',
          start_url: './',
          publicPath: './',
          purpose: 'maskable',
          background_color: '#225ca3',
          theme_color: '#225ca3',

          icons: [
            {
              src: path.resolve(__dirname, './src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
            },
          ],
        }),
      ],
      // CSS loaders and babel to webpack.
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [ MiniCssExtractPlugin.loader, 'css-loader'],
          }, 
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
    ],
  }
  }
}
