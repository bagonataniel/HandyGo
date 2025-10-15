const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const authRoute = require("./routes/authRoutes")
const usersRoute = require("./routes/usersRoutes")
const serviceRoute = require("./routes/serviceRoutes")

app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/service", serviceRoute)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});