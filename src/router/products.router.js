import { Router } from 'express'
import { productsManager } from '../Manager/ProductManager.js'

const router = Router()

router.get('/', async(req, res) => {
    try {
        const products = await productsManager.getProducts(req.query)
        if(!products.length){
            res.status(200).json({message: 'No products found.'})
        } else {
            res.status(200).json({message:'Products found', products})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/:pid', async(req,res) => {
    const {pid} = req.params;
    try {
        const product = await productsManager.getProductById(+pid)
        if(!product){
            res.status(400).json({message:'Product not found with the ID sent.'})
        } else {
            res.status(200).json({message:'Product found.', product})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }

})

router.post('/', async (req,res) => {
    const {title, description, price, code, stock, category} = req.body
    if(!title || !description || !price || !code || !stock || !category){
        return res.status(400).json({message: 'Some data is missing.'})
    }
    try {
        const newProduct = await productsManager.addProduct(req.body)
        res.status(200).json({message:'Product added', product: newProduct})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete('/:pid', async(req,res) => {
    const {pid} = req.params
    try {
        const product = await productsManager.deleteProduct(+pid)
        if(!product){
            res.status(400).json({message:'Product not found with the ID sent.'})
        } else {
            res.status(200).json({message:'Product deleted successfully', productDeleted : product})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put('/:pid', async(req,res) => {
    const {pid} = req.params
    try {
        const prodUpdated = await productsManager.updateProduct(+pid, req.body)
        if(!prodUpdated){
            res.status(400).json({message:'Product not found with the ID sent or the information is invalid.'})
        } else{ 
            res.status(200).json({message:'Product updated.', ProductUpdated : prodUpdated})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router;