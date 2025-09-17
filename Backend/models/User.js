// models/User.js
const db = require("../db");

class User {
  static async create(name, email, passwordHash) {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );
    return { id: result.insertId, name, email };
  }

  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  }
}

module.exports = User;
