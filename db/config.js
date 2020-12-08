const mongoose = require('mongoose');

function connect() {
    let URI = process.env.MONGODB_URL;
    mongoose.connect(URI, {
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, err => {
        if(err) throw err;
        console.log('Connect to MongoDB successfully!!!')
    })
}

module.exports = {connect}