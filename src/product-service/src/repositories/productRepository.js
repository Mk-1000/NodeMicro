const Product = require('../models/productModel');

class ProductRepository {
  async findAll() {
    return await Product.find();
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async findByUserId(userId) {
    return await Product.find({ createdBy: userId });
  }

  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(
      id,
      { ...productData, updatedAt: Date.now() },
      { new: true }
    );
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductRepository();
