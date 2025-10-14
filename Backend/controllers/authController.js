const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


exports.register = async (req, res) => {
    const {name, email, password} = req.body
    hashedPassword = await bcrypt.hash(password, 10)
    try {
        await User.create(name, email, hashedPassword)
        res.send(201)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        userData = await User.findByEmail(email);

        if (userData.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }  
        
        passwordMatch =await bcrypt.compare(password, userData[0].password_hash)
        
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: userData[0].id, role: userData[0].name }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ JWT: token, id: userData[0].id });
    } catch (error) {
        res.json({ error: error.message });
    }
}