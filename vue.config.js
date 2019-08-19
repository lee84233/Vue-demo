/*
 * 配置文件
 * @Author: Bruce.Lee
 * @Date: 2019-03-19 17:33:34
 * @Last Modified by: Bruce.Lee
 * @Last Modified time: 2019-07-03 15:00:24
 */

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: '/',
  // 放置生成的静态资源的(相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // 生产环境的 source map
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    proxy: {
      '/interface': {
        target: 'http://localhost:81',
        changeOrigin: true,
        pathRewrite: {
          // '^/interface': '/interface'
        }
      }
    }
  }
};
