const db = require("../db");

class Booking {
    static async create(service_id, client_id) {
        var worker_id = (await db.execute("SELECT worker_id FROM services WHERE id = ?", [service_id]))[0][0].worker_id

        var checkExistingBooking = (await db.execute("SELECT * FROM bookings WHERE service_id = ? AND client_id = ?", [service_id, client_id]))[0]
        if (checkExistingBooking.length > 0) {
            throw new Error("Booking already exists");
        }

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
        const [rows] = await db.execute("SELECT bookings.id as booking_id, services.id, services.title, services.description, services.category, bookings.status, users.name, users.email, reviews.rating FROM services JOIN bookings ON bookings.service_id = services.id JOIN users ON bookings.worker_id = users.id LEFT JOIN reviews ON reviews.service_id = services.id WHERE bookings.client_id = ? GROUP BY bookings.id;", [client_id]);
        return rows;
    }

    static async getBookingsAsWorker(worker_id) {
        const [rows] = await db.execute("SELECT bookings.id as booking_id, services.id, services.title, services.description, services.category, bookings.status, users.name, users.email, reviews.rating FROM services JOIN bookings ON bookings.service_id = services.id JOIN users ON bookings.client_id = users.id LEFT JOIN reviews ON reviews.service_id = services.id WHERE bookings.worker_id = ? GROUP BY bookings.id;", [worker_id]);
        return rows;
    }

    static async updateStatus(booking_id, status, worker_id) {
        if (!['elfogadásra vár','folyamatban','kész','elutasítva'].includes(status)) {
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

    static async deleteBooking(booking_id){
        const [result] = await db.execute("DELETE FROM bookings WHERE bookings.id = ?;",[booking_id]);
        if (result.affectedRows === 0) {
            throw new Error("Booking not found or unauthorized");
        }
        return result;
    }
}

module.exports = Booking;
