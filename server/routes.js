const express = require("express");
const router = express.Router();
const Model = require("./schemas")

router.post("/generate",async(req,res)=>{
    try{
       const { url , price, category } = req.body
       console.log(req.body)
       const user = new Model({url,price,category});
        await user.save();
        res.status(201).json({ message: "success"});
    }catch(error){
        console.log(error)
        res.status(404).json({message: "fail"})
    }
})

router.get("/apis",async(req,res)=>{
    try{
        const data = await Model.find()
        res.send(data)
    }catch(error){
        console.log(error)
    }
})

module.exports = router