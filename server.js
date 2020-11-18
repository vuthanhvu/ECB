require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const userRouter = require('./routes/userRouter')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }))

//Routes
app.use('/user', userRouter);

//connect db
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}, err => {
    if(err) throw err;
    console.log('Connect to MongoDB successfully !!!')
})

app.use('/', (req, res) => {
    res.json("Hello Chanh");
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
   console.log('Server is running on port', PORT)
})