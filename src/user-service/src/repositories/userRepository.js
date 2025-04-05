const User = require('../models/userModel');

class UserRepository {
  async findAll() {
    return await User.find().select('-password');
  }

  async findById(id) {
    return await User.findById(id).select('-password');
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(
      id,
      { ...userData, updatedAt: Date.now() },
      { new: true }
    ).select('-password');
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
