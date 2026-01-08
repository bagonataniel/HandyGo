const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mailer = require("../utils/sendMail");

dotenv.config();


exports.register = async (req, res) => {
    const { name, email, password } = req.body
    hashedPassword = await bcrypt.hash(password, 10)
    try {
        await User.create(name, email, hashedPassword)
        const user = await User.findByEmail(email);

        const token = jwt.sign({ id: user[0].id, name: user[0].name, email: user[0].email }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });

        await mailer(email, "Welcome to Our App", `<h1>Welcome, ${name}!</h1><p>Thank you for registering.</p><p>click <a href="http://localhost:3000/auth/verify/${token}">here</a> to verify your account</p>`);
        res.status(201).json({ message: "User registered successfully. Please check your email to verify your account." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        userData = await User.findByEmail(email);

        if (userData.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        passwordMatch = await bcrypt.compare(password, userData[0].password_hash)

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: userData[0].id, role: userData[0].name, email: userData[0].email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({ JWT: token, id: userData[0].id, is_verified: userData[0].is_verified, username: userData[0].name });
    } catch (error) {
        res.json({ error: error.message });
    }
}

exports.verify = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const verifyUser = await User.findById(decoded.id);

        if (verifyUser) {
            await User.verifyUser(decoded.id);
            return res.status(200).send("Token is valid");
        }
        res.status(200).send("error");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.extendVerification = async (req, res) => {
    try {
        const userToken = req.header("x-auth-token");
        if (!userToken) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);

        const token = jwt.sign({ id: decoded.id, name: decoded.name, email: decoded.email }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        await mailer(decoded.email, "Verification", `<h1>Welcome, ${decoded.name}!</h1><p>click <a href="http://localhost:3000/auth/verify/${token}">here</a> to verify your account</p>`);
        res.status(200).json({message: "Verification email sent successfully."});
    } catch (error) {
        res.status(400).json({ message: "Failed to extend verification"});
    }
}