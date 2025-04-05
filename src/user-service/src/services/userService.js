const userRepository = require('../repositories/userRepository');

class UserService {
  async getAllUsers() {
    try {
      return await userRepository.findAll();
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      return await userRepository.create(userData);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      
      return await userRepository.update(id, userData);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      
      return await userRepository.delete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = new UserService();
