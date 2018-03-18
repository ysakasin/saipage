var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
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
        use: 'sass-loader',
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
