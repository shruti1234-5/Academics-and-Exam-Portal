const express = require('express');
const router = express.Router();
const studentModel = require('../models/studentModel')


router.get('/', async(req, res)=>{
       const student = await studentModel.find()
       res.json({'msg':"Success", "value" : student})
  
    }
)

 
router.post('/register', async(req, res)=>{
    try{
      const { paymentStatus } = req.body;
      if (paymentStatus !== 'success') {
        return res.status(400).json({ msg: 'Payment not successful. Registration denied.' });
      }
      const student = await studentModel.create(req.body)
      res.json({'msg':"Success", "value" : student})
    }
    catch(error){
        return res.json(error.message)
    }
})

router.post('/login',async(req,res)=>{
    
    try {
       const {email,password} = req.body;
       const student = await studentModel.findOne({email})

   if(!student)
       return res.json({'msg': "student not found"})
   else{
       if(student.password == password)
           return res.json({ msg: 'Success', id: student._id, student: student });

       else
            return res.json({'msg':'Incorrect Password'})
   }
      }
      catch(error)
      {
       return res.json(error.message)
      }
})

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const student = await studentModel.findByIdAndDelete(id,req.body)
        res.json({"msg":"Success"})
    }
    catch(error){
        return res.json({"msg": error})
    }
})

module.exports = router;