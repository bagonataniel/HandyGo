const User = require("../models/User");


exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    const userData = await User.findById(userId);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: userData });
}