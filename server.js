const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();


//using middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send(' hai api');
})

app.post('/product', async(req,res)=>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);

   }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
   }
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

