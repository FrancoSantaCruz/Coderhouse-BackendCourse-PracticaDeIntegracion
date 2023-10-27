import {productsModel} from '../models/products.model.js'
import Manager from './manager.js'

class ProductsManager extends Manager{
    constructor(){
        super(productsModel)
    }
}

export const productsManager = new ProductsManager();
