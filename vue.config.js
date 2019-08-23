module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/css/_variables.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://192.168.0.100:7540/'
      }
    }
  },
  chainWebpack: config => {
    // Disable prefetch scripts
    config.plugins.delete('prefetch')
  }
}
