var path = require('path')
var webpack = require('webpack')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './client/main.ts',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/assets/',
    filename: 'build.js'
  },
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
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
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
        use: 'vue-loader',
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
