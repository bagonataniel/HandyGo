const Admin = require("../models/Admin");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User")
const Service = require("../models/Service")

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        adminData = await Admin.GetAdminByUsername(username);
        if (adminData === undefined) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, adminData.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ id: adminData.id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ JWT: token, id: adminData.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.adminRegister = async (req, res) => {
    const { username, password } = req.body;
    hashedPassword = await bcrypt.hash(password, 10)
    try {
        await Admin.CreateAdmin(username, hashedPassword)
        res.send(201)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getPendingServices = async (req, res) => {
    try {
        services = await Admin.GetPendingServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.approveService = async (req, res) => {
    const serviceId = req.params.id;
    try {
        await Admin.ApproveService(serviceId);
        res.status(200).json({ message: "Service approved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.rejectService = async (req, res) => {
    const serviceId = req.params.id;
    try {
        await Admin.RejectService(serviceId);
        res.status(200).json({ message: "Service rejected successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        users = await Admin.GetAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllServices = async (req, res) => {
    try {
        services = await Admin.GetAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        await Admin.DeleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getStats = async (req, res) => {
    try {
        const stats = await Admin.getStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookings = async (req, res) => {
    try {
        var bookings = await Admin.getBookings();
        for (let index = 0; index < bookings.length; index++) {
            bookings[index].worker_name = (await User.findById(bookings[index].worker_id)).name;
            bookings[index].client_name = (await User.findById(bookings[index].client_id)).name;
            bookings[index].service_name = (await Service.getServiceById(bookings[index].service_id)).title;
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAdminAccounts = async (req, res) => {
    try {
        const admins = await Admin.getAdminAccounts();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.removeAdminAccount = async (req, res) => {
    const adminId = req.params.id;

    try {
        await Admin.removeAdminAccount(adminId);
        res.status(200).json({ message: "Admin account removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}