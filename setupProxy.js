const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/donate',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};