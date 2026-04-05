const UserService = require('../services/userService');
const { validateUser } = require('../utils/validation');

exports.createUser = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await UserService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
