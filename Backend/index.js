const express = require("express")
const app = express()
const cors = require('cors');
require('dotenv').config();

//A chat cuccai
const http = require("http");
const {Server} = require("socket.io");
const mongoose = require("mongoose");
const chatModel = require("./models/chatModel");
const connectionModel = require("./models/connectionModel");

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

const server = http.createServer(app);
const io = new Server(server , {
  cors:{
    origin: "*",
    methonds:["GET","POST"],
    credentials: true
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/HandyChat")
  .then(() => { console.log("MongoDB connected")})
  .catch((err)=>{console.log(`MongoDB connection error:${err}`)});

var onlineUserMap = new Map();



io.on("connection", (socket) => {
  socket.on("login", (login) => {
    onlineUserMap.set(socket.id,login.uID);
  });

  socket.on("get-connections", ()=>{
    connectionModel.getAllConnections(onlineUserMap.get(socket.id))
      .then((connections) => {
        io.to(socket).emit("all-connections", connections);
      });
  });



});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});