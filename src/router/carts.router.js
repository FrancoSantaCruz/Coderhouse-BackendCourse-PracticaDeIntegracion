import { Router } from "express";
import { cartsManager } from '../Manager/CartManager.js'

const router = Router();


// Creación de un cart
router.post('/', async(req, res) => {
    try {
        const newCart = await cartsManager.createCart()
        res.status(200).json({message:'Cart Created', cart: newCart})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

// Visualización de los items de un cart en específico
router.get('/:cid', async(req,res) => {
    const { cid } = req.params;

    try {
        // Debe listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
        const cart = await cartsManager.getCartById(+cid)
        if(!cart){
            res.status(400).json({message:'Cart not found with the ID sent.'})
        } else {
            res.status(200).json({message:'Cart found.', cart : cart.products})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
})

// Agregar productos al cart creado.
router.post('/:cid/product/:pid', async(req,res) => {
    const {cid, pid} = req.params;
    try {
        const cart_updated = await cartsManager.addProductsToCart(+cid, +pid)
        console.log(cart_updated)
        if(!cart_updated){
            res.status(400).json({message:'Cart not found with the ID sent.'})
        } else {
            res.status(200).json({message:'Product added to Cart succesfully', cart: cart_updated})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
})



export default router;

