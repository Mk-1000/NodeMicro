const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const setupRoutes = (app) => {
  // User Service Proxy
  app.use('/api/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:4001',
    changeOrigin: true,
    pathRewrite: {
      '^/api/users': '/api/users',
    },
    onProxyReq: (proxyReq, req, res) => {
      // You can add request transformations here if needed
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
  }));

  // Product Service Proxy
  app.use('/api/products', createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:4002',
    changeOrigin: true,
    pathRewrite: {
      '^/api/products': '/api/products',
    },
    onProxyReq: (proxyReq, req, res) => {
      // You can add request transformations here if needed
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
  }));

  // Service health check endpoints
  app.get('/api/health', async (req, res) => {
    try {
      const services = [
        { name: 'api-gateway', status: 'OK' },
      ];
      
      try {
        await axios.get(`${process.env.USER_SERVICE_URL || 'http://localhost:4001'}/health`);
        services.push({ name: 'user-service', status: 'OK' });
      } catch (error) {
        services.push({ name: 'user-service', status: 'DOWN' });
      }
      
      try {
        await axios.get(`${process.env.PRODUCT_SERVICE_URL || 'http://localhost:4002'}/health`);
        services.push({ name: 'product-service', status: 'OK' });
      } catch (error) {
        services.push({ name: 'product-service', status: 'DOWN' });
      }
      
      res.json({ services });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Default route
  app.get('/', (req, res) => {
    res.json({ 
      message: 'MicroNode API Gateway', 
      documentation: '/api-docs',
      health: '/api/health' 
    });
  });
};

module.exports = { setupRoutes };