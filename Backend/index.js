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

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log("MongoDB connected")})
  .catch((err)=>{console.log(`MongoDB connection error:${err}`)});



io.on("connection", (socket) => {
   
    const userId = socket.handshake.auth.token ? getUserIdFromToken(socket.handshake.auth.token) : null;
    
    if (userId) {
        socket.join(`user_${userId}`);
    }

    socket.on("login", (login) => {
        socket.join(`user_${login.uID}`);
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

    
    setImmediate(() => {
      const roomName = `user_${data.to}`;
      const room = io.sockets.adapter.rooms.get(roomName);

      if(room?.size > 0) {
        io.in(roomName).emit("new-message", {from: data.from, message: data.message, to: data.to, recivedFrom: roomName});
      }
    });
  });


  socket.on("check-room", (data)=>{
    io.to(socket.id).emit("room-status", {room: io.sockets.adapter.rooms.get(`user_${data.uID}`)});
    console.log('Checked room for user:', data.uID);
  });

  socket.on("disconnect", () => {
    socket.leaveAll();
  });

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});