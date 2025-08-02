const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

function authMiddleware(req, res, next) {
  const authHeader = req?.headers?.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res?.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = findUserById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
