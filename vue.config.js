const path = require('path')
module.exports = {
  // 全局less变量
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "sass",
      // patterns: [path.resolve(__dirname, './src/assets/less/1.less')]
      patterns: []
    },
  },
  devServer: {
    port: 8123,
  }
};