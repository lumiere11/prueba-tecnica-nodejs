const db = require('../database/db');

function createUser({ name, email, password }) {
  const stmt = db.prepare(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`);
  const info = stmt.run(name, email, password);
  return { id: info.lastInsertRowid, name, email };
}

function findUserByEmail(email) {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  return stmt.get(email);
}

function findUserById(id) {
  const stmt = db.prepare(`SELECT id, name, email FROM users WHERE id = ?`);
  return stmt.get(id);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
