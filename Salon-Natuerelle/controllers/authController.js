const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Logger = require('../utils/logger');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user (password will be hashed by the model hook)
    const user = await User.create({
      name,
      email,
      password,
      role: 'Customer' // Default role for public registration
    });

    // Log the registration
    await Logger.logUserAction(
      'USER_REGISTERED',
      `New user registered: ${email}`,
      user.id,
      req
    );

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      user: user.toSafeObject(),
      token
    });
  } catch (error) {
    next(error);
  }
};

// Admin only - Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (role) {
      whereClause.role = role;
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      users: rows.map(user => user.toSafeObject()),
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStaff,
  deleteUser,
  changeUserRole,
  getAllCustomers,
  getAllUsers
};