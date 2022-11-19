const mongoose = require("mongoose")
const { Schema } = mongoose;

const dataSchema = new Schema({
  url:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type:String,
    required:true
  }
});

const Model = mongoose.model('Test', dataSchema);

module.exports = Model