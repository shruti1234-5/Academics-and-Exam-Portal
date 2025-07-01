const express = require('express');
const router = express.Router();
const branchModel = require('../models/branchModel')

router.get('/', async (req,res)=>{
    const branch = await branchModel.find();
    return res.json({"msg":"Success","value": branch})
})

router.post('/', async(req,res)=>{
    try{
       const branch = await branchModel.create(req.body);
       res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const branch = await branchModel.findByIdAndUpdate(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const branch = await branchModel.findByIdAndDelete(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

module.exports = router;