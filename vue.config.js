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
  },
  pwa: {
    name: 'Alchemy game',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js'
      // ...other Workbox options...
    }
  }
}
