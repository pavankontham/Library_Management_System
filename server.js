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

//store the data in db
app.post('/products', async(req,res)=>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);

   }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
   }
})

//Fetch all products from db
app.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({products})

    }catch(error){
        res.status(500).json({message:error.message})
    }

})

//Fetch specific product
app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;

        const product = await Product.findById(id); 
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

//update  a product
app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
        //check product is update or  not
        if(!product){
            return res.status(404).json({message: `cannot find any project with ID ${id}`})
        }
        //for to get latest updation from the db
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}) 

//delete a product

app.delete('/products/:id', async(req,res) => {
    try {
        const {id} =  req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot  find any product with this ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
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

