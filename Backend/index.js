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
    console.log('User logged in:',socket.id, login.uID);
  });

  socket.on("get-connections", ()=>{
    connectionModel.getAllConnections(onlineUserMap.get(socket.id))
      .then((connections) => {
        io.to(socket.id).emit("all-connections", connections);
        //console.log(`Sent connections to user ${onlineUserMap.get(socket.id)}:`, connections);
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
    const toSocketId = getSocketIdByUser(data.to);
    if(toSocketId){
      io.to(toSocketId).emit("new-message", {
        from: data.from,
        message: data.message,
        to: data.to
      });
      console.log('Message sent to user:', toSocketId);
      console.log('Message content:', data);
    }
  });

  socket.on("disconnect", () => {
    onlineUserMap.delete(socket.id);
    console.log('User disconnected:', socket.id);
  });

});

function getSocketIdByUser(uID){
  for (const [key, value] of onlineUserMap.entries()) {
    if (value === uID) {
      return key;
    }
  }
  return null;
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});