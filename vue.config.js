/* eslint-disable */
// https://cli.vuejs.org/config/
module.exports = {
  productionSourceMap: true,
  devServer: {
    proxy: {
      '/market-competitive-statistic.zpidc.com/': {
        target: 'http://market-competitive-statistic.zpidc.com',
        changeOrigin: true,
        pathRewrite: {
          '^/market-competitive-statistic.zpidc.com/': '/',
        },
      },
      '/user-competitive-score.zpidc.com/': {
        target: 'http://user-competitive-score.zpidc.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/user-competitive-score.zpidc.com/': '/',
        },
      },
    },
    before: app => {
      // app is an express instance
    },
  },

  lintOnSave: true,
}