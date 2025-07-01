const express = require('express');
const router = express.Router();
const newsModel = require('../models/newsModel')

router.get('/', async (req,res)=>{
    const news = await newsModel.find();
    return res.json({"msg":"Success","value": news})
})

router.post('/', async(req,res)=>{
    try{
       const news = await newsModel.create(req.body);
       res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const news = await newsModel.findByIdAndUpdate(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const news = await newsModel.findByIdAndDelete(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

module.exports = router;