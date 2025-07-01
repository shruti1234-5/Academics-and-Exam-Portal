const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel')

router.post('/login',async(req,res)=>{
    
     try {
        const {email,password} = req.body;
        const admin = await adminModel.findOne({email})

    if(!admin)
        return res.json({'msg': "Admin not found"})
    else{
        if(admin.password == password)
            return res.json({ msg: 'Success', id: admin._id });

        else
             return res.json({'msg':'Incorrect Password'})
    }
       }
       catch(error)
       {
        return res.json(error.message)
       }
})

module.exports = router;