import { cartsModel } from '../models/carts.model.js'
import Manager from './manager.js';

class CartsManager extends Manager {
    constructor() {
        super(cartsModel)
    }

    async addProdToCart(cid, pid) {
        try {
            let cart = await this.findByID(cid)
            if (!cart) {
                throw new Error("Cart not found");
            }

            const product = cart.products.find(
                (product) => product.productId === pid
            );
            if (product) {
                let arr = cart.products.map(objeto => {
                    if (objeto.productId === pid) {
                        objeto.quantity++;
                    }
                    return { ...objeto};
                });
                cart.products = arr
            } else {
                cart.products = [
                    ...cart.products,
                    ...[{ productId: pid, quantity: 1 }],
                ];
            }
            const res = await this.updateOne(cid, cart)
            return res;
        } catch (error) {
            return error
        }
    }

    async deleteProdFromCart(cid, pid) {
        try {
            const cart = await this.findByID(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            const product = cart.products.find(
                (product) => product.productId === pid
            );
            if (!product) {
                throw new Error("This product doesn't exists.");
            }
            if (product.quantity > 1) {
                let arr = cart.products.map(objeto => {
                    if (objeto.productId === pid) {
                        objeto.quantity--;
                    }
                    return { ...objeto};
                });
                cart.products = arr
            } else {
                cart.products = cart.products.filter(
                    (product) => product.productId !== pid
                );
            }
            const res = await this.updateOne(cid, cart)
            return "Product deleted";
        } catch (error) {
            return error
        }
    }

}

export const cartsManager = new CartsManager();
