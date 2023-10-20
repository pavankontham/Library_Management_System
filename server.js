const express = require('express');
const mongoose = require('mongoose');
const app = express();



//routes
app.get('/',(req,res)=>{
    res.send(' hello api');
})

// connnection with db 
mongoose
  .connect(
    "mongodb+srv://nandunsb99:Nandana99@cluster0.vprjlwa.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb")
    app.listen(3000, () => {
      console.log("node api is running here")
    })
  }) .catch((error) => {
    console.log(error);
  })
