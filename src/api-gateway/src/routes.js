const { createProxyMiddleware } = require('http-proxy-middleware');

const setupRoutes = (app) => {
  // User Service Proxy
  app.use('/api/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:4001',
    changeOrigin: true,
    pathRewrite: {
      '^/api/users': '/api/users',
    },
  }));

  // Product Service Proxy
  app.use('/api/products', createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:4002',
    changeOrigin: true,
    pathRewrite: {
      '^/api/products': '/api/products',
    },
  }));

  // Default route
  app.use('/', (req, res) => {
    res.json({ message: 'API Gateway' });
  });
};

module.exports = { setupRoutes };
