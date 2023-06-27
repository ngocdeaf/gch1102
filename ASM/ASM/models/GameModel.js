var mongoose = require('mongoose');

var GameSchema  = mongoose.Schema(
   {
      name : String,
      category : String,
      quantity : Number,
      price: Number,
      image : String,
      date : Date
   }
);

var GameModel = mongoose.model("Game", GameSchema, "game");
module.exports = GameModel;