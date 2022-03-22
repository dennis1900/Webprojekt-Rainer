import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import useRouter from "./routers/userRouter.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
try {
  mongoose.connect(process.env.MONGOURL, () =>
  console.log('Connected to DB')
);
} catch (error) {
  console.log(error);
};


app.get('/api/products/:id',(req,res) =>{
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);

    }else{
        res.status(404).send({message: 'Product not found'});
    }
});

app.get('/api/products',(req,res) =>{
    res.send(data.products);
});


app.use('/api/users', useRouter);
app.get('/', (req, res) =>{
    res.send('Server is ready');
});

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Server at http://localhost:${port}`)
});