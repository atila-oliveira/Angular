 const PROXY_CONFIG = [
     {
         context: ['/api'], //convenção usada para distinguir rota de backend
         target: 'http://localhost:8000/',
         secure: false, //caso seja usado https, é true
         logLevel: 'debug',
         pathRewrite: { '^/api': ''}
     }
 ]

 module.exports = PROXY_CONFIG