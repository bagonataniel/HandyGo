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



io.on("connection", (socket) => {
    // Join the room IMMEDIATELY if the ID is available in the handshake
    const userId = socket.handshake.auth.token ? getUserIdFromToken(socket.handshake.auth.token) : null;
    
    if (userId) {
        socket.join(`user_${userId}`);
    }

    // Keep your manual login as a fallback if needed
    socket.on("login", (login) => {
        socket.join(`user_${login.uID}`);
        //console.log('User joined room manually:', login.uID);
    });

  socket.on("get-connections", (data)=>{
    connectionModel.getAllConnections(data.uID)
      .then((connections) => {
        io.to(socket.id).emit("all-connections", connections);
      });
  });

  socket.on("add-connection", (data)=>{
    connectionModel.addConnection(data.uID1,data.uID2);
  });

  socket.on("get-messages", (selectedUser,user)=>{
    //console.log(`Getting messages between ${user} and ${selectedUser}`);
    chatModel.getMessagesBetween(user,selectedUser)
      .then((messages) => io.to(socket.id).emit("all-messages",messages));
  });

  socket.on("send-message", async (data) => {
    await chatModel.saveMessage(data.from, data.message, data.to);

    const room = io.sockets.adapter.rooms.get(`user_${data.to}`);

    if(room && room.size > 0) {
      io.to(`user_${data.to}`).emit("new-message", {
        from: data.from,
        message: data.message,
        to: data.to
      });
      console.log('active rooms:', io.sockets.adapter.rooms);
      console.log('Message sent to user:', data.to);
    } else {
      console.log('User is offline, message saved to DB only');
    }
  });

  socket.on("check-room", (data)=>{
    io.to(socket.id).emit("room-status", {room: io.sockets.adapter.rooms.get(`user_${data.uID}`)});
    console.log('Checked room for user:', data.uID);
  });

  socket.on("disconnect", () => {
    //console.log('User disconnected:', socket.id);
  });

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});