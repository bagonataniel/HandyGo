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
        await mailer(email, "Regisztráció hitelesítése", `<!DOCTYPE html><html lang="hu"><head><meta charset="UTF-8"><title>HandyGo – Fiók aktiválás</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;}.wrapper{max-width:600px;margin:40px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.06);}.header{background:linear-gradient(135deg,#2563eb,#1e3a8a);padding:35px 25px;text-align:center;color:#ffffff;}.header h1{margin:0;font-size:24px;letter-spacing:0.5px;}.content{padding:40px 30px;text-align:center;color:#1f2937;}.content h2{margin-top:0;font-size:20px;}.content p{font-size:15px;line-height:1.6;color:#4b5563;}.expiry{display:inline-block;margin:18px 0;padding:8px 14px;background:#fef3c7;color:#92400e;border-radius:20px;font-size:13px;font-weight:bold;}.button{display:inline-block;margin-top:25px;padding:14px 30px;background-color:#2563eb;color:#ffffff !important;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;}.button:hover{background-color:#1e40af;}.security-box{margin-top:35px;padding:18px;background-color:#f9fafb;border-radius:10px;font-size:13px;color:#6b7280;text-align:left;}.fallback{word-break:break-all;font-size:12px;margin-top:18px;color:#6b7280;}.footer{padding:25px;text-align:center;font-size:12px;color:#9ca3af;background:#f9fafb;}@media (prefers-color-scheme:dark){body{background-color:#111827;}.wrapper{background-color:#1f2937;}.content{color:#f3f4f6;}.content p{color:#d1d5db;}.security-box{background-color:#111827;color:#9ca3af;}.footer{background-color:#111827;color:#6b7280;}}@media only screen and (max-width:600px){.wrapper{margin:20px;}.content{padding:30px 20px;}}</style></head><body><div class="wrapper"><div class="header"><h1>HandyGo</h1></div><div class="content"><h2>Szia ${name} 👋</h2><p> Köszönjük a regisztrációt!<br> A fiókod aktiválásához erősítsd meg az email címed az alábbi gombra kattintva. </p><div class="expiry"> ⏳ A link 10 percig érvényes </div><br><a href="http://localhost:3000/auth/verify/${token}" class="button"> Email cím megerősítése </a><p class="fallback"> Ha a gomb nem működik, másold be ezt a linket a böngésződbe:<br> http://localhost:3000/auth/verify/${token} </p><div class="security-box"> 🔐 Biztonsági információ:<br><br> Ha nem te hoztad létre a HandyGo fiókot, kérjük hagyd figyelmen kívül ezt az emailt. A link 10 perc után automatikusan lejár. </div></div><div class="footer"> © 2026 HandyGo – Minden jog fenntartva </div></div></body></html>`);
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
            return res.status(404).json({ error: "Invalid email or password" });
        }

        passwordMatch = await bcrypt.compare(password, userData[0].password_hash)

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: userData[0].id, name: userData[0].name, email: userData[0].email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        return res.status(200).json({ JWT: token, id: userData[0].id, is_verified: userData[0].is_verified, username: userData[0].name });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.verify = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(401).json({ error: "Lejárt vagy rossz token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const verifyUser = await User.findById(decoded.id);

        if (verifyUser) {
            await User.verifyUser(decoded.id);
            return res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HandyGo - Verified</title>
</head>
<body style="font-family:Arial;text-align:center;padding:60px;background:#f3f4f6;">
  <div style="background:#fff;padding:40px;border-radius:12px;max-width:500px;margin:auto;">
    <h1 style="color:#16a34a;">✅ Sikeres hitelesítés</h1>
    <p>A fiókod sikeresen aktiválva lett.</p>
    <a href="http://localhost:4200/"
       style="display:inline-block;margin-top:20px;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;">
       Főoldal
    </a>
  </div>
</body>
</html>
`);
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
        console.log(decoded);
        
        await mailer(decoded.email, "Regisztráció hitelesítése", `<!DOCTYPE html><html lang="hu"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>HandyGo – Új megerősítő link</title></head><body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 15px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;padding:40px 30px;text-align:center;"><tr><td style="font-size:22px;font-weight:bold;color:#2563eb;padding-bottom:20px;">HandyGo</td></tr><tr><td style="font-size:16px;color:#111827;padding-bottom:15px;">Szia <strong>${decoded.name}</strong> 👋</td></tr><tr><td style="font-size:14px;color:#4b5563;padding-bottom:20px;line-height:1.6;">Új megerősítő linket kértél a fiókodhoz.<br>Kattints az alábbi gombra az email címed hitelesítéséhez.<br><strong>A link 10 percig érvényes.</strong></td></tr><tr><td><a href="http://localhost:3000/auth/verify/${token}" style="display:inline-block;padding:14px 28px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold;">Email megerősítése</a></td></tr><tr><td style="font-size:12px;color:#6b7280;padding-top:25px;word-break:break-all;">Ha a gomb nem működik:<br>http://localhost:3000/auth/verify/${token}</td></tr><tr><td style="font-size:12px;color:#9ca3af;padding-top:30px;">© 2026 HandyGo<br>Ha nem te kérted az új linket, hagyd figyelmen kívül ezt az emailt.</td></tr></table></td></tr></table></body></html>`);
        res.status(200).json({message: "Verification email sent successfully."});
    } catch (error) {
        res.status(400).json({ message: "Failed to extend verification"});
    }
}

exports.checkVerification = async (req, res) => {
    try {
        const userToken = req.header("x-auth-token");
        if (!userToken) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.id);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ is_verified: user.is_verified });
    } catch (error) {
        res.status(400).json({ message: "Failed to check verification status" });
    }
}