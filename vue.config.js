const webpack = require('webpack')

module.exports = {

    // 选项...
  publicPath: './', //发布路径,用相对路径，不然会报错
  lintOnSave: false, //是否开启eslint校验
  devServer: {
    proxy: { //配置代理，解决跨域请求后台数据的问题
      '/blogapi': {
        target: 'http://www.zhiyigo.cn/blogapi', //后台接口
        // target: 'http://127.0.0.1:7888/', //后台接口
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/blogapi':'/'
        }
      }
    }
  },

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
     
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    }
   
}