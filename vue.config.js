module.exports = {
  // publicPath: './',
  // build 输出目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'assets',
  lintOnSave: false,
  productionSourceMap: false,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: '127.0.0.1',
    port: 8081,
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热重载
    proxy: {
      '/api': {
        // http://192.168.1.238:8777
        // target: 'http://120.24.253.177:8777', // API服务器的地址
        target: 'http://192.168.1.238:8777', // API服务器的地址
        ws: true, // 代理websockets
        changeOrign: true, // 虚拟的站点需要更管origin
        pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': '/'
        }
      }
    }
  }
}
