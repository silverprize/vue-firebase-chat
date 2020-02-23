const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL
module.exports = {
  chainWebpack: (config) => {
    config.optimization
      .splitChunks({
        minSize: 10000,
        maxSize: 200000,
      })
    config.module
      .rule('tsx')
      .use('vue-jsx-hot-loader')
      .loader('vue-jsx-hot-loader')
    return config
  },
  devServer: {
    proxy: {
      [`^${imageBaseUrl}`]: {
        target: 'http://localhost:3000',
      },
      '^/socket\\.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
