import express from 'express';
import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'
import { __dirname } from './utils.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/public'))


app.listen(8080, () => {
    console.log("Listening server on port 8080. \nhttp://localhost:8080/ ");
});


// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
