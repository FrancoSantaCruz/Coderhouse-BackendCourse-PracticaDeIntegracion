import { Router } from "express";
import { cartsManager } from '../dao/MongoManager/carts.manager.js'

const router = Router();
// CRUD 
// CREATE CART X
// READ ALL CARTS  X
// READ ONE CART X
// UPDATE CART (ADD AND DELETE ONE ITEM TO CART) X X

// READ ALL CARTS
router.get('/', async (req,res) => {
    try {
        const carts = await cartsManager.findAll()
        if(carts.length<=0){
            res.status(200).json({message: "No carts created yet."})
        } else {
            res.status(200).json({message: ' Carts Found ', carts})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})


// CREATE CART
router.post('/', async (req, res) => {
    try {
        const cartCreated = await cartsManager.createOne({})

        res.status(200).json({message: cartCreated})
    } catch (error) {
        res.status(500).json({message: error})
    }
})


// ADDING ONE ITEM TO CART
router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const {cid, pid} = req.params

        const reply = await cartsManager.addProdToCart(cid, pid)

        // res.redirect(`/cart/${cid}`)
        res.status(200).json({ProductAdded: reply})
    } catch (error) {
        res.status(500).json({message: error})
    }
})


// DELETING ONE ITEM FROM CART
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const {cid, pid} = req.params
    
        const reply = await cartsManager.deleteProdFromCart(cid, pid)
    
        res.status(200).json({ProductAdded: reply})
      } catch (error) {
        res.status(500).json({message: error})
      }
})  

export default router;
