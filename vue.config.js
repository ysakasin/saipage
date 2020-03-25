/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const { execSync, spawnSync } = require("child_process");

module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        COMMIT_HASH: JSON.stringify(
          execSync("git rev-parse --short HEAD")
            .toString()
            .trim()
        ),
        UNSTAGED: JSON.stringify(
          spawnSync("git", ["diff", "--no-ext-diff", "--quiet"]).status != 0
        ),
        STAGED: JSON.stringify(
          spawnSync("git", ["diff", "--no-ext-diff", "--cached", "--quiet"])
            .status != 0
        )
      })
    ]
  }
};
