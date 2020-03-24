var path = require('path')
var webpack = require('webpack')
var { execSync, spawnSync } = require('child_process')

var VueLoaderPlugin = require('vue-loader/lib/plugin')
var VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

var packageJson = require ('./package.json')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/main.ts',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: isProduction ? './assets/' : '/assets/',
    filename: 'build.js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
      COMMIT_HASH: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
      UNSTAGED: JSON.stringify(spawnSync('git', ['diff', '--no-ext-diff', '--quiet']).status != 0),
      STAGED: JSON.stringify(spawnSync('git', ['diff', '--no-ext-diff', '--cached' ,'--quiet']).status != 0)
    })
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
