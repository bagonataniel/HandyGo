require('dotenv').config();
const app = require("./app");

//A chat cuccai
const http = require("http");
const {Server} = require("socket.io");
const mongoose = require("mongoose");
const chatModel = require("./models/chatModel");
const connectionModel = require("./models/connectionModel");

const server = http.createServer(app);
const io = new Server(server , {
  cors:{
    origin: "*",
    methods:["GET","POST"],
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
    connectionModel.checkForPrevoisConnection(data.uID1,data.uID2).then((previousConn) => {
      if (previousConn) {
        return;
      }
      else{
        connectionModel.addConnection(data.uID1,data.uID2,data.name1,data.name2);
      }
    });
  });

  socket.on("delete-connection", (data)=>{
    chatModel.deleteChatMessages(data.uID1,data.uID2);
    connectionModel.deleteConnection(data.uID1,data.uID2);
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