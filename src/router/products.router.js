import { Router } from 'express'
// Importo una instancia de ProductManager. No la clase.
import { productsManager } from '../ProductManager.js'

import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

//Al importar solamente Router de express, inicializamos las funcionalidades para el CRUD.
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
        // Si entra en el catch, significa que hubo un error en getProducts, por lo tanto devolvemos un error 500. 
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

router.post('/', upload.array('avatar', 6), async (req,res) => {

    // Buscamos validar la existencia de los campos obligatorios enviados por body.
    // Lo hacemos preferentemente en la ruta previo a la ejecución del método asincrónico
    // al ser totalmente innecesario ejecutar tanta lógica si podemos validar previamente.
    const {title, description, price, thumbnail, code, stock} = req.body
    if(!title || !description || !price || !thumbnail || !code || !stock){
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

// Exportamos las rutas para poder requerirlas en app.js
export default router;