const express = require('express');
const router = express.Router();
const studyModel = require('../models/studyModel')

const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory:', uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log('File destination:', uploadsDir);
        cb(null, uploadsDir);
    },
    filename: (req,file,cb) => {
        const filename = Date.now() + path.extname(file.originalname);
        console.log('Generated filename:', filename);
        cb(null, filename);
    }
})

const upload = multer({ storage: storage });


router.post('/', upload.single("doc"),async (req,res)=>{
    try{
        const docfile = req.file ? req.file.filename : "";
        const {topic, description} = req.body;
        
       const study = await studyModel.create({topic, description, doc: docfile});
        res.json({"msg": 'Success', "data": study});
    } catch(error){
        console.error('Error in study upload:', error);
        res.status(500).json({"msg": error.message});
    }
})

router.get('/', async(req, res)=>{
    const study = await studyModel.find()
    res.json({'msg':"Success", "value" : study})

 }
)

router.put('/:id', upload.single('doc'), async (req, res) => {
    try {
        const { id } = req.params;
        const { topic, description } = req.body;

        const study = await studyModel.findById(id);
        if (!study) return res.json({ msg: 'Material not found' });

        // Remove old file if a new one is uploaded
        if (req.file && study.doc) {
            const oldPath = path.join(__dirname, '..', 'uploads', study.doc);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        const updatedDoc = req.file ? req.file.filename : study.doc;

        await studyModel.findByIdAndUpdate(id, {
            topic,
            description,
            doc: updatedDoc
        });

        res.json({ msg: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating study material' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const study = await studyModel.findById(id);
        if (!study) return res.json({ msg: 'Material not found' });

        // Delete file from uploads folder
        const filePath = path.join(__dirname, '..', 'uploads', study.doc);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await studyModel.findByIdAndDelete(id);
        res.json({ msg: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error deleting study material' });
    }
});

module.exports = router;