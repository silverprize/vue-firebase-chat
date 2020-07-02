const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL
const isProduction = process.env.NODE_ENV === 'production'

function configureWebpackProduction(config) {
  config.optimization
    .minimizer('terser')
    .tap(args => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
}

/**
 *  @typedef { import("@vue/cli-service").ProjectOptions } Options
 *  @typedef { import("webpack-chain") ChainWebpack }
 *  @type { Options }
 */
module.exports = {
  outputDir: process.env.OUTPUT_DIR,
  publicPath: process.env.PUBLIC_PATH,
  chainWebpack: (config) => {
    if (isProduction) {
      configureWebpackProduction(config)
    }
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
    },
  },
}
