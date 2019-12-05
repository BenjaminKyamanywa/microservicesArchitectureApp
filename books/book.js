//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for books model to follow 
const bookSchema = new Schema ({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required : true
    },
    numberPages : {
        type: Number,
        required: false
    },
    publisher: {
        type: String,
        required: true
    }
})

//books model
module.exports = mongoose.model("Book", bookSchema)