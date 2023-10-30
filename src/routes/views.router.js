import { Router } from "express";
import { productsManager } from '../dao/MongoManager/products.manager.js'
import { cartsManager } from "../dao/MongoManager/carts.manager.js";

const router = Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/new-product', (req,res) => {
    res.render('newProduct')
})

router.get('/products', async(req, res) => {
    const products = await productsManager.findAll()
    res.render('allProducts', {products})
})

router.get('/product/:pid', async(req, res) => {
    const {pid} = req.params
    const product = await productsManager.findByID(pid)
    res.render('oneProduct', {product})
})

router.get('/cart/:cid', async(req,res) => {
    const {cid} = req.params   
    const cart = await cartsManager.findByID(cid)

    res.render('cart', {cart : cart.products})
})


export default router