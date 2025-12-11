const mongoose = require("mongoose");

const connectionsSchema = mongoose.model(
    "user_connection",
    new mongoose.Schema({
        uID1: String,
        uID2: String
    })
);

async function getAllConnections(User){
    var connections = [];

    const results1 = await connectionsSchema.find({uID1:User}).select("uID2").lean();
    results1.forEach(d => {
        connections.push(d.uID2);
    });

    const results2 = await connectionsSchema.find({uID2:User}).select("uID1").lean();
    results2.forEach(d => {
        connections.push(d.uID1);
    });

    return connections;
}

async function addConnection(uID1,uID2) {
    await connectionsSchema.create({uID1:uID1,uID2:uID2});
}

module.exports = {
    getAllConnections,
    addConnection
}