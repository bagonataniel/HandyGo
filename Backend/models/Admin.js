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
        return rows;
    }

}

module.exports = Admin;
