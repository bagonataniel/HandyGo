const db = require("../db");

class Booking {
    static async create(service_id, client_id, worker_id) {
        const [result] = await db.execute(
            "INSERT INTO bookings (service_id, client_id, worker_id) VALUES (?, ?, ?)",
            [service_id, client_id, worker_id]
        );
        return { id: result.id, status: result.status };
    }

    static async getBookingDetails(booking_id, id) {
        const [result] = await db.execute("SELECT * FROM bookings WHERE id = ?", [booking_id]);
        if (result[0].client_id !== id && result[0].worker_id !== id) {
            throw new Error("Unauthorized access to booking details");
        }
        return result[0];
    }

    static async getBookingsAsClient(client_id) {
        const [rows] = await db.execute("SELECT * FROM bookings WHERE client_id = ?", [client_id]);
        return rows;
    }

    static async getBookingsAsWorker(worker_id) {
        const [rows] = await db.execute("SELECT * FROM bookings WHERE worker_id = ?", [worker_id]);
        return rows;
    }

    static async updateStatus(booking_id, status, worker_id) {
        if (!['elfogadásra vár','folyamatban','kész'].includes(status)) {
            throw new Error("Invalid status value");
        }
        const [result] = await db.execute(
            "UPDATE bookings SET status = ? WHERE id = ? AND worker_id = ?",
            [status, booking_id, worker_id]
        );
        if (result.affectedRows === 0) {
            throw new Error("Booking not found or unauthorized");
        }
        return result;
    }
}

module.exports = Booking;
