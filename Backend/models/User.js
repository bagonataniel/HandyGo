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

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  }

  static async removeAccount(id){
    const [rows] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    return rows;
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

  static async findBookings(id) {
    const [rows] = await db.execute("SELECT * FROM bookings where client_id = ? OR worker_id = ?", [id, id]);
    return rows;
  }
  
  static async findWorkerServices(id) {
    const [rows] = await db.execute("SELECT * FROM services where worker_id = ?", [id]);
    return rows;
  }
}

module.exports = User;
