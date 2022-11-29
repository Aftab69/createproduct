const express = require("express");
const router = express.Router();
const Model = require("./schemas")

router.post("/generate",async(req,res)=>{
    try{
       const { image, name, price, category, amount, quantity } = req.body
       console.log(req.body)
       const user = new Model({image, name, price, category, amount, quantity});
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

router.post("/search", async(req,res)=>{
    try{
        const { searchname } = req.body;
        const data = await Model.findOne({name:searchname})
        if(data){
            res.status(200).send(data)
        } else {
            res.status(400).json({"message":"not found"})
        }
    }catch(error){
        console.log(error)
    }
})
router.post("/delete",async(req,res)=>{
    try{
        const { name } = req.body;
        await Model.deleteOne({name:name})
        res.status(200).json({"message":"deleted successfully"})
    }catch(error){
        console.log(error)
    }
})

module.exports = router