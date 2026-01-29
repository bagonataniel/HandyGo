const db = require("../db");

class Admin {
    static async GetAdminByUsername(username) {
        const [rows] = await db.execute("SELECT * FROM admin_users WHERE username = ?", [username]);
        return rows[0];
    }

    static async CreateAdmin(username, password_hash) {
        const [result] = await db.execute("SELECT * FROM admin_users WHERE username = ?", [username]);
        if (result.length > 0) {
            throw new Error("Admin with this username already exists");
        }
        const [insertResult] = await db.execute(
            "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
            [username, password_hash]
        );
        return { id: insertResult.insertId, username };
    }

    static async GetPendingServices() {
        const [rows] = await db.execute("SELECT * FROM services WHERE status = 'pending'");
        return rows;
    }

    static async ApproveService(id) {
        const [result] = await db.execute("UPDATE services SET status = 'approved' WHERE id = ?", [id]);
        return result;
    }

    static async RejectService(id) {
        const [result] = await db.execute("UPDATE services SET status = 'rejected' WHERE id = ?", [id]);
        return result;
    }

    static async GetAllUsers() {
        const [rows] = await db.execute("SELECT * FROM users");
        return rows;
    }

    static async GetAllServices() {
        const [rows] = await db.execute("SELECT * FROM services");
        for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            const worker_name = await db.execute("SELECT name FROM users WHERE id = ?", [element.worker_id]);
            rows[index].worker_name = worker_name[0][0].name;
        }
        return rows;
    }

    static async DeleteUser(id) {
        const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
        return result;
    }

    static async getStats(){
        const [basicStats] = await db.execute("SELECT (SELECT COUNT(*) FROM users) AS users_count, (SELECT COUNT(*) FROM services WHERE services.status = 'pending')  AS pending_services, (SELECT COUNT(*) FROM services WHERE services.status = 'rejected')  AS rejected_services, (SELECT COUNT(*) FROM services WHERE services.status = 'approved')  AS approved_services, (SELECT COUNT(*) FROM bookings)  AS bookings_count;")
        const [userGrowth] = await db.execute("SELECT YEAR(created_at) AS year, MONTH(created_at) AS month, COUNT(*) AS new_users FROM handygo.users GROUP BY YEAR(created_at), MONTH(created_at) ORDER BY year DESC, month DESC;");
        const [totalRevenue] = await db.execute("SELECT SUM(s.price) AS total_revenue FROM handygo.bookings b JOIN handygo.services s ON b.service_id = s.id WHERE b.status = 'kész';")
        basicStats[0].total_revenue = totalRevenue[0].total_revenue || 0;
        var result = [...basicStats, ...userGrowth];
        console.log(result);
        return result;
    }

    static async getBookings(){
        const [rows] = await db.execute("SELECT * FROM bookings");
        return rows
    }
}

module.exports = Admin;
