module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: false,
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('html')
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },

  transpileDependencies: [
    'vuetify'
  ],
}
