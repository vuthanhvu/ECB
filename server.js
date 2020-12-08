require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path');

const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/categoryRouter')
const uploadRouter = require('./routes/uploadRouter')
const productRouter = require('./routes/productRouter')
const paymentRouter = require('./routes/paymentRouter')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }))

//Routes
app.use('/user', userRouter);
app.use('/api', categoryRouter);
app.use('/api', uploadRouter);
app.use('/api', productRouter);
app.use('/api', paymentRouter);

//connect db
// const URI = process.env.MONGODB_URL;
// mongoose.connect(URI, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }, err => {
//     if(err) throw err;
//     console.log('Connect to MongoDB successfully !!!')
// })

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/client/build'));
    app.get('*', (req, res) => {
        res.senFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use('/', (req, res) => {
    res.json("Hello Chanh");
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
   console.log('Server is running on port', PORT)
})