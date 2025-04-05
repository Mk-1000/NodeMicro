const axios = require('axios');
const productRepository = require('../repositories/productRepository');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';

class ProductService {
  async getAllProducts() {
    try {
      return await productRepository.findAll();
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await productRepository.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error getting product: ${error.message}`);
    }
  }

  async getProductsByUserId(userId) {
    try {
      // Verify user exists before fetching products
      try {
        await axios.get(`${USER_SERVICE_URL}/api/users/${userId}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error('User not found');
        }
        console.log('Warning: Could not verify user existence', error.message);
        // Continue even if user service is unavailable
      }

      return await productRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(`Error getting products by user: ${error.message}`);
    }
  }

  async createProduct(productData) {
    try {
      // Verify user exists before creating product
      try {
        await axios.get(`${USER_SERVICE_URL}/api/users/${productData.createdBy}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error('User not found');
        }
        console.log('Warning: Could not verify user existence', error.message);
        // Continue even if user service is unavailable
      }
      
      return await productRepository.create(productData);
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async updateProduct(id, productData) {
    try {
      const product = await productRepository.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      
      return await productRepository.update(id, productData);
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await productRepository.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      
      return await productRepository.delete(id);
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
