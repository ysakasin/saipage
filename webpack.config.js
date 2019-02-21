var path = require('path')
var webpack = require('webpack')

var VueLoaderPlugin = require('vue-loader/lib/plugin')
var VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './client/main.ts',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: isProduction ? './assets/' : '/assets/',
    filename: 'build.js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.vue', '.js'
    ],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
