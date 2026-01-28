const db = require("../db");

class Service {
  static async create(worker_id, title, description, category, price, latitude, longitude) {
    const [result] = await db.execute(
      "INSERT INTO services (worker_id, title, description, category, price, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [worker_id, title, description, category, price, latitude, longitude]
    );
    return { id: result.worker_id, title, description };
  }

  static async getAllService(category, minPrice, maxPrice) {
    let query = "SELECT * FROM services WHERE status = 'approved'"
    let params = [];

    if(category){
      query += " AND category = ?";
      params.push(category);
    }
    if(minPrice){
      query += " AND price >= ?";
      params.push(minPrice);
    }
    if(maxPrice){
      query += " AND price <= ?";
      params.push(maxPrice);
    }

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async getServiceById(id) {
    const [rows] = await db.execute("SELECT * FROM services WHERE id = ?", [id]);
    return rows[0];
  }

  static async updateService(id, service_id, fieldNames, fieldValues) {
    const sqlData = []
    fieldNames.forEach((field, index) => {
      sqlData.push(`${field} = '${fieldValues[index]}', `)
    });
    const [result] = await db.execute(
      `UPDATE services SET ${sqlData.join("").slice(0, -2)} WHERE id = ? and worker_id = ?`, [service_id, id]
    );

    return result;
  }

  static async removeService(user_id, service_id) {
    const [result] = await db.execute("DELETE FROM services WHERE id = ? and worker_id = ?", [service_id, user_id]);
    return result;
  }

  static async createReview(service_id, client_id, rating) {
    try {
      var worker_id = (await db.execute("SELECT worker_id FROM services WHERE id = ?", [service_id]))[0][0].worker_id
    } catch (error) {
      throw new Error("Service not found");
    }

    try {
      var booking = (await db.execute("SELECT * FROM bookings WHERE service_id = ? AND client_id = ? AND worker_id = ?", [service_id, client_id, worker_id]))[0][0]
      if (booking === undefined) {
        throw new Error("Booking not found for this service and client");
      }
    } catch (error) {
      throw new Error("Booking not found for this service and client");
    }

    const [result] = await db.execute(
      "INSERT INTO reviews (service_id, client_id, worker_id, rating) VALUES (?, ?, ?, ?)", [service_id, client_id, worker_id, rating]);
    return { id: result.insertId, client_id, service_id, rating };
  }

  static async getMyServices(userId) {
    const [rows] = await db.execute("SELECT * FROM services WHERE worker_id = ?", [userId]);
    return rows;
  }
}

module.exports = Service;
