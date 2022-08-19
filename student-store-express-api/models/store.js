const { storage } = require("../data/storage")
const {BadRequestError} = require('../utils/errors')

class Store{

    static async getProducts(){
        const products = storage.get('products')
        return products;
    }
    static async getProductById(productId){

        const products = storage.get('products')
        const findItem = products.find(item => item.id === productId)
        return findItem;
    }

    static async recordPurchase(purchase){

        if (!purchase){
            throw new BadRequestError('No purchase sent')
        }
        const requiredFields =['order', 'name', 'email']
        requiredFields.forEach((field) => {
            if (!purchase[field] ) {
              throw new BadRequestError(`"${field}"field is required in purchase`)
            }
          })

            storage.add('purchases', purchase)
            return purchase

    }
    static async getPurchases(){
        const purchases = storage.get('purchases')
        return purchases;
    }
}



module.exports = Store;
