const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();

const adminRoute = require('./routes/adminRoute.js')
const yearRoute = require('./routes/yearRoute.js')
const branchRoute = require('./routes/branchRoute.js')
const newsRoute = require('./routes/newsRoute.js')
const programRoute = require('./routes/programRoute.js')
const studentRoute = require('./routes/studentRoute.js')
const feedbackRoute = require('./routes/feedbackRoute.js')
const studyRoute = require('./routes/studyRoute.js')
const examRoute = require('./routes/examRoute.js')
const examResultRoute = require('./routes/examResultRoute.js')
const paymentRoutes = require("./routes/razorpay.js");

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT
const URI = process.env.MONGODB_URI


app.use(express.json());
app.use(cors());
app.use('/uploads',express.static("uploads"));

app.use('/api/admin', adminRoute);
app.use('/api/admin/year', yearRoute)
app.use('/api/admin/branch', branchRoute)
app.use('/api/admin/news', newsRoute)
app.use('/api/admin/program', programRoute)
app.use('/api/admin/student', studentRoute)
app.use('/api/admin/study', studyRoute)
app.use('/api/admin/exam', examRoute)
app.use('/api/admin/examresult', examResultRoute)

app.use('/api/student', studentRoute)
app.use('/api/feed', feedbackRoute)
app.use('/api/student/examresult', examResultRoute)

app.use("/api/payment", paymentRoutes);

mongoose.connect(URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(`MongoDB connection error: ${err.message}`));


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

