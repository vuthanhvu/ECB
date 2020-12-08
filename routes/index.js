const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const uploadRouter = require('./uploadRouter')
const productRouter = require('./productRouter')
const paymentRouter = require('./paymentRouter')

function route(app) {
    //Routes
    app.use('/user', userRouter);
    app.use('/api', categoryRouter);
    app.use('/api', uploadRouter);
    app.use('/api', productRouter);
    app.use('/api', paymentRouter);
    app.use('/', (req, res) => {
        res.status(200).json({msg: "Hello Chanh"});
    })
}

module.exports = route;