const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  maxPlayers:{
    type: Number,
    required:true,
  },
  onlyOwnerCanPlay:{
    type:Boolean,
    required:true
  },
  chatEnabled:{
    type:Boolean,
    required:true
  }

});

module.exports = mongoose.model("Rooms", roomSchema)