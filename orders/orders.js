//requiring dependencies
const express = require('express')
const port = process.env.PORT || 5000

//comitting our app to using express
const app = express()


//listening port
app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})