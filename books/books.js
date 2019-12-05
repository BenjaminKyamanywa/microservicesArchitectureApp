// requiring dependencies
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser')
const Book = require('./book') //bringing in the Book model

const port = process.env.PORT || 3000

//committing our app to using express
const app = express()

// using middleware
app.use(bodyParser.json())

//mongodb url connection
const mongourl =
  "mongodb://localhost:27017/libraryApp";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb successfully connected to books service"))
  .catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('This is the main endpoint for our library application')
})

//post a book
app.post('/api/book', (req, res)=>{
    //define book
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }
    //create a new book
    const book = new Book(newBook)

    //save book
    book.save().then(()=>{
        console.log('New book created')
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send('A new book created with success')
})

//get all books
app.get('/api/books', (req, res)=>{
    Book.find().then(function(books){
       res.json(books)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

//list single book by id
app.get('/api/book/:id', (req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book);
        }else{
            res.status(404);
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

//delete a book
app.delete('/api/book/:id', (req,res)=>{
    Book.findByIdAndRemove(req.params.id).then(()=>{
        res.send('Book removed');
    }).catch((err) =>{
        throw err;
    })
})
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})