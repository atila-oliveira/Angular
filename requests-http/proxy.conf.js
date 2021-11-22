 const PROXY_CONFIG = [
     {
         context: ['/api'],
         target: 'http://localhost:8000/',
         secure: false, //caso seja https, é true
         logLevel: 'debug',
         pathRewrite: { '^/api': '' }
     }
 ]

 module.exports = PROXY_CONFIG