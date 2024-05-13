const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // agora para passar a url não precisa passar tudo apenas /api/ (e o resto do endpoint)
    createProxyMiddleware({
      target: 'http://localhost:3333', // url do servidor do autodroid
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // rmove o '/api' da URL
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // nessa função faz com que o navegador aceite a respota, mesmo que venha de uma origem diferente, fazendo com que nao de problema de CORS
      },
    })
  );
};
