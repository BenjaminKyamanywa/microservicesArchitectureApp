//requiring dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Order = require('../ordersService/order') //bringing in the Order model

const port = process.env.PORT || 5000

//comitting our app to using express
const app = express()

//using middleware
app.use(bodyParser.json())

//mongodb url connection
const mongourl =
  "mongodb://localhost:27017/ordersService";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb successfully connected to orders service"))
  .catch(err => console.log(err));

//creating new order
app.post('/api/order', (req,res)=>{
    //defining new order
    const newOrder ={
        customerID: req.body.customerID,
        bookID: req.body.bookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }

    //creating new order
    const order = new Order(newOrder)

    order.save().then(()=>{
        console.log('Order successfully created')
    }).catch((err)=>{
        throw err;
    })
})

//listening port
app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})