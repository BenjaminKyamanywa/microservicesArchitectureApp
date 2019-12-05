//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//defining orderSchema
const orderSchema = new Schema ({
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate:{
        type: Date,
        required: true
    }
})

//exporting order model
module.exports = mongoose.model('Order', orderSchema)