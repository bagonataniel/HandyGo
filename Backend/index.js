const express = require("express")
const app = express()
const cors = require('cors');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

const authRoute = require("./routes/authRoutes")
const usersRoute = require("./routes/usersRoutes")
const serviceRoute = require("./routes/serviceRoutes")
const bookingRoute = require("./routes/bookingRoutes")
const adminRoute = require("./routes/adminRoutes")

app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/service", serviceRoute)
app.use("/booking", bookingRoute)
app.use("/admin", adminRoute)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});