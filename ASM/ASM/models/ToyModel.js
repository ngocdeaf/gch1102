var mongoose = require('mongoose');

var ToySchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      category: String,
      instock: Number,
      price: Number,
      image: String
   }
);

var ToyModel = mongoose.model("DoChoi", ToySchema, "toy");
module.exports = ToyModel;