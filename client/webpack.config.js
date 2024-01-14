// Importing necessary webpack plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Exporting webpack configuration as a function
module.exports = () => {
  return {
    // Setting development mode
    mode: 'development',
    
    // Entry points for the application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    
    // Output configuration
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    
    // Webpack plugins configuration
    plugins: [
      // HTMLWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './index.html', 
        title: "J.A.T.E."
      }),
      
      // Workbox plugin to inject a service worker
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'service-worker.js'
      }),
      
      // MiniCssExtractPlugin to extract CSS into separate files
      new MiniCssExtractPlugin(),

      // WebpackPwaManifest for creating a web app manifest
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

        // Configuration for app icons
        icons: [
          {
            src: path.resolve(__dirname, './src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    
    // Module configuration for loaders
    module: {
      rules: [
        // CSS loader configuration
        {
          test: /\.css$/i,
          use: [ MiniCssExtractPlugin.loader, 'css-loader'],
        }, 
        
        // Asset loader configuration for images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        
        // Babel loader configuration for JavaScript
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
  };
};
