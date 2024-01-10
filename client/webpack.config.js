const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.



// TODO: Add CSS loaders and babel to webpack.

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
          template: './src/index.html', 
          filename: 'index.html', 
          chunks: ['main'], 
        }),
        new HtmlWebpackPlugin({
          template: './src/install.html', 
          filename: 'install.html', 
          chunks: ['install'], 
        }),
        new WebpackPwaManifest({
          name: 'PWA-Text-Editor',
          short_name: 'App',
          description: 'A text editor that runs in the browser. Create notes or code snippets with or without an internet connection so you can reliably retrieve them for later use!',
          background_color: '#ffffff',
          theme_color: '#000000',
          icons: [
            {
              src: path.resolve('./src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('icons'),
            },
          ],
        }),
        new InjectManifest({
          swSrc: './src/src-sw.js', 
          swDest: 'service-worker.js'
        }),
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
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
