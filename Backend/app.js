require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Or false, depending on your requirements
const path = require('path')
const user_routes = require('./routes/user_routes')
const category_routes = require('./routes/category_routes')
const product_routes = require('./routes/product_routes')
const cart_routes=require('./routes/cart_routes')
const order_routes=require('./routes/order_routes')
const address_routes=require('./routes/address_routes')
const port=5500
const app = express()
const audit=require('./audit')
app.use(cors())

mongoose.connect('mongodb+srv://ArtSphere:ArtSphere123@artsphere.4vp4p.mongodb.net/?retryWrites=true&w=majority&appName=ArtSphere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust timeout
})
.then(() => {
    console.log('Connected to MongoDB server');
    app.listen(port, () => {
        console.log(`App is running on port: ${port}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));

// application level middleware
app.use((req, res, next) => {
    audit.log(`${req.method} ${req.path}`)
    console.log(`${req.method} ${req.path}`)
    next()
})

app.use(
    "/images",
    express.static(path.join(__dirname, "/images"))
);

// starts with(^) / or ends with($) / or is index or index.html then 
app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

//express defined middleware
app.use(express.json())


app.use('/users', user_routes)
// app.use(auth.verifyUser)
app.use('/category', category_routes)
app.use('/products', product_routes)
app.use('/cart',cart_routes)
app.use('/order',order_routes)
app.use('/address',address_routes)

// error handling middleware
// when there is value in err parameter then it gets executed

app.use((err, req, res, next) => {
    audit.log(`${req.method} ${req.path} ${err.stack}`)  
    if (res.statusCode == 200) res.status(500)
    res.json({ "err": err.message })
})

module.exports = app