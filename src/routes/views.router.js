import { Router } from "express";
import { productsManager } from '../dao/MongoManager/products.manager.js'
import { cartsManager } from "../dao/MongoManager/carts.manager.js";
import { messagesManager } from "../dao/MongoManager/messages.manager.js";

const router = Router()

// HOME
router.get('/', (req, res) => {
    res.render('home')
})

router.get('/products', async(req, res) => {
    const products = await productsManager.findAll()
    res.render('products', {products:products, style:"products"})
})

router.get('/product/:pid', async(req, res) => {
    const {pid} = req.params
    const product = await productsManager.findByID(pid)
    res.render('oneProduct', {product})
})



// CARTS VIEWS
router.get('/cart/:cid', async(req,res) => {
    const {cid} = req.params   
    const cart = await cartsManager.findByID(cid)

    res.render('cart', {cart : cart.products})
})




// CHATS VIEWS
router.get("/chats", async (req, res) => {
    const chats = await messagesManager.findAll()
    res.render("chats", {chats});
});

router.get("/chat/:cid", async (req, res) => {
    const { cid } = req.params
    const chat = await messagesManager.findByID(cid)
    res.render("chat", { chat: chat._id , messages: chat.chats });
});





export default router