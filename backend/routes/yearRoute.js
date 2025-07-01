const express = require('express');
const router = express.Router();
const yearModel = require('../models/yearModel')

router.get('/', async (req,res)=>{
    const year = await yearModel.find();
    return res.json({"msg":"Success","value": year})
})

router.post('/', async(req,res)=>{
    try{
       const year = await yearModel.create(req.body);
       res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const year = await yearModel.findByIdAndUpdate(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const year = await yearModel.findByIdAndDelete(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

module.exports = router;