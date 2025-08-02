const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

async function registerUser({ name, email, password }) {
  const existingUser = findUserByEmail(email);
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = createUser({ name, email, password: hashedPassword });

  const token = generateToken({ id: newUser.id });
  return { user: newUser, token };
}

async function loginUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken({ id: user.id });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
}

module.exports = {
  registerUser,
  loginUser
};
