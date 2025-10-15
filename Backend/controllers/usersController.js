const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Profilok megtekintéséhez
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    const userData = await User.findById(userId);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: userData });
}

// Felhasználói adatok frissítése
exports.updateUser = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const userId = jwt.decode(userToken).id;
    
    try{
        User.update(userId, keys, values)
        res.status(200).json({ message: "User updated successfully" });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

// Felhasználó törlése
exports.deleteUser = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const userId = jwt.decode(userToken).id;

    try {
        await User.removeAccount(userId);
        return res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete user account", errorDetails: error.message });
    }
}

// Felhasználó foglalásainak lekérése
exports.getUserBookings = async (req, res) => {
    const userToken = req.header("x-auth-token");
    const userId = jwt.decode(userToken).id;

    try {
        const bookings = await User.findClientBookings(userId);
        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve bookings", errorDetails: error.message });
    }
}

// Felhasználó szolgáltatásainak lekérése
exports.getUserServices = async (req, res) => {
    const userId = req.params.id;

    try {
        const services = await User.findWorkerServices(userId);
        return res.status(200).json({ services });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve services", errorDetails: error.message });
    }
}