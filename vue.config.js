/*
 * 配置文件
 * @Author: Lee
 * @Date: 2019-03-19 17:33:34
 * @Last Modified by: Lee
 * @Last Modified time: 2019-07-03 15:00:24
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: '/',

  // 打包生成构建文件的目录，默认值：dist
  // outputDir: 'dist',

  // 放置生成的静态资源的(相对于 outputDir 的) 目录
  assetsDir: 'assets',

  // 生产环境的 source map
  productionSourceMap: false,

  // 配置 webpack，会合并到最终的配置中
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({})
  //   ]
  // },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: 'http://localhost:81',
        changeOrigin: true,
        pathRewrite: {
          // [process.env.VUE_APP_BASE_URL]: '/interface'
        }
      }
    }
  },
  chainWebpack(config) {
    // 设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
