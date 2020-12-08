require('dotenv').config()
const express = require('express')
const cookieParse = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path');

const route = require('./routes/index');
const db = require('./db/config');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }))

//Router
route(app);

//connect db
db.connect();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/client/build'));
    app.get('*', (req, res) => {
        res.senFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
   console.log('Server is running on port', PORT)
})