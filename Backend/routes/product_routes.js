const express = require('express');
const ProductController = require('../controller/products_controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Product = require('../models/Product');

const router = express.Router();


router.route('/')
    .get(ProductController.getallproducts)
    .post(auth.verifyUser, auth.verifyAdmin, upload.single('image'), ProductController.createproducts)
    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" });
    })
    .delete(auth.verifyAdmin, ProductController.deleteallproducts);

router.route('/:id')
    .get(ProductController.getProductByID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Not implemented" });
    })
    .put(auth.verifyUser, auth.verifyAdmin, ProductController.updateProductByID)
    .delete(auth.verifyUser, auth.verifyAdmin, ProductController.deleteProductByID);

    
    router.route('/:id/reviews')
        .post(auth.verifyUser, async (req, res) => {
            const { rating, comment } = req.body;  
            const userId = req.user.id;  
            try {
                
                const product = await Product.findById(req.params.id);
    
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found' });
                }
    
                
                const newReview = {
                    user: userId,
                    rating,
                    comment
                };
    
                
                product.reviews.push(newReview);
                await product.save();  
    
                
                res.status(201).json(product.reviews);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server Error');  
            }
        });
    
    
    router.route('/:id/reviews')
        .get(async (req, res) => {
            try {
                
                const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found' });
                }
    
                
                res.json(product.reviews);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server Error');  
            }
        });
    
    module.exports = router;
    

module.exports = router;