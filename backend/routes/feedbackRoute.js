const express = require('express');
const router = express.Router();
const feedbackModel = require('../models/feedbackModel')

router.get('/', async (req,res)=>{
    try{
    const feed = await feedbackModel.find();
     res.json({"msg":"Success","value": feed});
    }catch(error){
        res.json({"msg": error})
    }
})

router.post('/', async(req,res)=>{
    try{
       const feed = await feedbackModel.create(req.body);
       res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.get('/feedback', async(req,res)=>{
    try{
        const feed = await feedbackModel.find({'type':"Feedback"})
        res.json({"msg":"Success","value": feed});
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.get('/complain', async(req,res)=>{
    try{
        const feed = await feedbackModel.find({'type':"Complain"})
        res.json({"msg":"Success","value": feed});
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.get('/suggestion', async(req,res)=>{
    try{
        const feed = await feedbackModel.find({'type':"Suggestion"})
        res.json({"msg":"Success","value": feed});
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.get('/:stuid', async(req,res)=>{
    try{
        const {stuid} = req.params
        const feed = await feedbackModel.find({studentId: stuid })
        res.json({"msg":"Success","value": feed});
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const feed = await feedbackModel.findByIdAndUpdate(id, req.body)
        res.json({"msg":"Success"});
    }
    catch(error){
        return res.json({"msg": error})
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const feed = await feedbackModel.findByIdAndDelete(id);
        res.json({"msg":"Success"});
    }
    catch(error){
        return res.json({"msg": error})
    }
})

module.exports = router;