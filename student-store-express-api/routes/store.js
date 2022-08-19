const express = require('express')
const router = express.Router();
const Store = require('../models/store')
// console.log('store: ', store.getProducts);

// List all products
router.get('/', async (req,res) => {

    const products = await Store.getProducts()
    res.status(200).json({ "products": products })
})

router.get('/purchases', async (req,res) => {
    console.log('purchases here');

    const purchases = await Store.getPurchases()
    console.log('gotten_purchases: ', purchases);

    res.status(200).json({ "purchases": purchases })
})

// fetch a single product by Id
router.get('/:productId', async (req,res) => {
    const productId = req.params.productId
    console.log('productid', productId);
    const product = await Store.getProductById(productId)
    res.status(200).json({product})
})

router.post('/', async(req, res) =>{

    const order =  req.body.purchase
    const purchase = await Store.recordPurchase(order)
    console.log('write_purchase: ', purchase);
    res.status(201).json({ "purchase": purchase })
})

module.exports = router;
