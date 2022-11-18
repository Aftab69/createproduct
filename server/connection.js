const mongoose = require("mongoose")

const DB = "mongodb+srv://prettypurple:prettypurple%406969@cluster0.aojt7sm.mongodb.net/?retryWrites=true&w=majority"
const conn = mongoose.connect(DB,{
    useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})

module.exports = conn