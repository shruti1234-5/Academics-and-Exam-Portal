const express = require('express');
const router = express.Router();
const programModel = require('../models/programModel')

router.get('/', async (req,res)=>{
    const program = await programModel.find();
    return res.json({"msg":"Success","value": program})
})

router.post('/', async(req,res)=>{
    try{
       const program = await programModel.create(req.body);
       res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const program = await programModel.findByIdAndUpdate(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const program = await programModel.findByIdAndDelete(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

module.exports = router;