const mongoose = require("mongoose")
const { Schema } = mongoose;

const dataSchema = new Schema({
  image:{
    type:String,
    required:true
  },
  name:{
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
  },
  amount:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  }
});

const Model = mongoose.model('Test', dataSchema);

module.exports = Model