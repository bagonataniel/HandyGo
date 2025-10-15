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

  static async update(id, fieldNames, fieldValues) {
    const sqlData = []
    fieldNames.forEach((field, index) => {
      sqlData.push(`${field} = '${fieldValues[index]}', `)
    });
    const [result] = await db.execute(
      `UPDATE users SET ${sqlData.join("").slice(0, -2)} WHERE id = ?`,[id]
    );
    
    return result;
  }
    
}

module.exports = User;
