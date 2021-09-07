module.exports = {
  publicPath: '/mogujie/',
  outputDir: './moo',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        view: '@/view',
        router: '@/router',
        store: '@/store',
        api: '@/api',
        assets: '@assets'
      }
    }
  },
  devServer: {
    proxy: {
      // 本地调试需要反向代理，但是由于上线时项目是静态文件，用不到，只需要直接写接口就行
      '/mogujieapi': {
        // target: 'https://www.zhengbeining.com/mogujieapi',
        target: 'http://152.136.185.210:7878/api/m5',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mogujieapi': ''
        }
      },
      '/loginapi': {
        target: 'http://157.245.196.25:8005',
        // target: "http://timemeetyou.com:8889/api/private/v1",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/loginapi': ''
        }
      }
    }
  }
}
