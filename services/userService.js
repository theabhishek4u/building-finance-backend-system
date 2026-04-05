const User = require('../models/User');

/**
 * User Service - Handles user data operations
 */
class UserService {
  static async createUser(userData) {
    return await User.create(userData);
  }

  static async getUsers() {
    return await User.find().sort({ createdAt: -1 });
  }

  static async getUserById(id) {
    return await User.findById(id);
  }

  static async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserService;
