module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:7540/'
      }
    }
  },
  chainWebpack: config => {
    // Disable prefetch scripts
    config.plugins.delete('prefetch')
  }
}
