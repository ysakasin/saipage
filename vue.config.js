var webpack = require('webpack')
var { execSync, spawnSync } = require('child_process')

var packageJson = require ('./package.json')

module.exports = {
  publicPath: './',
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageJson.version),
        COMMIT_HASH: JSON.stringify(execSync('git rev-parse --short HEAD').toString().trim()),
        UNSTAGED: JSON.stringify(spawnSync('git', ['diff', '--no-ext-diff', '--quiet']).status != 0),
        STAGED: JSON.stringify(spawnSync('git', ['diff', '--no-ext-diff', '--cached' ,'--quiet']).status != 0)
      })
    ]
  }
}
