const express = require('express')
const app = express();
const cookieParser =require('cookie-parser')
const bodyparser = require('body-parser')
const errorMiddleware = require('./middlewares/errors');
const path= require('path');

const fileUpload = require('express-fileupload')
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
app.use(express.json());
app.use(bodyparser.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(fileUpload())


const products = require('./routes/product');
const auth = require('./routes/auth');
const category = require('./routes/category');
const payment = require('./routes/payment');
const order = require('./routes/order');
const brand = require('./routes/brand');
const slider = require('./routes/slider');

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',payment)
app.use('/api/v1',category)
app.use('/api/v1',order)
app.use('/api/v1',brand)
app.use('/api/v1',slider)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);
module.exports = app