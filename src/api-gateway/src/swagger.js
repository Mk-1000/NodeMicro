const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MicroNode API',
      version: '1.0.0',
      description: 'API documentation for MicroNode microservices',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'User service endpoints',
      },
      {
        name: 'Products',
        description: 'Product service endpoints',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ID',
              example: '60d21b4667d0d8992e610c85',
            },
            username: {
              type: 'string',
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description: 'User password (should be hashed in practice)',
              example: 'password123',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock', 'createdBy'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ID',
              example: '60d21b4667d0d8992e610c86',
            },
            name: {
              type: 'string',
              example: 'Smartphone X',
            },
            description: {
              type: 'string',
              example: 'Latest smartphone with advanced features',
            },
            price: {
              type: 'number',
              format: 'float',
              example: 999.99,
            },
            stock: {
              type: 'integer',
              example: 50,
            },
            createdBy: {
              type: 'string',
              description: 'User ID of the product creator',
              example: '60d21b4667d0d8992e610c85',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes.js', './src/swagger-docs/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;