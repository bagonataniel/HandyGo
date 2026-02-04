const mongoose = require("mongoose");

const chatSchema = new mongoose.model(
    "chat_message",
    new mongoose.Schema(
        {
            from:String,
            message:String,
            to:String
}));


async function saveMessage(userID, Message,To){
    await chatSchema.create({from:userID,message:Message,to:To});
}

async function getMessagesBetween(User1,User2){
    return await chatSchema.find({
        $or: [
            { $and: [ { from: User1 }, { to: User2 } ] },
            { $and: [ { from: User2 }, { to: User1 } ] }
        ]
    }).select("from message to").exec();
}

async function deleteChatMessages(uID1,uID2) {
    await chatSchema.deleteMany({
        $or:[
            {from:uID1 , to:uID2},
            {from:uID2 , to:uID1}
        ]
    });
    
}

module.exports = {
    saveMessage,
    getMessagesBetween,
    deleteChatMessages
};