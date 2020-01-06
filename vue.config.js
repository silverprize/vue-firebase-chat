const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
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
