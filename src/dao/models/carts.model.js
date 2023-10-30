import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
   products: {
        type: [{productId : String, quantity: Number}],
        require: true,
   }
})

export const cartsModel = model('Carts', cartsSchema)