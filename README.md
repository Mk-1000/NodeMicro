# MicroNode - A Simple Microservices Architecture

MicroNode is a basic microservices application demonstrating the API Gateway pattern with Node.js services.

## Project Structure

```
MicroNode/
├── api-gateway/          # API Gateway service
├── user-service/         # User management service
├── product-service/      # Product management service
└── docker-compose.yml    # Docker configuration
```

## Services

1. **API Gateway** (port 3000)
   - Routes requests to appropriate services
   - Provides a single entry point for clients

2. **User Service** (port 4001)
   - Manages user data
   - REST API for CRUD operations on users
   - MongoDB storage

3. **Product Service** (port 4002)
   - Manages product data
   - REST API for CRUD operations on products
   - Integrates with User Service for ownership
   - MongoDB storage

4. **MongoDB** (port 27017)
   - Database for all services

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

## Getting Started

1. **Clone the repository** (if not using the setup script)

2. **Run the application with Docker Compose:**
   To build and run the services with Docker Compose, use the following command in the root directory of the project:

   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build all the services' Docker images.
   - Start the containers for the API Gateway, User Service, Product Service, and MongoDB.
   - Connect the services via a custom network.

3. **Access the services:**
   - **API Gateway:** http://localhost:3000
   - **User Service:** http://localhost:4001
   - **Product Service:** http://localhost:4002
   - **MongoDB:** http://localhost:27017 (for direct database access)

4. **Stop the services:**
   To stop all running services, run:

   ```bash
   docker-compose down
   ```

## API Endpoints

### User Service
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Product Service
- `GET /api/products` - List all products (filter with `?userId=` query parameter)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Development

To run services individually (without Docker):

1. Install dependencies in each service directory:
   ```bash
   cd src/api-gateway && npm install
   cd ../user-service && npm install
   cd ../product-service && npm install
   ```

2. Start MongoDB:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. Start each service in separate terminals:
   ```bash
   cd src/user-service && npm start
   cd ../product-service && npm start
   cd ../api-gateway && npm start
   ```