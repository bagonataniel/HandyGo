const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    const userData = await User.findById(userId);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: userData });
}

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