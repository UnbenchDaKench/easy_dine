module.exports = {
    'transpileDependencies': [
      'vuetify'
    ],
  
    devServer: {
      proxy: {
        '/api': {
          target: 'localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
  
      }
    }
  }
  