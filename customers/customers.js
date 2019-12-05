//requiring dependencies
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser')
const Customer = require('../customers/customer') //bringing in the Customer model
const port = process.env.PORT || 4000

//comitting our app to using express
const app = express()

//using middleware
app.use(bodyParser.json())

//mongodb url connection
const mongourl =
  "mongodb://localhost:27017/customerService";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb successfully connected to customer service"))
  .catch(err => console.log(err));

//post customer
app.post('/api/customer', (req, res)=>{
    //defining customer fields
    const newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    //creating new customer
    const customer = new Customer(newCustomer)

    //save customer
    customer.save().then(()=>{
        res.send('Customer created successfully');
    }).catch(err =>{
        throw err;
    })
    
})

//get all customers
app.get('/api/customers', (req, res)=>{
    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

//get a single customer
app.get('/api/customer/:id', (req, res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.send('Invalid ID')
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

//delete customer
app.delete('/api/customer/:id', (req, res)=>{
    Customer.findByIdAndRemove(req.params.id).then(()=>{
        res.send('Customer deleted with success!')
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

//listening port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})