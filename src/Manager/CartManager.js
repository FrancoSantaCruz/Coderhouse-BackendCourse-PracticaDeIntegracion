import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts_list = await fs.promises.readFile(this.path, 'utf-8');
                const parsed_carts_list = JSON.parse(carts_list)

                return parsed_carts_list
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createCart() {
        try {
            let carts = await this.getCarts()
            let cid = carts.length ? carts[carts.length - 1].id + 1 : 1;
            let newCart = {
                id: cid,
                products: []
            }

            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return newCart;
        } catch (error) {
            return error
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart_found = carts.find(c => c.id === id);
            return cart_found;
        } catch (error) {
            return error
        }
    }

    async addProductsToCart(cid, pid) {
        try {
            let carts_list = await this.getCarts() //es un array
            let cart = await this.getCartById(+cid) //es un objeto
            if (cart) {
                let cart_products = cart.products
                const plusOne = cart_products.find(prod => prod.id === +pid)
                if (!plusOne) {
                    cart_products.push({ id: pid, quantity: 1 })
                } else {
                    cart_products.forEach(prod => {
                        if (prod.id == pid) {
                            prod.quantity = prod.quantity + 1
                        }
                    });
                }

                cart.products = cart_products
                carts_list[cid - 1] = cart
                await fs.promises.writeFile(this.path, JSON.stringify(carts_list))
                return cart
            } else {
                return undefined
            }
        } catch (error) {
            return error
        }
    }

}




export const cartsManager = new CartManager('carrito.json')