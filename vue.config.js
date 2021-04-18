module.exports = {
  chainWebpack: (config) => {
    config.module
    .rule('images')
    .use('url-loader')
    .tap(options => Object.assign({}, options, { name: '[name].[ext]' }));
    
    config.module.rule('images').use('url-loader')
    .loader('file-loader') // replaces the url-loader
    .tap(options => Object.assign(options, {
      name: 'images/[name].[ext]'
    }))
    config.module.rule('svg').use('file-loader')
    .tap(options => Object.assign(options, {
      name: 'images/register/[name].[ext]'
    }))
  },
  css: {
    extract: {
      filename: 'css/app.css',
      chunkFilename: 'css/chunk.css',
    },
  },
  configureWebpack: {
    output: {
      filename: 'js/app.js',
      chunkFilename: 'js/chunk.js',
    }
  }
};